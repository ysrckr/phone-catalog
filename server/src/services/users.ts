import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import z from 'zod';
import { prisma } from '../setup/dbConnection';
import { redisClient } from '../setup/redisClient';
import type { User } from '../types/User';

// Get all users
export const getAll = async () => {
  try {
    const users = prisma.user.findMany();
    return users;
  } catch (error) {
    throw error;
  }
};

// Create a new user
export const create = async (user: User) => {
  const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    role: z.enum(['ADMIN', 'USER']).optional().default('USER'),
  });

  const isValidUser = userSchema.safeParse(user).success;

  if (!isValidUser) {
    throw new Error('Invalid user');
  }

  try {
    const newUser = await prisma.user.create({
      data: user,
    });
    return newUser;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Email already exists');
      }
    }

    if (error instanceof PrismaClientUnknownRequestError) {
      throw new Error(error.message);
    }

    throw error;
  }
};

// Get a user by id
export const getById = async (id: string) => {
  try {
    const user = prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

// Get a user by email
export const getByEmail = async (email: string) => {
  if (!email) {
    throw new Error('Email is required');
  }

  try {
    const user = prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const setCachedRole = async (id: string, role: string) => {
  try {
    await redisClient.setex(id, 60 * 60 * 24, role);
  } catch (error) {
    throw error;
  }
};

export const deleteCache = async (id: string) => {
  try {
    await redisClient.del(id);
  } catch (error) {
    throw error;
  }
};

export const checkCache = async (id: string) => {
  try {
    const role = await redisClient.get(id);
    return role;
  } catch (error) {
    throw error;
  }
};

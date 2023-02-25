import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library';
import z from 'zod';
import type { User } from '../types/User';
import { prisma } from './dbConnection';

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

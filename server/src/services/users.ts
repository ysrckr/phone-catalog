import z from 'zod';
import { prisma } from './dbConnection';
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
export const create = (user: User) => {
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
    const newUser = prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role || 'USER',
      },
    });
    return newUser;
  } catch (error) {
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
}

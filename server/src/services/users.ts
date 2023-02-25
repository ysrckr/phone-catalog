import bycrpt from 'bcrypt';
import z from 'zod';
import { prisma } from './dbConnection';

export const getAll = async () => {
  try {
    const users = prisma.user.findMany();
    return users;
  } catch (error) {
    throw error;
  }
};

export const create = (user: { name: string; email: string; password: string }) => {
  const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
  });

  const isValidUser = userSchema.safeParse(user).success;

  if (!isValidUser) {
    throw new Error('Invalid user');
  }

  const hashedPassword = bycrpt.hashSync(user.password, 10);

  try {
    const newUser = prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

import type { Request, Response } from 'express';
import {
  checkCache,
  create as createUser,
  deleteCache,
  getByEmail as getUserByEmail,
  setCachedRole,
} from '../services/users';
import { User, userSchema } from '../types/User';
import { comparePassword, hashPassword } from '../utils/passwordHash';
import {
  getAll as getAllUsers
} from '../services/users';

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error });
  }
};


export const register = async (req: Request, res: Response) => {
  if (!userSchema.safeParse(req.body).success) {
    return res.status(400).json({ error: 'Invalid user' });
  }

  const { name, email, password, role } = req.body;

  const hashedPassword = hashPassword(password);
  const user: User = {
    name,
    email,
    password: hashedPassword,
    role: role || undefined,
  };

  try {
    const { name, email, id, role } = await createUser(user);

    if (!name || !email) {
      return res.status(400).json({ error: 'invalid name or email' });
    }

    await setCachedRole(id, role);

    return res.status(201).json({ name, email, id });
  } catch (error) {
    console.error(error);
    return res.status(409).json({ error: 'Email already exists' });
  }
};

export const registerWithOutRole = async (req: Request, res: Response) => {
  if (!userSchema.safeParse(req.body).success) {
    return res.status(400).json({ error: 'Invalid user' });
  }

  const { name, email, password } = req.body;

  const hashedPassword = hashPassword(password);

  const user: Omit<User, 'role'> = {
    name,
    email,
    password: hashedPassword,
  };

  try {
    const { name, email, id } = await createUser(user);

    if (!name || !email) {
      return res.status(400).json({ error: 'invalid name or email' });
    }

    return res.status(201).json({ name, email, id });
  } catch (error) {
    return res.status(409).json({ error: 'Email already exists' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const { id, role, name } = user;

    await setCachedRole(id, role);

    return res.status(200).json({ name, email, id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

export const logout = async (req: Request, res: Response) => {
  const id = req.headers.authorization;

  if (!id) {
    return res.status(400).json({ error: 'Invalid user' });
  }

  try {
    await deleteCache(id);

    return res.status(200).json({ message: 'Logged out' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const check = async (req: Request, res: Response) => {
  try {
    const id = req.headers.authorization;

    if (!id) {
      return res.status(401).json({ error: 'Unauthorized' }).json(false);
    }

    const role = await checkCache(id);

    if (!role || role !== 'ADMIN') {
      return res.status(401).json({ error: 'Unauthorized' }).json(false);
    }

    return res.status(200).json(true)
  } catch (error) {
    return res.status(500).json({ error });
  }
};

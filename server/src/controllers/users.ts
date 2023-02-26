import type { Request, Response } from 'express';
import { create as createUser, getByEmail as getUserByEmail } from '../services/users';
import { User, userSchema } from '../types/User';
import { hashPassword } from '../utils/passwordHash';
import { redisClient } from '../setup/redisClient';
import { comparePassword } from '../utils/passwordHash';


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

    await redisClient.setex(id, 60 * 60 * 24, role)

    return res.status(201).json({ name, email, id });
  } catch (error) {
    console.error(error);
    return res.status(409).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  if (!userSchema.safeParse(req.body).success) {
    return res.status(400).json({ error: 'Invalid user' });
  }

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

    await redisClient.setex(id, 60 * 60 * 24, role)

    
    return res.status(200).json({ name, email, id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

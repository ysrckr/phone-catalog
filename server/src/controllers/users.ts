import type { Request, Response } from 'express';
import { create as createUser } from '../services/users';
import { User, userSchema } from '../types/User';
import { hashPassword } from '../utils/passwordHash';


export const create = async (req: Request, res: Response) => {
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
    const { name, email, id } = await createUser(user);

    if (!name || !email) {
      return res.status(400).json({ error: 'invalid name or email' });
    }

    return res.status(201).json({ name, email, id });
  } catch (error) {
    console.error(error);
    return res.status(409).json({ error });
  }
};

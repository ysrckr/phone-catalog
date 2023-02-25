import type { Request, Response } from 'express';
import { z } from 'zod';
import { create as createUser } from '../services/users';

export const create = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
  });

  if (!userSchema.safeParse(req.body).success) {
    return res.status(400).json({ error: 'Invalid user' });
  }

  try {
    const user = await createUser({ name, email, password });
    // create a session for the user
    if (!user) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!req.session) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    req.session.userId = user.id;

    console.log(req.session);

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

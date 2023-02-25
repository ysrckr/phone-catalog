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
    role: role || 'USER',
  };

  try {
    const { name, email, id } = await createUser(user);

    if (!name || !email) {
      return res.status(400).json({ error: 'invalid name or email' });
    }

    if (!req.session) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    // create a session for the user
    req.session.userId = id;

    req.session.save(err => {
      if (err) {
        console.error(err);
        return res.status(500).json({ err });
      }
    });

    return res.status(201).json({ name, email });
  } catch (error) {
    console.error(error);
    return res.status(409).json({ error });
  }
};

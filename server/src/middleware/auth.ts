import type { NextFunction,Request,Response } from 'express';
import { getById } from '../services/users';
import {redisClient} from '../setup/redisClient';


export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {

  const userId = req.headers.authorization;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await getById(userId as string);
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (user.role !== 'ADMIN') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }

  next();
};

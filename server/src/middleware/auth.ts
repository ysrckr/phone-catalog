import type { NextFunction,Request,Response } from 'express';
import { redisClient } from '../setup/sessionStore';
import { getById } from '../services/users';


export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionID = req.sessionID;
  const userID = req.session.userId;

  if (!sessionID || !userID) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const session = await redisClient.get('sess:' + sessionID);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sessionData = JSON.parse(session);

  if (sessionData.userId !== userID) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await getById(userID);
  
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (user.role !== 'ADMIN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

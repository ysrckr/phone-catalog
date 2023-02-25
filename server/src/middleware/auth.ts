import type { NextFunction,Request,Response } from 'express';
import { redisClient } from '../setup/sessionStore';
import { getById } from '../services/users';


export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionID = req.sessionID;

  if (!sessionID) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const session = await redisClient.get('sess:' + sessionID);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const sessionData = JSON.parse(session);


  const user = await getById(sessionData.userId);
  
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (user.role !== 'ADMIN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};

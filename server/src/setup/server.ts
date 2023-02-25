import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { sessionStore } from './sessionStore';
import { router as usersRouter } from '../routes/users';

export const startServer = async (port: number) => {
  const app = express();

  app.use(cookieParser());

  const sessionConfig = session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET as string,
    name: 'sid',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
    saveUninitialized: false,
    resave: false,
    unset: 'destroy',
  });

  app.use(sessionConfig);

  app.use(express.json());
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:4000'],
      credentials: true,
      exposedHeaders: ['set-cookie'],
    }),
  );

  app.use('/api/v1/users', usersRouter);

  app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
  });
};

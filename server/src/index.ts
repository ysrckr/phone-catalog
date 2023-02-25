import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { router as usersRouter } from './routes/users';

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cookieParser());

const sessionConfig = session({
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

app.listen(PORT, () => {
  console.log('Server started on http://localhost:' + PORT);
});

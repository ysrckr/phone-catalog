import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { router as categoriesRouter } from './routes/categories';
import { router as usersRouter } from './routes/users';
import { sessionStore } from './setup/sessionStore';
import { clientCors } from './utils/cors';

// Load environment variables from .env file
dotenv.config();

// Get port from environment and store in Express.
const PORT = Number(process.env.PORT) || 8000;

const app = express();

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

app.use(cookieParser());

app.use(clientCors);

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/categories', categoriesRouter);

app.listen(PORT, () => {
  console.log('Server started on http://localhost:' + PORT);
});

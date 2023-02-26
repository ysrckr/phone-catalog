import express from 'express';
import { login, register } from '../controllers/users';

export const router = express.Router();

// register user
router.post('/register', register);
// login
router.post('/login', login);
import express from 'express';
import { login, logout, register, check } from '../controllers/users';
import { checkAuth } from '../middleware/auth';

export const router = express.Router();

// register user
router.post('/register', register);

// login
router.post('/login', login);

// logout
router.get('/logout', checkAuth, logout);

// check if user is logged in
router.get('/check', checkAuth, check);

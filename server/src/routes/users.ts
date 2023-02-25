import express from 'express';
import { create as createUser } from '../controllers/users';
import { adminCors } from '../utils/cors';
export const router = express.Router();

router.post('/', adminCors, createUser);
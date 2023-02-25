import express from 'express';
import { create as createCategory } from '../controllers/categories';
import { checkAuth } from '../middleware/auth';
import { adminCors } from '../utils/cors';

export const router = express.Router();

router.post('/', adminCors, checkAuth, createCategory);

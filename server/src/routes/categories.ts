import express from 'express';
import { create as createCategory } from '../controllers/categories';
import { adminCors } from '../utils/cors';
import { checkAuth } from '../middleware/auth';

export const router = express.Router();

router.post('/', adminCors, checkAuth, createCategory);

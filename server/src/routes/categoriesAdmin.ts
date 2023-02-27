import express from 'express';
import { create as createCategory } from '../controllers/categoriesAdmin';
import { adminCors } from '../utils/cors';
import { checkAuth } from '../middleware/auth';

export const router = express.Router();

router.post('/', createCategory);

import express from 'express';
import { create as createCategory } from '../controllers/categories';
import { checkAuth } from '../middleware/auth';

export const router = express.Router();

router.post('/', checkAuth, createCategory);

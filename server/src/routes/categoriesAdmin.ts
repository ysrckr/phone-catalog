import express from 'express';
import { create as createCategory } from '../controllers/categoriesAdmin';

export const router = express.Router();

router.post('/', createCategory);

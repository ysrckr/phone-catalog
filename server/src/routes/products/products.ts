import express from 'express';
import { getAll } from '../../controllers/products';

export const router = express.Router();

router.get('/', getAll);

import express from 'express';
import { create as createUser } from '../controllers/users';
export const router = express.Router();

router.post('/', createUser);
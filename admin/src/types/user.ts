import { z } from 'zod';
// import { userSchema } from '../../../server/src/types/User';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginUser = z.infer<typeof loginUserSchema>;
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
  category: z.string().uuid(),
});

export interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  images: FileList | [];
  colors: string[];
  sizes: string[];
  category: string;
}
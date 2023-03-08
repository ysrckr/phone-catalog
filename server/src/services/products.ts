import z from 'zod';
import { prisma } from '../setup/dbConnection';

export const getAll = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getById = async (id: string) => {
  const isValidId = z.string().uuid().safeParse(id).success;

  if (!isValidId) {
    throw new Error('Invalid id');
  }

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const create = async ({
  name,
  images,
  colors,
  sizes,
  description,
  price,
  quantity,
  categoryId,
}: {
  name: string;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
}) => {
  const productSchema = z.object({
    name: z.string().min(1),
    images: z.array(z.string()).optional(),
    colors: z.array(z.string()),
    sizes: z.array(z.string()),
    description: z.string().min(1),
    price: z.number().min(0),
    quantity: z.number().min(0),
    categoryId: z.string().uuid(),
  });

  const isValid = productSchema.safeParse({
    name,
    images,
    colors,
    sizes,
    description,
    price,
    quantity,
    categoryId,
  }).success;

  if (!isValid) { 
    return { error: 'Invalid input' };
  }

  try {
    const product = await prisma.product.create({
      data: {
        name,
        images: images || [],
        colors: colors || [],
        sizes: sizes || [],
        description: description || '',
        price: price || 0,
        quantity: quantity || 0,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    return product;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const update = async({
  id,
  name,
  images,
  colors,
  sizes,
  description,
  price,
  quantity,
  categoryId,
}: {
  id: string;
  name: string;
  images: string[];
  colors: string[];
  sizes: string[];
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
  }) => {
  const isValidId = z.string().uuid().safeParse(id).success;
  const isValidName = z.string().min(1).safeParse(name).success;
  const isValidImages = z.array(z.string()).safeParse(images).success;
  const isValidColors = z.array(z.string()).safeParse(colors).success;
  const isValidSizes = z.array(z.string()).safeParse(sizes).success;
  const isValidDescription = z.string().min(1).safeParse(description).success;
  const isValidPrice = z.number().min(0).safeParse(price).success;
  const isValidQuantity = z.number().min(0).safeParse(quantity).success;
  const isValidCategoryId = z.string().uuid().safeParse(categoryId).success;
    
  if (
    !isValidId ||
    !isValidName ||
    !isValidImages ||
    !isValidColors ||
    !isValidSizes ||
    !isValidDescription ||
    !isValidPrice ||
    !isValidQuantity ||
    !isValidCategoryId
  ) {
    return { error: 'Invalid input' };
  }

  try {
    const product = await getById(id);
    if (!product) {
      throw new Error('Product not found');
    }

    const prevImages = product.images;
    const prevColors = product.colors;
    const prevSizes = product.sizes;

    const newImages = [...prevImages, ...images];
    const newColors = [...prevColors, ...colors];
    const newSizes = [...prevSizes, ...sizes];


    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        images: newImages,
        colors: newColors,
        sizes: newSizes,
        description: description || '',
        price: price || 0,
        quantity: quantity || 0,
        category: {
          connect: {
            id: categoryId,
          },
        },
      },
    });
    return updatedProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const remove = async (id: string) => {
  const isValidId = z.string().uuid().safeParse(id).success;

  if (!isValidId) {
    throw new Error('Invalid id');
  }

  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

import { axiosAdminClient } from "@/utils/axiosClient";
import { Product } from "@/types/products";

export const createProduct = async (data: FormData): Promise<Product> => {
  const response: Product = await axiosAdminClient.post("/products", data);
  return response;
}
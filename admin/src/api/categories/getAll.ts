import { Category } from "@/types/category";
import { axiosAdminClient } from "@/utils/axiosClient";

export const getAllCategories = async (): Promise<Category[]> => { 
  const { data } = await axiosAdminClient.get("/categories");
  return data;
};
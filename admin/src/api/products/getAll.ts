import { axiosClient } from "@/utils/axiosClient";

export const getAllProducts = async () => { 
  const response = await axiosClient.get("/products");
  return response;
};
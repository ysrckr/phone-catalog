import { axiosAdminClient } from "@/utils/axiosClient";

export const createCategory = async (formData: FormData, id: string) => { 
  try {
    const res = await axiosAdminClient.post("/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: id,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
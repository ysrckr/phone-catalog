import { axiosAdminClient } from "@/utils/axiosClient";

export const logout = async (id: string) => {
  const response = await axiosAdminClient.get("/logout", {
    headers: {
      Authorization: id,
    },
  });
  return response.data;
}
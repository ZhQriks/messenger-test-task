import { IUser } from "@/lib/types/user";
import { BACKEND_URL, authorizedBackendApiInstance } from "@/services/axios";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (userId: string): Promise<IUser> => {
  const res = await authorizedBackendApiInstance.get(`/users/${userId}`);
  console.log("res", res);
  return res.data;
};

const useUser = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });
};

export default useUser;
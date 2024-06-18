import backendApiInstance from "@/services";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useUsers(): UseQueryResult<AxiosResponse<any>, AxiosError<any>> {
  const queryFn = (): Promise<AxiosResponse<any>> => {
    return backendApiInstance.get("/users");
  };

  return useQuery({
    queryFn,
    queryKey: ["users"],
  });
}

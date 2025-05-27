import { useQuery } from "@tanstack/react-query";

import { ApiObjectsProps } from "@/types/api";
import { axiosInstance } from "@/lib/axios";

function useGetObjectsQueryKey() {
  return ["objects"];
}
async function useFetchObjects(): Promise<ApiObjectsProps> {
  console.log("Fetching objects");
  const { data } = await axiosInstance.get("objects");
  return data;
}
export default function useGetObjects() {
  return useQuery({ 
    queryKey: useGetObjectsQueryKey(),
    queryFn: useFetchObjects,
    staleTime: Infinity,             // Data is always considered fresh
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
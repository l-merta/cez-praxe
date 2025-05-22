import { useQuery } from "@tanstack/react-query";

import { ApiObjectsProps } from "@/types/api";
import { axiosInstance } from "@/lib/axios";

interface SearchProps {
  q: string;
}

function useGetSearchQueryKey(props: SearchProps) {
  return ["search", props.q];
}
async function useFetchSearch(params: SearchProps): Promise<ApiObjectsProps> {
  const { data } = await axiosInstance.get("search?q=" + params.q);
  return data;
}
export default function useGetSearch(params: SearchProps) {
  return useQuery({ queryKey: useGetSearchQueryKey(params), queryFn: () => useFetchSearch(params) });
}
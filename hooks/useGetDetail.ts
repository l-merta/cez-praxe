import { useQuery } from "@tanstack/react-query";

import { ApiDetailsProps } from "@/types/api";
import { axiosInstance } from "@/lib/axios";

interface DetailProps {
  id: number;
}

function useGetDetailQueryKey(props: DetailProps) {
  return ["detail", props.id];
}
async function fetchDetail(id: number): Promise<ApiDetailsProps> {
  const { data } = await axiosInstance.get("objects/" + id);
  return data;
}
export default function useGetDetail(params: DetailProps) {
  return useQuery({ queryKey: useGetDetailQueryKey(params), queryFn: () => fetchDetail(params.id) });
}
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiDetailsProps } from "@/types/api";

interface DetailProps {
  id: number;
}

function useGetDetailQueryKey(props: DetailProps) {
  return ["detail", props.id];
}
async function fetchDetail(id: number): Promise<ApiDetailsProps> {
  const { data } = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + id);
  return data;
}
export default function useGetDetail(params: DetailProps) {
  return useQuery({ queryKey: useGetDetailQueryKey(params), queryFn: () => fetchDetail(params.id) });
}
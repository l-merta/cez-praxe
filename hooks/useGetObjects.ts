import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { ApiObjectsProps } from "@/types/api";

function useGetObjectsQueryKey() {
  return ["objects"];
}
async function useFetchObjects(): Promise<ApiObjectsProps> {
  const { data } = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects");
  return data;
}
export default function useGetObjects() {
  return useQuery({ queryKey: useGetObjectsQueryKey(), queryFn: useFetchObjects });
}
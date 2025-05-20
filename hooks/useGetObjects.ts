import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetObjectsQueryKey() {
  return ["objects"];
}
async function useFetchObjects() {
  const { data } = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects");
  return data;
}
export default function useGetObjects() {
  return useQuery({ queryKey: useGetObjectsQueryKey(), queryFn: useFetchObjects });
}
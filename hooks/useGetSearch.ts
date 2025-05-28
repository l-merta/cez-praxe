import { useQuery } from "@tanstack/react-query";

import { ApiObjectsProps } from "@/types/api";
import { axiosInstance } from "@/lib/axios";

import { FilterSettingsTypes } from "@/types/app";

interface SearchProps {
  q: string;
  filterSettings?: FilterSettingsTypes[];
}

function useGetSearchQueryKey(props: SearchProps) {
  return [
    "search",
    props.q,
    // Use JSON.stringify for a stable, unique key
    props.filterSettings ? JSON.stringify(props.filterSettings) : undefined,
  ];
}
async function useFetchSearch(params: SearchProps): Promise<ApiObjectsProps> {
  // Build query string from filterSettings
  let queryString = `?q=${encodeURIComponent(params.q)}`;

  if (params.filterSettings && params.filterSettings.length > 0) {
    params.filterSettings.forEach(setting => {
      setting.value ? queryString += `&${encodeURIComponent(setting.name)}=${encodeURIComponent(String(setting.value))}` : '';
    });
  }

  const { data } = await axiosInstance.get("search" + queryString);
  return data;
}
export default function useGetSearch(params: SearchProps) {
  return useQuery({ queryKey: useGetSearchQueryKey(params), queryFn: () => useFetchSearch(params) });
}
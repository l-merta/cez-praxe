"use client";
import useGetSearch from "@/hooks/useGetSearch";

import CardList from "@/components/sections/CardList";

import { Search } from "lucide-react";

interface HeroProps {
  search: string;
}

export default function Hero({ search }: HeroProps) {
  const { data, isLoading } = useGetSearch({ q: search });

  return (
    <>
      {search.length > 0 && (
        <CardList
          header={"Similar artworks"}
          icon={<Search />}
          key={search}
          data={data?.objectIDs.slice(1)}
          isLoading={isLoading}
          className="mt-10 *:!px-0"
        />
      )}
    </>
  );
}
"use client";
import { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";

import CardList from "@/components/sections/CardList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import useGetSearch from "@/hooks/useGetSearch";

interface HeroProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Hero({ search, setSearch }: HeroProps) {
  const { data, isLoading } = useGetSearch({ q: search });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debounce(handleInput, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <>
      <div className="section-width min-h-[50vh] flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl text-center font-bold">The Metropolitan Museum of Art</h1>
        <div className="w-full md:w-md max-w-md flex items-center gap-2 flex-wrap md:flex-nowrap">
          <Input
            placeholder="Search for art, artists, or objects…"
            className=""
            //value={inputValue}
            onChange={debouncedResults}
          />
          <Button variant="default" className="w-full md:w-auto">Search <Search /></Button>
        </div>
      </div>
      {search.length > 0 && (
        <CardList
          header={"Searching '" + search + "'"}
          icon={<Search />}
          key={search}
          data={data?.objectIDs}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
"use client";
import { useState, useRef, useCallback } from "react";

import CardList from "@/components/sections/CardList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import useGetSearch from "@/hooks/useGetSearch";

export default function Hero() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetSearch({ q: search });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  return (
    <>
    <div className="section-width min-h-[50vh] flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl text-center font-bold">The Metropolitan Museum of Art</h1>
      <div className="w-full md:w-md max-w-md flex items-center gap-2 flex-wrap md:flex-nowrap">
        <Input
          placeholder="Search for art, artists, or objects…"
          className=""
          value={search}
          onChange={handleInput}
        />
        <Button variant="default" className="w-full md:w-auto">Search <Search /></Button>
      </div>
    </div>
    {search.length > 0 && (
      <CardList
        key={search}
        data={data?.objectIDs}
        isLoading={isLoading}
      />
    )}
    </>
  );
}
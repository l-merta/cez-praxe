"use client";
import { useState, useRef, useCallback } from "react";

import CardList from "@/components/sections/CardList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Hero() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce function
  const debounce = useCallback(
    <T extends unknown[]>(fn: (...args: T) => void, delay = 2000) => {
      return (...args: T) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fn(...args), delay);
      };
    },
    []
  );

  // Debounced setter for search
  const debouncedSetSearch = debounce((value: string) => setDebouncedSearch(value), 500);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSetSearch(value);
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
    {debouncedSearch.length > 0 && (
      <CardList
        key={debouncedSearch}
        url={`/search?q=${encodeURIComponent(debouncedSearch)}`}
      />
    )}
    </>
  );
}
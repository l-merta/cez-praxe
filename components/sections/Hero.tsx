import { useState, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardList from "@/components/sections/CardList";

export default function Hero() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce function
  const debounce = useCallback(
    (fn: (...args: any[]) => void, delay = 2000) => {
      return (...args: any[]) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => fn(...args), delay);
      };
    },
    []
  );

  // Debounced setter for search
  const debouncedSetSearch = useCallback(
    debounce((value: string) => setDebouncedSearch(value), 500),
    [debounce]
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSetSearch(value);
  };

  return (
    <>
    <div className="section-width min-h-[50vh] flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">The Metropolitan Museum of Art</h1>
      <div className="w-full max-w-md flex items-center gap-2">
        <Input
          placeholder="Search for art, artists, or objects…"
          className="w-full"
          value={search}
          onChange={handleInput}
        />
        <Button variant="default">Search</Button>
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
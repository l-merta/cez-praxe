"use client";
import { useState, useEffect, useMemo } from "react";
import useGetSearch from "@/hooks/useGetSearch";
import debounce from "lodash.debounce";

import CardList from "@/components/sections/CardList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Search } from "lucide-react";
import { X } from "lucide-react";

interface HeroProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function Hero({ search, setSearch }: HeroProps) {
  const { data, isLoading } = useGetSearch({ q: search });
  const [inputValue, setInputValue] = useState(search);

  // Debounce setSearch so it only fires after user stops typing
  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setSearch(value), 300),
    [setSearch]
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearch(value);
  };

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  return (
    <>
      <div className="section-width min-h-[50vh] flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl text-center font-bold">The Metropolitan Museum of Art</h1>
        <div className="w-full md:w-lg max-w-lg flex items-center gap-2 flex-wrap md:flex-nowrap">
          <div className="w-full relative flex items-center">
            <Input
              placeholder="Search for art, artists, or objects…"
              className="!text-lg h-fits px-4 py-5"
              value={inputValue}
              onChange={handleInput}
            />
            {inputValue.length > 0 &&
              <Button onClick={()=>{setSearch("")}} variant={"ghost"} className="!p-0 h-[80%] aspect-[1/1] absolute right-1 rounded-full">
                <X size={10} />
              </Button>
            }
          </div>
          {/* <Button variant="default" className="w-full md:w-auto">Search <Search /></Button> */}
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
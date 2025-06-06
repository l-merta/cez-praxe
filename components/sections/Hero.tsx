"use client";
import { useState, useEffect, useMemo } from "react";
import useGetSearch from "@/hooks/useGetSearch";
import debounce from "lodash.debounce";

import CardList from "@/components/sections/CardList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterMenu from "../FilterMenu";

import { Search, X } from "lucide-react";

import { FilterSettingsTypes } from "@/types/app";

interface HeroProps {
  search: string;
  setSearch: (value: string) => void;
}

const defaultFilterSettings: FilterSettingsTypes[] = [
  {
    name: "hasImages",
    label: "Has image",
    value: true,
  },
  {
    name: "isHighlight",
    label: "Is highlighted",
    value: false,
  },
  {
    name: "isOnView",
    label: "Is on view",
    value: false,
  },
];

export default function Hero({ search, setSearch }: HeroProps) {
  const [inputValue, setInputValue] = useState(search);
  const [filterSettings, setFilterSettings] = useState<FilterSettingsTypes[]>(defaultFilterSettings);

  const { data, isLoading } = useGetSearch({ q: search, filterSettings });

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
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  return (
    <>
      <div className="section-width animate-slide-in-bottom  min-h-[50vh] flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl text-center font-bold">The Metropolitan Museum of Art</h1>
        <div className="w-full md:w-lg max-w-lg flex items-center gap-2">
          <div className="w-full relative flex items-center">
            <div className="w-full flex relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <Input
                placeholder="Search for art, artists, or objects…"
                className="!text-lg h-fits px-4 py-5 pl-11"
                value={inputValue}
                onChange={handleInput}
              />
            </div>
            {inputValue.length > 0 &&
              <Button onClick={()=>{setSearch(""); setInputValue("")}} variant={"ghost"} className="!p-0 h-[80%] aspect-[1/1] absolute right-1 rounded-full">
                <X size={10} />
              </Button>
            }
          </div>
          <FilterMenu filterSettings={filterSettings} setFilterSettings={setFilterSettings} />
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
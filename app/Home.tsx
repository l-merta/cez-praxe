"use client";
import { useState } from "react";
import { scrollToTop } from "@/providers/AppStateProvider";
import { useGetLastTab, useSetLastTab } from "@/hooks/useLocalStorage";

import Hero from "@/components/sections/Hero";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardListTabs from "@/components/sections/CardListTabs";
import CardList_Skeleton from "@/components/skeletons/CardList_Skeleton";
import { Skeleton } from "@/components/ui/skeleton";

import { GalleryHorizontalEnd, Telescope, Globe, Heart } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");

  const { lastTab, isLoading: isLoadingLastTab } = useGetLastTab();
  const setLastTab = useSetLastTab;

  const handleTabChange = (value: string) => {
    setLastTab(value);
    scrollToTop();
  };

  return (
    <main className="pb-10">
      <Hero search={search} setSearch={setSearch} />
      {search.length == 0 && (!isLoadingLastTab ? 
        <Tabs defaultValue={lastTab} onValueChange={(value) => handleTabChange(value)}>
          <div className="sticky top-0 left-0 bg-white/20 dark:bg-gray-900/80 backdrop-blur z-20">
            <div className="section-width !px-0 py-3">
              <TabsList className="mx-4 *:px-8 flex-wrap h-fit">
                <TabsTrigger value="featured"><GalleryHorizontalEnd size={16} /> <span className="hidden sm:inline">Featured</span></TabsTrigger>
                <TabsTrigger value="discover"><Telescope size={16} /> <span className="hidden sm:inline">Discover</span></TabsTrigger>
                <TabsTrigger value="browse"><Globe size={16} /> <span className="hidden sm:inline">Browse</span></TabsTrigger>
                <TabsTrigger value="favorites"><Heart size={16} /> <span className="hidden sm:inline">Favorites</span></TabsTrigger>
              </TabsList>
            </div>
          </div>
          <CardListTabs />
        </Tabs>
      :
        <>
        <div className="section-width px-2 py-3 mb-16">
          <Skeleton className="w-full max-w-140 h-9" />
        </div>
        <CardList_Skeleton cardsCount={8} />
        </>
      )}
    </main>
  );
}

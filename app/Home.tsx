"use client";
import { useState } from "react";

import Hero from "@/components/sections/Hero";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardListTabs from "@/components/sections/CardListTabs";
import { GalleryHorizontalEnd, Telescope, Globe, Heart } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="pb-10">
      <Hero search={search} setSearch={setSearch} />
      {search.length == 0 &&  
        <Tabs defaultValue="featured">
          <div className="sticky top-0 left-0 bg-white/20 dark:bg-gray-900/80 backdrop-blur z-20">
            <div className="section-width !px-0 py-3">
              <TabsList className="mx-4 *:px-8 flex-wrap h-fit">
                <TabsTrigger value="featured" onClick={scrollToTop}><GalleryHorizontalEnd /> <span className="hidden sm:inline">Featured</span></TabsTrigger>
                <TabsTrigger value="discover" onClick={scrollToTop}><Telescope /> <span className="hidden sm:inline">Discover</span></TabsTrigger>
                <TabsTrigger value="browse" onClick={scrollToTop}><Globe /> <span className="hidden sm:inline">Browse</span></TabsTrigger>
                <TabsTrigger value="favorites" onClick={scrollToTop}><Heart /> <span className="hidden sm:inline">Favorites</span></TabsTrigger>
              </TabsList>
            </div>
          </div>
          <CardListTabs />
        </Tabs>
      }
    </main>
  );
}

"use client";
import useGetObjects from "@/hooks/useGetObjects";

import Hero from "@/components/sections/Hero";
import CardList from "@/components/sections/CardList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryHorizontalEnd, Telescope, Globe, Heart } from "lucide-react";

export default function Home() {
  const { data, isLoading } = useGetObjects();

  function getRandomObjects(length?: number) {
    if (!data?.objectIDs) return [];
    const ids = [...data.objectIDs];
    // Fisher-Yates shuffle for true randomness
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return length ? ids.slice(0, length) : ids;
  }
  //console.log(getRandomFeaturedObjects());

  return (
    <main className="px-4 pb-10">
      <Hero />
      <Tabs defaultValue="featured">
        <div className="sticky top-0 bg-white/20 dark:bg-gray-900/80 backdrop-blur z-20">
          <div className="section-width py-3">
            <TabsList className="*:px-8 flex-wrap h-fit">
              <TabsTrigger value="featured"><GalleryHorizontalEnd /> Featured</TabsTrigger>
              <TabsTrigger value="discover"><Telescope /> Discover</TabsTrigger>
              <TabsTrigger value="browse"><Globe /> Browse</TabsTrigger>
              <TabsTrigger value="favorites"><Heart /> Favorites</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="featured">
          <CardList header="Featured" data={getRandomObjects(10)} isLoading={isLoading} icon={<GalleryHorizontalEnd />} />
        </TabsContent>
        <TabsContent value="discover">
          <CardList header="Discover" fnData={getRandomObjects} reload isLoading={isLoading} icon={<Telescope />} />
        </TabsContent>
        <TabsContent value="browse">
          <CardList header="Browse" data={data?.objectIDs} isLoading={isLoading} icon={<Globe />} />
        </TabsContent>
        <TabsContent value="favorites">
          <CardList header="Favorites" data={data?.objectIDs} isLoading={isLoading} icon={<Heart />} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

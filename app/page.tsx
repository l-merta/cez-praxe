"use client";

import Hero from "@/components/sections/Hero";
import CardList from "@/components/sections/CardList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetObjects from "@/hooks/useGetObjects";

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
            <TabsList className="*:px-8">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="featured">
          <CardList header="Featured" data={getRandomObjects(10)} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="discover">
          <CardList header="Discover" data={getRandomObjects()} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="browse">
          <CardList header="Browse" data={data?.objectIDs} isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="favorites">
          <CardList header="Favorites" data={data?.objectIDs} isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </main>
  );
}

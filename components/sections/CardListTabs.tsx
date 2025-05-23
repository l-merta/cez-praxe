"use client";

import { TabsContent } from "@/components/ui/tabs";

import useGetObjects from "@/hooks/useGetObjects";

import CardList from "@/components/sections/CardList";
import { GalleryHorizontalEnd, Telescope, Globe, Heart } from "lucide-react";

export default function CardListTabs() {
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

  return (
    <>
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
    </>
  )
};
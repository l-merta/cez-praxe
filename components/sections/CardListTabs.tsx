"use client";
import useGetObjects from "@/hooks/useGetObjects";
import { useFavorites } from "@/hooks/useFavorites";

import { TabsContent } from "@/components/ui/tabs";
import CardList from "@/components/sections/CardList";
import { GalleryHorizontalEnd, Telescope, Globe, Heart, Shuffle } from "lucide-react";

import { murmurhash3_32_gc } from './../../hooks/useShuffle';

export default function CardListTabs() {
  const { data, isLoading } = useGetObjects();
  const { getFavorites } = useFavorites();

  // console.log("CardListTabs data", data, "isLoading", isLoading);

  function getRandomObjects(length?: number, seed?: string | number) {
    if (!data?.objectIDs) return [];

    let ids = [...data.objectIDs];

    if (seed) {
      const seedStr = String(seed);
      const seedNum = murmurhash3_32_gc(seedStr);

      const entries = ids.map((id) => ({
        id,
        sortKey: murmurhash3_32_gc(`${seedStr}-${id}`, seedNum),
      }));

      ids = entries
        .sort((a, b) => a.sortKey - b.sortKey)
        .map((entry) => entry.id);
      }
    else {
      // Fisher-Yates shuffle for true randomness
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }
    }
    

    return length ? ids.slice(0, length) : ids;
  }

  const date = new Date();
  const dateSeed = "" + date.getDate() + date.getMonth() + date.getFullYear();

  return (
    <>
    <TabsContent value="featured">
      <CardList header="Featured" data={getRandomObjects(10, dateSeed)} isLoading={isLoading} icon={<GalleryHorizontalEnd />} />
    </TabsContent>
    <TabsContent value="discover">
      <CardList header="Discover" fnData={getRandomObjects} reload isLoading={isLoading} icon={<Telescope />} />
    </TabsContent>
    <TabsContent value="browse">
      <CardList header="Browse" data={data?.objectIDs} isLoading={isLoading} icon={<Globe />} />
    </TabsContent>
    <TabsContent value="favorites">
      <CardList header="Favorites" fnData={getFavorites} icon={<Heart />} />
    </TabsContent>
    </>
  )
};
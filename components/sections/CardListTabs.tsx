"use client";
import { useContext } from "react";
import { useFavorites } from "@/hooks/useFavorites";

import { TabsContent } from "@/components/ui/tabs";
import CardList from "@/components/sections/CardList";
import { GalleryHorizontalEnd, Telescope, Globe, Heart } from "lucide-react";

import { AppContext } from "@/providers/AppStateProvider";

export default function CardListTabs() {
  const { getFavorites } = useFavorites();
  const { data, featured, getRandomObjects, isLoading } = useContext(AppContext);

  return (
    <>
    <TabsContent value="featured">
      <CardList header="Featured" data={featured} isLoading={isLoading} icon={<GalleryHorizontalEnd />} />
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
import type { Metadata } from "next";

import Hero from "@/components/sections/Hero";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardListTabs from "@/components/sections/CardListTabs";
import { GalleryHorizontalEnd, Telescope, Globe, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Museum of Art",
  authors: [{ name: "Lukáš Merta", url: "https://mertalukas.cz" }],
  description: "Explore the Metropolitan Museum of Art's collection.",
};

export default function Home() {
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
        <CardListTabs />
      </Tabs>
    </main>
  );
}

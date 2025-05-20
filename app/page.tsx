import Image from "next/image";

import CardList from "@/components/sections/CardList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="p-4">
      <Tabs defaultValue="featured">
        <div className="w-full max-w-7xl mx-auto">
          <TabsList>
            <TabsTrigger value="featured" className="px-8">Featured</TabsTrigger>
            <TabsTrigger value="browse" className="px-8">Browse</TabsTrigger>
            <TabsTrigger value="favorites" className="px-8">Favorites</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="featured">
          <CardList url="/objects" />
        </TabsContent>
        <TabsContent value="browse">
          <CardList url="/objects" />
        </TabsContent>
        <TabsContent value="favorites">
          <CardList url="/objects" />
        </TabsContent>
      </Tabs>
    </main>
  );
}

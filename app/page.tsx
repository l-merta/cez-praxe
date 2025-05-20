import CardList from "@/components/sections/CardList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="px-4 pb-10">
      <div className="section-width min-h-[50vh] flex flex-col items-center justify-center gap-6">
        <h1 className="text-4xl font-bold">The Metropolitan Museum of Art</h1>
        <div className="w-full max-w-md flex items-center gap-2">
          <Input placeholder="Search for art, artists, or objects…" className="w-full"></Input>
          <Button variant="default">Search</Button>
        </div>
      </div>
      <Tabs defaultValue="featured">
        <div className="section-width py-3 sticky-top-0">
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

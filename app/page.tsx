import Image from "next/image";

import CardList from "@/components/sections/CardList";

export default function Home() {
  return (
    <main className="">
      <CardList url="/search?isHighlight=true&q=vase" />
    </main>
  );
}

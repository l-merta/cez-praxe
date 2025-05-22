import type { Metadata } from "next";

import Home from "./Home";

export const metadata: Metadata = {
  title: "Museum of Art",
  authors: [{ name: "Lukáš Merta", url: "https://mertalukas.cz" }],
  description: "Explore the Metropolitan Museum of Art's collection.",
};

export default function Page() {
  return <Home />;
}

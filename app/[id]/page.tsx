import type { Metadata } from "next";

import ArtPage from "./ArtPage";

export const metadata: Metadata = {
  title: "Art Page",
  authors: [{ name: "Lukáš Merta", url: "https://mertalukas.cz" }],
  description: "Explore the Metropolitan Museum of Art's collection.",
};

export default function Page() {
  return <ArtPage />;
}

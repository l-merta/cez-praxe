import Link from "next/link";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

import { User } from 'lucide-react';

import { ApiArtistProps } from "@/types/api";

interface ArtistHoverProps {
  data?: ApiArtistProps;
}

export default function ArtistHover({ data }: ArtistHoverProps) {
  return (
    <>
    {data?.artistDisplayName && 
    <HoverCard>
      <Link href={data?.artistWikidata_URL} target="_blank" rel="noopener noreferrer">
        <HoverCardTrigger className="font-semibold flex items-center gap-1 hover:underline cursor-pointer">
          <User size={16} />
          {data?.artistDisplayName}
        </HoverCardTrigger>
      </Link>
      {data?.artistDisplayBio &&
        <HoverCardContent className="flex gap-4 w-fit">
          {/* <div className="w-10 h-10 rounded-full bg-red-500"></div> */}
          <div className="flex flex-col gap-2 min-w-50 max-w-60">
            <p className="font-semibold">{data?.artistAlphaSort}</p>
            <p>{data?.artistDisplayBio}</p>
          </div>
        </HoverCardContent>
      }
    </HoverCard>
    }
    </>
  )
}
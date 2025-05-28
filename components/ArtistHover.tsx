import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

import { User } from 'lucide-react';

import { ApiDetailsProps } from "@/types/api";

interface ArtistHoverProps {
  data?: ApiDetailsProps;
}

export default function ArtistHover({ data }: ArtistHoverProps) {
  return (
    <>
    {data?.artistDisplayName && 
    <HoverCard>
      <HoverCardTrigger href={data?.artistWikidata_URL} target="_blank" className="w-fit font-semibold flex items-start gap-1 hover:underline cursor-pointer">
        <User size={16} className="mt-1" />
        <p className="w-full">{data?.artistDisplayName}</p>
      </HoverCardTrigger>
      {data?.artistDisplayBio &&
        <HoverCardContent className="flex gap-4 w-fit">
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
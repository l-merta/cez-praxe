import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import useGetDetail from "@/hooks/useGetDetail";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import ArtistHover from "./ArtistHover";
import Card_Skeleton from "./Card_Skeleton";
import LikeButton from "@/components/LikeButton";

import { BadgeCheck, Images, ImageOff } from "lucide-react";

import { ApiDetailsProps } from "@/types/api";

interface CardProps {
  id: number;
}

export default function Card({ id }: CardProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [hovered, setHovered] = useState(true); // Start opened
  const [naturalHeight, setNaturalHeight] = useState(0);

  const { data, isLoading } = useGetDetail({ id });

  // Close right after mount
  useEffect(() => {
    const timeout = setTimeout(() => setHovered(false), 50);
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseEnter = () => {
    if (imgRef.current) {
      setNaturalHeight(imgRef.current.naturalHeight * (imgRef.current.offsetWidth / imgRef.current.naturalWidth));
    }
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // 16:9 aspect ratio for initial state
  const width = 300;
  const initialHeight = 0.5625 * width;
  const maxOpenedHeight = 450; // Set your desired max opened height

  if (isLoading || !data) return (
    <Card_Skeleton />
  )
  return (
    <div
      className="flex flex-col h-full rounded-t-md relative overflow-hidden group max-w-200"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-2 absolute top-2 left-3 z-1">
        {data.isHighlight && 
          <Badge className="bg-gray-800/50 py-1.5 px-2 flex gap-1.5 text-md">
            <BadgeCheck className="!w-5 !h-5" />
          </Badge>
        }
        {data.additionalImages.length > 0 && 
          <Badge className="bg-gray-800/50  py-1 px-2 flex gap-1.5 text-md">
            <Images className="!w-4.5 !h-4.5" />
            {data.additionalImages.length + 1}
          </Badge>
        }
      </div>
      <Link
        href={'' + data.objectID}
        className="relative w-full overflow-hidden"
        style={{
          height:
            hovered && naturalHeight
              ? Math.min(Math.max(naturalHeight, initialHeight), maxOpenedHeight)
              : initialHeight,
          minHeight: initialHeight,
          maxHeight: maxOpenedHeight,
          transition: "height 0.5s"
        }}
      >
        {data?.primaryImage ? (
          <Image
            ref={imgRef}
            src={data?.primaryImageSmall}
            alt={data?.title}
            className="object-cover w-full h-full"
            width={width}
            height={initialHeight}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%"
            }}
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center" style={{height: "100%"}}>
            <ImageOff className="text-gray-500" />
          </div>
        )}
      </Link>
      {/* Text area fills the rest of the card */}
      <div className="flex flex-col justify-between gap-4 p-4 rounded-b-md border-2 border-t-0 border-gray-100 flex-1">
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <Link href={'' + data.objectID} className="w-full ">
              <h3 className="text-xl font-bold line-clamp-3 hover:underline">{data?.title}</h3>
            </Link>
            <LikeButton id={data.objectID} title={data.title} />
          </div>
          {data?.elementDescrition && (
            <p className="text-sm text-gray-500">{data?.elementDescrition}</p>
          )}
          {data?.tags && (
            <div className="flex flex-wrap gap-2">
              {data?.tags.map((tag) => (
                <Badge key={tag.term} variant="secondary" className="text-sm">
                  {tag.term}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <ArtistHover data={data as ApiDetailsProps} />
      </div>
    </div>
  );
}
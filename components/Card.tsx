//import { ApiCardProps } from '@/interface/api';
import { useRef, useState, useEffect } from "react";
import useGetDetail from "@/hooks/useGetDetail";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { ImageOff } from "lucide-react";
import Card_Skeleton from "./Card_Skeleton";

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

  if (isLoading) return (
    <Card_Skeleton />
  )
  return (
    <div
      className="rounded-t-md overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          height: hovered && naturalHeight ? naturalHeight : initialHeight,
        }}
      >
        {data?.primaryImage ? (
          <Image
            ref={imgRef}
            src={data?.primaryImageSmall}
            alt={data?.title}
            className="object-cover w-full h-full transition-all duration-500"
            width={300}
            height={Math.round(initialHeight)}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <ImageOff className="text-gray-500" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4 rounded-b-md border-2 border-t-0 border-gray-100">
        <h3 className="text-xl font-bold">{data?.title}</h3>
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
        <p className="text-sm text-gray-500">{data?.objectID}</p>
      </div>
    </div>
  );
}
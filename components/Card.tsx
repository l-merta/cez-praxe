import { ApiCardProps } from '@/interface/api';
import { useRef, useState, useEffect } from "react";
import useGetDetail from "@/hooks/useGetDetail";

interface CardProps {
  id: number;
}

export default function Card({ id }: CardProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [hovered, setHovered] = useState(true); // Start opened
  const [naturalHeight, setNaturalHeight] = useState(0);

  const { data } = useGetDetail({ id });

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
  const initialHeight = 0.5625 * 300; // 300px width example, adjust as needed

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
        {data?.primaryImage && (
          <img
            ref={imgRef}
            src={data?.primaryImageSmall}
            alt=""
            className="object-cover w-full h-full transition-all duration-500"
          />
        )}
      </div>
      <div className="flex flex-col gap-2 p-4 rounded-b-md border-2 border-t-0 border-gray-100">
        <h3 className="text-xl font-bold">{data?.title}</h3>
        {data?.elementDescrition && (
          <p className="text-sm text-gray-500">{data?.elementDescrition}</p>
        )}
        <p className="text-sm text-gray-500">{data?.objectDate}</p>
      </div>
    </div>
  );
}
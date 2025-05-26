import { useState, useEffect } from 'react';
import { useFavorites } from "@/hooks/useFavorites";

import { toast } from 'sonner';

import { Heart } from "lucide-react";

interface LikeButtonProps {
  id: number;
  title?: string;
}

export default function LikeButton({ id, title }: LikeButtonProps) {
  const { getFavorites, setFavoriteValue } = useFavorites();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(getFavorites()?.includes(id) || false);
  }, []);

  const handleLike = (liked: boolean) => {
    setFavoriteValue(id, !liked);
    setLiked(!liked);

    toast(liked ? "Removed from favorites" : "Added to favorites", {
      description: title,
      action: {
        label: "Undo",
        onClick: () => handleLike(!liked),
      },
    })
  };

  return (
    <Heart size={22} onClick={() => handleLike(liked)} className={"w-fit mt-1 cursor-pointer transition-all duration-75 active:scale-[0.9] " + (liked ? "text-red-500" : "")} />
  ); 
}

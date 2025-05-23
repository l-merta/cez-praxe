import { useState, useEffect } from 'react';
import { useFavorites } from "@/hooks/useFavorites";

import { Heart } from "lucide-react";

interface LikeButtonProps {
  id: number;
}

export default function LikeButton({ id }: LikeButtonProps) {
  const { getFavorites, setFavoriteValue } = useFavorites();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(getFavorites()?.includes(id) || false);
  }, []);

  const handleLike = () => {
    setFavoriteValue(id, !liked);
    setLiked(!liked);
  };

  return (
    <Heart size={22} onClick={handleLike} className={"w-fit mt-1 cursor-pointer transition-all duration-75 active:scale-[0.9] " + (liked ? "text-red-500" : "")} />
  ); 
}
import { useState, useEffect } from 'react';
import { useFavorites } from "@/hooks/useFavorites";

import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

import { Heart } from "lucide-react";

interface LikeButtonProps {
  children?: React.ReactNode;
  id: number;
  title?: string;
  onLikeChanged?: (value: boolean) => void;
}

export default function LikeButton({ children, id, title, onLikeChanged }: LikeButtonProps) {
  const { getFavorites, setFavoriteValue } = useFavorites();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(getFavorites()?.includes(id) || false);
  }, [getFavorites, id]);

  const handleLike = (liked: boolean) => {
    setFavoriteValue(id, !liked);
    setLiked(!liked);

    toast(liked ? "Removed from favorites" : "Added to favorites", {
      description: title,
      action: {
        label: "Undo",
        onClick: () => handleClick(!liked),
      },
    })
  };

  const handleClick = (value: boolean) => {
    handleLike(value);
    if (onLikeChanged) {
      onLikeChanged(!value);
    }
  }

  return (
    <Button variant={"link"} className='w-fit h-fit !p-0 flex items-center gap-2 mt-1' onClick={() => handleClick(liked)}>
      <Heart className={"!w-5 !h-5 cursor-pointer transition-all duration-75 active:scale-[0.9] " + (liked ? "text-red-500" : "")} />
      {children && <span>{children}</span>}
    </Button>
  ); 
}

import { useEffect } from "react";

export function useFavorites() {
  const getFavorites = () => {
    if (typeof window !== "undefined") {
      const favoritesString = localStorage.getItem("favorites");
      return favoritesString ? JSON.parse(favoritesString) : [];
    }
    return [];
  }

  const setFavoriteValue = (id: number, value: boolean) => {
    if (value) {
      addFavorite(getFavorites(), id);
    } else {
      removeFavorite(getFavorites(), id);
    }
  };

  const addFavorite = (prev: number[], id: number) => {
    const updated = [...prev, id];
    localStorage.setItem("favorites", JSON.stringify(updated));
    return updated;
  };

  const removeFavorite = (prev: number[], id: number) => {
    const updated = prev.filter((favoriteId) => favoriteId !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    return updated;
  };

  return { getFavorites, setFavoriteValue };
}
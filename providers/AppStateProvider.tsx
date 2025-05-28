"use client";
import useGetObjects from '@/hooks/useGetObjects';
import { murmurhash3_32_gc } from '@/hooks/useShuffle';
import React, { createContext, useState, ReactNode, useEffect, useCallback } from 'react';

interface AppStateProviderProps {
  children: ReactNode;
}
interface AppContextProps {
  featured: number[] | undefined;
  setFeatured: React.Dispatch<React.SetStateAction<number[] | undefined>>;
  data: { objectIDs: number[] } | undefined;
  isLoading: boolean;
  getRandomObjects: (length?: number, seed?: string | number) => number[];
}

const AppContext = createContext<AppContextProps>({
  featured: undefined,
  setFeatured: () => {},
  data: undefined,
  isLoading: true,
  getRandomObjects: () => [],
});

const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [featured, setFeatured] = useState<number[]>();
  const { data , isLoading} = useGetObjects();
  
  const date = new Date();
  const dateSeed = "" + date.getDate() + date.getMonth() + date.getFullYear();
  
  // Wrap getRandomObjects with useCallback to memoize it
  const getRandomObjects = useCallback(
    (length?: number, seed?: string | number) => {
      if (!data?.objectIDs) return [];

      let ids = [...data.objectIDs];

      if (seed) {
        const seedStr = String(seed);
        const seedNum = murmurhash3_32_gc(seedStr);

        const entries = ids.map((id) => ({
          id,
          sortKey: murmurhash3_32_gc(`${seedStr}-${id}`, seedNum),
        }));

        ids = entries
          .sort((a, b) => a.sortKey - b.sortKey)
          .map((entry) => entry.id);
        }
      else {
        // Fisher-Yates shuffle for true randomness
        for (let i = ids.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [ids[i], ids[j]] = [ids[j], ids[i]];
        }
      }
      

      return length ? ids.slice(0, length) : ids;
    },
    [data]
  );

  useEffect(() => {
    setFeatured(getRandomObjects(10, dateSeed));
  }, [data]);


  return <AppContext value={{ featured, setFeatured, data, isLoading,getRandomObjects }}>{children}</AppContext>;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export { AppContext, AppStateProvider, scrollToTop };
"use client"

import { useEffect, useState, useRef, useCallback } from "react"

import Card from '@/components/Card'
import { Button } from "@/components/ui/button"
import CardList_Skeleton from '@/components/sections/CardList_Skeleton'

import { RotateCcw } from "lucide-react";

interface CardListProps {
  header?: string;
  icon?: React.ReactNode;
  url?: string;
  data?: number[];
  isLoading?: boolean;
  reload?: boolean;
  fnData?: (length?: number) => number[];
  fnPar?: number;
}

export default function CardList({
    header,
    icon,
    //url,
    data,
    isLoading,
    reload,
    fnData,
    fnPar,
  }: CardListProps) {
  const [internalData, setInternalData] = useState<number[] | undefined>(data);
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)
  const loader = useRef<HTMLDivElement | null>(null)
  const PAGE_SIZE = 15;

  // Data loading effect, runs on mount and when reloadKey changes
  useEffect(() => {
    if (fnData) {
      setInternalData(fnPar ? fnData(fnPar) : fnData());
    } else {
      setInternalData(data);
    }
    setPage(0); // Reset page on reload
  }, [fnData, fnPar, data, reloadKey]);

  // Infinite scroll observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, isLoading])

  useEffect(() => {
    const option = { root: null, rootMargin: "100px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    const currentLoader = loader.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => { if (currentLoader) observer.unobserve(currentLoader) };
  }, [handleObserver]);

  useEffect(() => {
    if (internalData) {
      const maxPage = Math.ceil(internalData.length / PAGE_SIZE) - 1;
      setHasMore(page < maxPage);
    }
  }, [internalData, page]);

  const visibleCards = internalData?.slice(0, (page + 1) * PAGE_SIZE) || [];

  return (
    <div>
      <div className="section-width flex justify-between align-center gap-4 mb-6 flex-wrap ">
        {header && <h2 className="text-2xl font-bold flex items-center gap-2">{icon} {header}</h2>}
        {reload && 
          <Button onClick={() => setReloadKey(k => k + 1)} className="rounded-full p-2">
            Reload <RotateCcw />
          </Button>
        }
      </div>
      <div
        className="section-width grid gap-y-6 gap-x-4 justify-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {visibleCards.map((card, index) => (
          <Card key={'key' + index} id={card} />
        ))}
      </div>
      <div ref={loader} />
      {isLoading && <CardList_Skeleton cardsCount={8} />}
      {!hasMore && !isLoading && <div className="text-center py-10 text-gray-400">No more cards.</div>}
    </div>
  )
}
"use client"

import { useEffect, useState, useRef, useCallback } from "react"

import Card from '@/components/Card'
import { Button, buttonVariants } from "@/components/ui/button"
import CardList_Skeleton from '@/components/sections/CardList_Skeleton'

interface CardListProps {
  header?: string;
  url?: string;
  data?: number[];
  isLoading?: boolean;
  reload?: boolean;
  fnData?: (length?: number) => number[];
  fnPar?: number;
}

export default function CardList(props: CardListProps) {
  const [internalData, setInternalData] = useState<number[] | undefined>(props.data);
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)
  const loader = useRef<HTMLDivElement | null>(null)
  const PAGE_SIZE = 15;

  // Data loading effect, runs on mount and when reloadKey changes
  useEffect(() => {
    if (props.fnData) {
      setInternalData(props.fnPar ? props.fnData(props.fnPar) : props.fnData());
    } else {
      setInternalData(props.data);
    }
    setPage(0); // Reset page on reload
  }, [props.fnData, props.fnPar, props.data, reloadKey]);

  // Infinite scroll observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !props.isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, props.isLoading])

  useEffect(() => {
    const option = { root: null, rootMargin: "100px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => { if (loader.current) observer.unobserve(loader.current) };
  }, [handleObserver])

  useEffect(() => {
    if (internalData) {
      const maxPage = Math.ceil(internalData.length / PAGE_SIZE) - 1;
      setHasMore(page < maxPage);
    }
  }, [internalData, page]);

  const visibleCards = internalData?.slice(0, (page + 1) * PAGE_SIZE) || [];

  return (
    <div>
      <div className="section-width flex align-center gap-2">
        {props.header && <h2 className="section-width text-2xl font-bold mb-6">{props.header}</h2>}
        {props.reload && <Button onClick={() => setReloadKey(k => k + 1)}>Reload</Button>}
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
      {props.isLoading && <CardList_Skeleton cardsCount={8} />}
      {!hasMore && !props.isLoading && <div className="text-center py-10 text-gray-400">No more cards.</div>}
    </div>
  )
}
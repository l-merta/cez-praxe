"use client"

import { useEffect, useState, useRef, useCallback } from "react"

import Card from '@/components/Card'
import CardList_Skeleton from '@/components/sections/CardList_Skeleton'

interface CardListProps {
  header?: string;
  url?: string;
  data?: number[];
  isLoading?: boolean;
}

export default function CardList(props: CardListProps) {
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const loader = useRef<HTMLDivElement | null>(null)
  
  const PAGE_SIZE = 15;

  // Infinite scroll observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !props.isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, props.isLoading])

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => { if (loader.current) observer.unobserve(loader.current) };
  }, [handleObserver])

  useEffect(() => {
    if (props.data) {
      const maxPage = Math.ceil(props.data.length / PAGE_SIZE) - 1;
      setHasMore(page < maxPage);
    }
  }, [props.data, page]);

  const visibleCards = props.data?.slice(0, (page + 1) * PAGE_SIZE) || [];

  return (
    <div>
      {props.header && <h2 className="section-width text-2xl font-bold mb-6">{props.header}</h2>}
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
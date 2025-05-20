"use client"

import { useEffect, useState, useRef, useCallback } from "react"

import Card from '@/components/Card'
import CardList_Skeleton from '@/components/sections/CardList_Skeleton'

import { ApiCardProps } from '@/interface/api';
import useGetObjects from "@/hooks/useGetObjects";

interface CardListProps {
  url: string;
  data?: number[];
  isLoading?: boolean;
}

export default function CardList({ url, data, isLoading }: CardListProps) {
  const [objectIDs, setObjectIDs] = useState<number[]>([])
  const [cards, setCards] = useState<ApiCardProps[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const loader = useRef<HTMLDivElement | null>(null)
  
  const PAGE_SIZE = 15;
  const BASE_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";
  const API_URL = BASE_API_URL + url;

  // Infinite scroll observer
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading])

  useEffect(() => {
    const option = { root: null, rootMargin: "20px", threshold: 1.0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => { if (loader.current) observer.unobserve(loader.current) };
  }, [handleObserver])

  return (
    <div>
      <div
        className="section-width grid gap-y-6 gap-x-4 justify-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {data?.slice(0, 10).map((card, index) => (
          <Card key={'key' + index} id={card} />
        ))}
      </div>
      <div ref={loader} />
      {loading && <CardList_Skeleton cardsCount={8} />}
      {!hasMore && !loading && <div className="text-center py-10 text-gray-400">No more cards.</div>}
    </div>
  )
}
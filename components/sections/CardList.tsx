"use client"

import { useEffect, useState, useRef, useCallback } from "react"

import Card from '@/components/Card'
import CardList_Skeleton from '@/components/sections/CardList_Skeleton'

import { ApiCardProps } from '@/interface/api';

interface CardListProps {
  url: string;
}

export default function CardList({ url }: CardListProps) {
  const [objectIDs, setObjectIDs] = useState<number[]>([])
  const [cards, setCards] = useState<ApiCardProps[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true)
  const loader = useRef<HTMLDivElement | null>(null)
  
  const PAGE_SIZE = 15;
  const BASE_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";
  const API_URL = BASE_API_URL + url;

  // Fetch all object IDs on mount
  useEffect(() => {
    async function fetchObjectIDs() {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      let ids = data.objectIDs || [];
      // Shuffle the array
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j], ids[i]];
      }
      setObjectIDs(ids);
      setLoading(false);
    }
    fetchObjectIDs();
  }, [])

  // Fetch cards for current page
  useEffect(() => {
    async function fetchCards() {
      if (!objectIDs.length) return;
      setLoading(true);
      const start = page * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const idsToFetch = objectIDs.slice(start, end);

      const results = await Promise.all(
        idsToFetch.map(async (id) => {
          const res = await fetch(`${BASE_API_URL}objects/${id}`);
          const card = await res.json();
          return card as ApiCardProps;
        })
      )
      setCards((prev) => [...prev, ...results]);
      setHasMore(end < objectIDs.length);
      setLoading(false);
    }
    fetchCards();
  }, [objectIDs, page])

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
        className="max-w-7xl mx-auto grid gap-y-6 gap-x-4 justify-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {cards.map((card, index) => (
          (card.primaryImageSmall && <Card key={'key' + index} data={card} />)
        ))}
      </div>
      <div ref={loader} />
      {loading && <CardList_Skeleton cardsCount={8} />}
      {!hasMore && !loading && <div className="text-center py-10 text-gray-400">No more cards.</div>}
    </div>
  )
}
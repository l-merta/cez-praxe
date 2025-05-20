"use client"

import { useEffect, useState } from "react"

import Card from '@/components/Card'

import { ApiCardProps } from '@/interface/api';

const OBJECT_IDS = [
  55324, 425123, 12345, 123, 436839,
  10425, 10020, 32145, 10252, 8500
]

export default function CardList() {
  const [cards, setCards] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCards() {
      setLoading(true)
      const results = await Promise.all(
        OBJECT_IDS.map(async (id) => {
          const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
          return res.json()
        })
      )
      setCards(results)
      setLoading(false)
    }
    fetchCards()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  return (
    <div
      className="max-w-6xl mx-auto grid gap-y-6 gap-x-4 justify-center"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
    >
      {cards.map((card: ApiCardProps) => (
        <Card
          key={'key' + card.objectID}
          data={card}
        />
      ))}
    </div>
  )
}
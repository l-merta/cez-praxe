import Card_Skeleton from '@/components/Card_Skeleton'

interface CardListSkeletonProps {
  cardsCount: number;
}

export default function CardList_Skeleton({ cardsCount }: CardListSkeletonProps) {
  return (
    <div>
      <div
        className="section-width grid gap-y-6 gap-x-4 justify-center"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
      >
        {Array.from({ length: cardsCount }, (_, index) => (
          <Card_Skeleton key={index} />
        ))}
      </div>
    </div>
  )
}
import { Skeleton } from "../ui/skeleton";

export default function ArtPage_Skeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="!w-full ratio-[3/4] h-96" />
      <div className="flex flex-col gap-6 w-full">
        <Skeleton className="w-9/10 h-20" />
        <Skeleton className="w-full h-10" />
        <div className="flex flex-wrap gap-4">
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-20 h-8" />
          <Skeleton className="w-20 h-8" />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Skeleton className="w-12 rounded-full aspect-square" />
          <Skeleton className="w-60 h-6" />
        </div>
      </div>
    </div>
  )
}
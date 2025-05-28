import { Skeleton } from "@/components/ui/skeleton";

export default function Card_Skeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-[16/9]" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-[40%]" />
      </div>
    </div>
  );
}
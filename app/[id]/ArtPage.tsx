"use client";
import { useParams } from "next/navigation";
import useGetDetail from "@/hooks/useGetDetail";
import Link from "next/link";
import Image from "next/image";

import LikeButton from "@/components/LikeButton";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { ArrowLeftFromLine, ImageOff, Heart, User } from "lucide-react";

export default function ArtPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetDetail({ id: Number(id) });

  if (isError) return (
    <main className="section-width px-4 pt-6 flex flex-col gap-4">
      <Link href='/'><Button>
        <ArrowLeftFromLine />
        Back
      </Button></Link>
      <h1 className="text-2xl font-bold">Error: {error.message}</h1>
    </main>
  )
  if (isLoading) return (
    <main className="section-width px-4 pt-6 flex flex-col gap-4">
      <Link href='/'><Button>
        <ArrowLeftFromLine />
        Back
      </Button></Link>
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
    </main>
  );
  if (data) return (
    <main className="section-width px-4 pt-6 flex flex-col gap-4">
      <Link href='/'><Button>
        <ArrowLeftFromLine />
        Back
      </Button></Link>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        {data.primaryImage ? (
          <Image
            src={data.primaryImageSmall}
            alt={data.title}
            width={2000}
            height={2000}
            className="object-contain rounded-lg"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full rounded-lg aspect-[16/9] flex items-center justify-center" style={{height: "100%"}}>
            <ImageOff className="text-gray-500" />
          </div>
        )}
        <div className="flex flex-col gap-6 w-full">
          <h1 className="font-bold text-4xl">{data.title}</h1>
          {data.elementDescrition && <p className="font-bold text-4xl">{data.elementDescrition}</p>}
          <LikeButton id={data.objectID} title={data.title}>Add to favorites</LikeButton>
          {data.tags && <div className="flex flex-wrap gap-2">
            {data.tags?.map((tag) => (
              <Badge key={tag.term} className="text-sm">
                {tag.term}
              </Badge>
            ))}
          </div>}
          <div className="flex flex-wrap gap-2 items-center">
            <User size={20} />
            <Link href={data.artistWikidata_URL}><h2 className="hover:underline">{data.artistDisplayName}</h2></Link>
          </div>
        </div>
      </div>
    </main>
  );
}
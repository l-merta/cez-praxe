"use client";
import { useParams } from "next/navigation";
import useGetDetail from "@/hooks/useGetDetail";

import Image from "next/image";
import Recommended from "@/components/sections/Recommended";

import ButtonBack from "@/components/ButtonBack";
import { Badge } from "@/components/ui/badge";
import LikeButton from "@/components/LikeButton";
import DetailData from "@/components/DetailLabel";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Carousel from "@/components/Carousel";
import ArtPage_Skeleton from "@/components/skeletons/ArtPage_Skeleton";

import { ImageOff, BadgeCheck, User, Diamond, Flag } from "lucide-react";

export default function ArtPage() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetDetail({ id: Number(id) });

  if (isError) return (
    <main className="section-width px-4 pt-6 flex flex-col gap-4">
      <ButtonBack />
      <h1 className="text-2xl font-bold">Error: {error.message}</h1>
    </main>
  )
  if (isLoading) return (
    <main className="section-width px-4 pt-6 flex flex-col gap-4">
      <ButtonBack />
      <ArtPage_Skeleton />
    </main>
  );
  if (data) return (
    <main className="section-width px-4 pt-6 pb-10 flex flex-col gap-4">
      <ButtonBack />
      <div className="min-h-[60vh] flex items-start flex-wrap md:flex-nowrap gap-4">
        {data.primaryImage ? (
          (data.additionalImages.length > 0 ?
            <Carousel imgs={[data.primaryImage, ...data.additionalImages]} pageTitle={data.title} ></Carousel>
          : 
            <Image
              src={data.primaryImageSmall}
              alt={data.title}
              width={1400}
              height={2000}
              className="object-contain rounded-lg w-full md:w-1/2"
            />
          )
        ) :
          <div className="bg-gray-200 w-full h-full rounded-lg aspect-[16/9] flex items-center justify-center">
            <ImageOff className="text-gray-500" />
          </div>
        }
        <div className="flex flex-col gap-4 w-full">
          {(data.objectDate || data.isHighlight) && 
            <div className="flex items-center gap-2 mb-[-0.7rem]">
              {data.isHighlight && 
                <Tooltip>
                  <TooltipTrigger className="p-0.5">
                    <Badge className="bg-gray-800 p-0.5"><BadgeCheck className="!w-5 !h-5" /></Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    This art is highlighted.
                  </TooltipContent>
                </Tooltip>
              }
              <span className="font-semibold">{data.objectDate}</span>
            </div>
          }
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
          <div className="flex flex-wrap gap-7 gap-y-2">
            <DetailData data={data.artistDisplayName} icon={<User size={20} />} link={data.artistWikidata_URL} />
            <DetailData data={data.objectName} icon={<Diamond size={20} />} />
            <DetailData data={data.city} icon={<Flag size={20} />}>{data.city}, {data.country}</DetailData>
          </div>
        </div>
      </div>
      <Recommended search={data.title}></Recommended>
    </main>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import { Button } from './ui/button';

import { ArrowRight, ArrowLeft } from 'lucide-react';

interface CarouselProps {
  imgs: Array<string>;
  pageTitle: string;
}
enum Direction {
  Left = "left",
  Right = "right"
}

export default function Carousel({ imgs, pageTitle }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadedImages = useRef<Set<string>>(new Set());

  const imageW: number = 1400;
  const imageH: number = 2000;

  useEffect(() => {
    // If image is already loaded, don't show spinner
    if (loadedImages.current.has(imgs[current])) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [current, imgs]);

  const handleChange = (dir: Direction) => {
    if (isAnimating) return;
    setDirection(dir);
    setPrevIndex(current);
    setIsAnimating(true);
    setLoading(false);
    setCurrent((prev) =>
      dir === Direction.Right
        ? (prev === imgs.length - 1 ? 0 : prev + 1)
        : (prev === 0 ? imgs.length - 1 : prev - 1)
    );
  };

  const handleAnimationEnd = () => {
    setPrevIndex(null);
    setIsAnimating(false);
  };

  return (
    <div className='!w-full md:w-1/2 flex flex-col gap-4 overflow-hidden'>
      <div className="relative w-full h-[600px] min-h-[200px] max-h-[70vh] bg-gray-100 rounded-lg">
        {prevIndex !== null && (
          <div
            className={`
              absolute inset-0 transition-transform duration-500
              pointer-events-none 
              ${direction === "right" ? "animate-slide-out-left" : "animate-slide-out-right"}
            `}
            onAnimationEnd={handleAnimationEnd}
            key={`prev-${prevIndex}`}
          >
            <Image
              src={imgs[prevIndex]}
              alt={pageTitle}
              width={imageW}
              height={imageH}
              className="object-contain rounded-lg w-full h-full"
            />
          </div>
        )}
        <div
          className={`
            absolute inset-0 transition-transform duration-500 
            ${isAnimating
              ? direction === "right"
                ? "animate-slide-in-right"
                : "animate-slide-in-left"
              : ""}
          `}
        >
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg z-10">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
            </div>
          )}
          <Image
            src={imgs[current]}
            alt={pageTitle}
            width={imageW}
            height={imageH}
            className="object-contain rounded-lg w-full h-full"
            onLoad={() => {
              loadedImages.current.add(imgs[current]);
              setLoading(false);
            }}
            priority
          />
        </div>
      </div>
      <div className='flex justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <Button className='!p-1 rounded-full w-fit h-fit' variant={"ghost"} onClick={() => handleChange(Direction.Left)} aria-label="Previous image" disabled={isAnimating}><ArrowLeft className='!w-7 !h-7' /></Button>
          <Button className='!p-1 rounded-full w-fit h-fit' variant={"ghost"} onClick={() => handleChange(Direction.Right)} aria-label="Next image" disabled={isAnimating}><ArrowRight className='!w-7 !h-7' /></Button>
        </div>
        <div className='flex justify-center items-center gap-2'>
          {imgs.map((img, index) => (
            <button
              key={img}
              type="button"
              className={`w-4.5 h-4.5 rounded-full cursor-pointer border-3 transition-colors duration-200 focus:outline-none ${
                index === current ? 'border-gray-900' : 'border-gray-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isAnimating || index === current}
              onClick={() => {
                if (isAnimating || index === current) return;
                setDirection(index > current ? Direction.Right : Direction.Left);
                setPrevIndex(current);
                setIsAnimating(true);
                setLoading(false);
                setCurrent(index);
              }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
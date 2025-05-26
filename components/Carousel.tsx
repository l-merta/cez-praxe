import { useState } from 'react';
import Image from 'next/image';

import { Button } from './ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface CarouselProps {
  imgs: Array<string>;
}

export default function Carousel({ imgs }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChange = (dir: "left" | "right") => {
    if (isAnimating) return;
    setDirection(dir);
    setPrevIndex(current);
    setIsAnimating(true);
    setCurrent((prev) =>
      dir === "right"
        ? (prev === imgs.length - 1 ? 0 : prev + 1)
        : (prev === 0 ? imgs.length - 1 : prev - 1)
    );
  };

  const handleAnimationEnd = () => {
    setPrevIndex(null);      // Remove previous image first
    setIsAnimating(false);   // Then allow new transitions
  };

  return (
    <div className='!w-full md:w-1/2 flex flex-col gap-4 overflow-hidden'>
      <div className="relative w-full h-[600px] min-h-[200px] max-h-[70vh] bg-gray-100 rounded-lg">
        {/* Previous image (slides out) */}
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
              alt="Previous"
              width={1400}
              height={2000}
              className="object-contain rounded-lg w-full h-full"
            />
          </div>
        )}
        {/* Current image (slides in) */}
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
          <Image
            src={imgs[current]}
            alt="Current"
            width={1400}
            height={2000}
            className="object-contain rounded-lg w-full h-full"
          />
        </div>
      </div>
      <div className='flex justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <Button className='!p-1 rounded-full w-fit h-fit' variant={"ghost"} onClick={() => handleChange("left")} aria-label="Previous image" disabled={isAnimating}><ArrowLeft className='!w-7 !h-7' /></Button>
          <Button className='!p-1 rounded-full w-fit h-fit' variant={"ghost"} onClick={() => handleChange("right")} aria-label="Next image" disabled={isAnimating}><ArrowRight className='!w-7 !h-7' /></Button>
        </div>
        <div className='flex justify-center items-center gap-2'>
          {imgs.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-4.5 h-4.5 rounded-full cursor-pointer border-3 transition-colors duration-200 focus:outline-none ${
                index === current ? 'border-gray-900' : 'border-gray-200'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isAnimating || index === current}
              onClick={() => {
                if (isAnimating || index === current) return;
                setDirection(index > current ? "right" : "left");
                setPrevIndex(current);
                setIsAnimating(true);
                setCurrent(index);
              }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add these Tailwind CSS keyframes to your global CSS (e.g., globals.css):
/*
@layer utilities {
  @keyframes slide-in-right {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slide-in-left {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slide-out-left {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-100%); opacity: 0; }
  }
  @keyframes slide-out-right {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  .animate-slide-in-right {
    animation: slide-in-right 0.5s;
  }
  .animate-slide-in-left {
    animation: slide-in-left 0.5s;
  }
  .animate-slide-out-left {
    animation: slide-out-left 0.5s;
  }
  .animate-slide-out-right {
    animation: slide-out-right 0.5s;
  }
}
*/
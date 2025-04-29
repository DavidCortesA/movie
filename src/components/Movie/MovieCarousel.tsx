"use client";

import Link from "next/link";
import { MovieCard } from "./MovieCard";
import { useRef } from "react";

export const MovieCarousel = ({
  title,
  slug,
  movies,
  isLoading,
}: {
  title: string;
  slug: string;
  movies: Movie[];
  isLoading: boolean;
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    carouselRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-bold text-indigo-600">{title}</h3>
        <Link href={slug} className="text-indigo-600 hover:text-indigo-500 text-sm">
          View More
        </Link>
      </div>

      <div className="relative">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 shadow px-2 py-1 rounded-full"
        >
          ◀
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 hover:bg-opacity-100 shadow px-2 py-1 rounded-full"
        >
          ▶
        </button>

        <div
          ref={carouselRef}
          className="flex flex-row gap-3 overflow-x-hidden scrollbar-hide scroll-smooth px-6 py-2"
        >
          {movies?.map((movie: Movie) => (
            <div key={movie.id} className="min-w-[200px]">
              <MovieCard movie={movie} isLoading={isLoading} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

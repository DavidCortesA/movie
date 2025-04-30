"use client";

import Link from "next/link";
import { MovieCard } from "./MovieCard";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  if (isLoading && !movies) return null

  return (
    <section className="w-full mb-8">
      {/* Encabezado */}
      <div className="flex justify-between items-center px-4 mb-2">
        <h3 className="text-xl font-bold text-yellow-400">{title}</h3>
        <Link href={slug} className="text-sm text-yellow-400 hover:underline">
          Ver más →
        </Link>
      </div>

      {/* Carrusel */}
      <div className="relative">
        {/* Botón Izquierda */}
        <button
          aria-label="Scroll Left"
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-yellow-400 hover:text-black text-white p-2 rounded-full transition cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Carrusel de tarjetas */}
        <div
          ref={carouselRef}
          className="flex overflow-x-hidden gap-4 px-6 py-3 scroll-smooth scrollbar-hide"
        >
          {movies?.map((movie: Movie) => (
            <div key={movie.id} className="min-w-[200px]">
              <MovieCard movie={movie} isLoading={isLoading} />
            </div>
          ))}
        </div>

        {/* Botón Derecha */}
        <button
          aria-label="Scroll Right"
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-yellow-400 hover:text-black text-white p-2 rounded-full transition cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

'use client'
import { useFetchTrendingMovies } from "@/api/api";
import { MovieCarousel } from "./MovieCarousel";

export const MovieGrid = () => {
  const { movies, isLoading } = useFetchTrendingMovies();

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full p-4">
        <MovieCarousel movies={movies} isLoading={isLoading} title="Trending Movies" slug="/trending" />
      </div>
    </div>
  )
}
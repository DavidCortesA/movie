'use client'
import { useFetchTrendingMovies } from "@/api/api";
import { MovieCard } from "./MovieCard";

export const MovieGrid = () => {
  const { movies, isLoading, isError } = useFetchTrendingMovies();

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
          {/* Movie Cards */}
          {movies?.map((movie: Movie) => (
            <MovieCard movie={movie} key={movie.id} isLoading={isLoading} />
          ))} 
        </div>
      </div>
    </div>
  )
}
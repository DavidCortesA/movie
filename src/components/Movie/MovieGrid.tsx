'use client'

import { useState } from "react";
import { useFetchGenresMovies } from "@/api/movie";
import { Pagination } from "@/components/Common/Pagination";
import { MovieCard } from "@/components/Movie/MovieCard";

export const MovieGrid = ({
  title,
  movie,
  isLoading,
  page,
  handlePageChange,
  totalPages
}: {
  title: string,
  movie: Movie[],
  isLoading: boolean,
  page: number,
  handlePageChange: (page: number) => void,
  totalPages: number
}) => {
  const [orderFilter, setOrderFilter] = useState("default");
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const { genresMovie, isLoadingGenres } = useFetchGenresMovies();

  let filteredResults = movie || [];

  // 1️⃣ Filtro por género
  if (genreFilter !== "all") {
    filteredResults = filteredResults.filter((m) => 
      m.genre_ids?.includes(Number(genreFilter))
    );
  }

  // 2️⃣ Ordenamiento
  if (orderFilter === "a-z") {
    filteredResults = [...filteredResults].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else if (orderFilter === "z-a") {
    filteredResults = [...filteredResults].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  } else if (orderFilter === "recent") {
    filteredResults = [...filteredResults].sort(
      (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  } else if (orderFilter === "oldest") {
    filteredResults = [...filteredResults].sort(
      (a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
    );
  } else if (orderFilter === "popular") {
    filteredResults = [...filteredResults].sort(
      (a, b) => (b.popularity ?? 0) - (a.popularity ?? 0)
    );
  }

  return (
    <div className="container h-full w-full">
      <h1 className="text-center text-3xl font-bold mb-4 text-yellow-500">{title}</h1>

      {/* 🔥 Selects de filtro */}
      <div className="flex flex-wrap gap-4 justify-end mb-6">

        {/* Filtro de Orden */}
        <select
          value={orderFilter}
          onChange={(e) => setOrderFilter(e.target.value)}
          className="p-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option value="default">Ordenar por</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="recent">Más recientes</option>
          <option value="oldest">Más antiguas</option>
          <option value="popular">Más popular</option>
        </select>

        {/* Filtro de Género */}
        {!isLoadingGenres && (
          <select
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="all">Todos los géneros</option>
            {genresMovie?.map((genre: Genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        )} 

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredResults?.map((item: Movie) => (
          <MovieCard
            key={item.id}
            movie={item}
            isLoading={isLoading}
          />
        ))}
      </div>
      
      {filteredResults?.length === 0 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap w-full">
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  )
}

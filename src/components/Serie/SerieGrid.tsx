'use client'

import { useState } from "react"
import { useFetchGenresSeries } from "@/api/serie";
import { SerieCard } from "@/components/Serie/SerieCard";
import { Pagination } from "@/components/Common/Pagination";

export const SerieGrid = ({
  title,
  serie,
  isLoading,
  page,
  handlePageChange,
  totalPages
}: {
  title: string,
  serie: TVShow[],
  isLoading: boolean,
  page: number,
  handlePageChange: (page: number) => void,
  totalPages: number
}) => {
  const [orderFilter, setOrderFilter] = useState("default");
  const [genreFilter, setGenreFilter] = useState<string>("all");
  const { genresTV, isLoadingGenres } = useFetchGenresSeries();

  let filteredResults = serie || [];

  // 1️⃣ Filtro por género
  if(genreFilter !== "all") {
    filteredResults = filteredResults.filter((s) => 
      s.genre_ids?.includes(Number(genreFilter))
    );
  }

  // 2️⃣ Ordenamiento
  if(orderFilter === "a-z") {
    filteredResults = [...filteredResults].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  } else if(orderFilter === "z-a") {
    filteredResults = [...filteredResults].sort((a, b) =>
      b.name.localeCompare(a.name)
    );
  } else if(orderFilter === "recent") {
    filteredResults = [...filteredResults].sort(
      (a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime()
    );
  } else if(orderFilter === "oldest") {
    filteredResults = [...filteredResults].sort(
      (a, b) => new Date(a.first_air_date).getTime() - new Date(b.first_air_date).getTime()
    );
  } else if(orderFilter === "popular") {
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
            {genresTV?.map((genre: Genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        )} 
      </div>

      {/** Grid de Tarjetas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredResults?.map((item: TVShow) => (
          <SerieCard
            key={item.id}
            serie={item}
            isLoading={isLoading}
          />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap w-full">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}
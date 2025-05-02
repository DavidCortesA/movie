'use client'
import { Card, media_type } from "@/components/Common/Card";
import { Pagination } from "@/components/Common/Pagination";
import { useGenres } from "@/contexts/GenresContext";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import useSWR from "swr";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando próximas películas...</div>
  </div>
);

const fetcher = (url: string) => fetch(url).then((res) => res.json());


const GenrePage = () => {
  const { slug } = useParams();
  const { genres, isLoading } = useGenres();
  const genreId = Number(slug);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageParam = searchParams.get("page");
  const page = Number(pageParam) || 1;
  const [orderFilter, setOrderFilter] = useState("default");
  const [typeFilter, setTypeFilter] = useState("all");
  
  const { data: movieResults, error: movieError, isLoading: movieLoading } = useSWR(`
    ${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?with_genres=${slug}&page=${page}&api_key=${process.env.NEXT_PUBLIC_API_KEY}
    `,
    fetcher
  );
  
  const { data: tvResults, error: tvError, isLoading: tvLoading } = useSWR(`
    ${process.env.NEXT_PUBLIC_BASE_URL}/discover/tv?with_genres=${slug}&page=${page}&api_key=${process.env.NEXT_PUBLIC_API_KEY}
    `,
    fetcher
  );

  // 🔥 Aplicamos filtros aquí:
  let filteredResults = tvError && movieError ? [] : [...(tvResults?.results || []), ...(movieResults?.results || [])];

  // 1️⃣ Filtrado por tipo (primero)
  if (typeFilter === "tv") {
    filteredResults = tvResults?.results || [];
  } else if (typeFilter === "movies") {
    filteredResults = movieResults?.results || [];
  }
  
  // 2️⃣ Ordenamiento (después)
  if (orderFilter === "a-z") {
    filteredResults = [...filteredResults].sort((a, b) =>
      (a.title || a.name).localeCompare(b.title || b.name)
    );
  } else if (orderFilter === "z-a") {
    filteredResults = [...filteredResults].sort((a, b) =>
      (b.title || b.name).localeCompare(a.title || a.name)
    );
  } else if (orderFilter === "mostpopular") {
    filteredResults = [...filteredResults].sort(
      (a, b) => a.popularity - b.popularity
    );
  } else if (orderFilter === "leastpopular") {
    filteredResults = [...filteredResults].sort(
      (a, b) => b.popularity - a.popularity
    );
  } else if (orderFilter === "mostrecent") {
    filteredResults = [...filteredResults].sort(
      (a, b) => new Date(b.release_date || b.first_air_date).getTime() - new Date(a.release_date || a.first_air_date).getTime()
    );
  } else if (orderFilter === "leastrecent") {
    filteredResults = [...filteredResults].sort(
      (a, b) => new Date(a.release_date || a.first_air_date).getTime() - new Date(b.release_date || b.first_air_date).getTime()
    );
  }

  const handlePagination = (newPage: number) => {
    router.push(`/genres/${slug}?page=${newPage}`);
  };

  const genreName = genres.find((genre) => genre.id === genreId)?.name;

  if (isLoading) {
    return <div>Cargando...</div>;
  }


  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="container h-full w-full">
        <h1 className="text-xl font-semibold mb-4 text-center text-yellow-400">{genreName}</h1>
      
        <div className="flex flex-wrap gap-4 justify-end mb-6">
          {/* Filtro de tipo */}
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="all">Todos</option>
            <option value="movies">Películas</option>
            <option value="tv">Series</option>
          </select>

          {/* Filtro de orden */}
          <select
            value={orderFilter}
            onChange={(e) => setOrderFilter(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="default">Ordenar por</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
            <option value="mostpopular">Más populares</option>
            <option value="leastpopular">Menos populares</option>
            <option value="mostrecent">Más recientes</option>
            <option value="leastrecent">Menos recientes</option>
          </select>
        </div>

        {/* Mostrar resultados solo cuando ya terminó de cargar */}
        {!movieLoading && !tvLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredResults?.map((result: SearchResult, index: number) => (
              <Card key={index} items={result} isLoading={false} mediaType={result.first_air_date ? "tv" : "movie" as media_type} />
            ))}
          </div>
        ) : (
          <LoadingFallback />
        )}
        <div>
          <Pagination currentPage={page} totalPages={movieResults?.total_pages || tvResults?.total_pages} onPageChange={handlePagination} />
        </div>
      </div>
    </div>
  )
};

export default function Page () {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GenrePage />
    </Suspense>
  )
}
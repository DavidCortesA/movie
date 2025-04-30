"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Popcorn } from "lucide-react";
import { Card } from "@/components/Common/Card";
import { media_type } from "@/components/Common/Card";
import { Pagination } from "@/components/Common/Pagination";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando próximas películas...</div>
  </div>
);

// Client component that uses useSearchParams
const SearchPage = () => {

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();
  const pageParam = searchParams.get("page");
  
  const [page, setPage] = useState(Number(pageParam) || 1);
  const [typeFilter, setTypeFilter] = useState("all");   // Tipo: movies, tv, person, all
  const [orderFilter, setOrderFilter] = useState("default"); // Ordenamiento: a-z, z-a, recent, oldest
  
  const { data, error, isLoading } = useSWR(
    query
      ? `https://api.themoviedb.org/3/search/multi?query=${query}&page=${page}&api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=es-MX`
      : null,
    fetcher
  );
  
  useEffect(() => {
    if (pageParam && Number(pageParam) !== page) {
      setPage(Number(pageParam));
    }
  }, [pageParam, page]);
  
  const handlePageChange = (newPage: number) => {
    router.push(`/search?q=${query}&page=${newPage}`);
    setPage(newPage);
  };
  
  if (!query) return <p className="p-8 text-center">Escribe algo para buscar.</p>;
  if (isLoading) return <p className="p-8 text-center">Buscando {query}...</p>;
  if (error) return <p className="p-8 text-center text-red-500">Ocurrió un error al buscar.</p>;
  
  // 🔥 Aplicamos filtros aquí:
  let filteredResults = data?.results || [];
  
  // 1️⃣ Filtrado por tipo (primero)
  if (typeFilter === "movies") {
    filteredResults = filteredResults.filter((item: SearchResult) => item.media_type === "movie");
  } else if (typeFilter === "tv") {
    filteredResults = filteredResults.filter((item: SearchResult) => item.media_type === "tv");
  } else if (typeFilter === "person") {
    filteredResults = filteredResults.filter((item: SearchResult) => item.media_type === "person");
  };
  
  // 2️⃣ Ordenamiento (después)
  if (orderFilter === "a-z") {
    filteredResults = [...filteredResults].sort((a, b) =>
      (a.title || a.name).localeCompare(b.title || b.name)
    );
  } else if (orderFilter === "z-a") {
    filteredResults = [...filteredResults].sort((a, b) =>
      (b.title || b.name).localeCompare(a.title || a.name)
    );
  } else if (orderFilter === "recent") {
    filteredResults = [...filteredResults].sort(
      (a, b) => new Date(b.release_date || b.first_air_date).getTime() - new Date(a.release_date || a.first_air_date).getTime()
    );
  } else if (orderFilter === "oldest") {
    filteredResults = [...filteredResults].sort(
      (a, b) => new Date(a.release_date || a.first_air_date).getTime() - new Date(b.release_date || b.first_air_date).getTime()
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="container h-full w-full">
        <h1 className="text-xl font-semibold mb-4 text-center text-white">
          Resultados para: <span className="text-yellow-400">{query}</span>
        </h1>
  
        {/* 🔥 Selects de filtro */}
        <div className="flex flex-wrap gap-4 justify-end mb-6">
          {/* Filtro por tipo */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option value="all">Todos</option>
            <option value="movies">Películas</option>
            <option value="tv">Series</option>
            <option value="person">Actores</option>
          </select>
  
          {/* Filtro por orden */}
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
          </select>
        </div>
  
        {filteredResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <span className="text-yellow-600 text-5xl font-bold rotate-45">
              <Popcorn width={100} height={100} />
            </span>
            <p className="p-8 text-amber-400 text-5xl">No se encontraron resultados.</p>
            <p className="p-8 text-amber-400 text-2xl">Intenta nuevamente, por favor.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredResults.map((item: SearchResult) => (
                <Card
                  key={item.id}
                  items={item}
                  isLoading={isLoading}
                  mediaType={item.media_type as media_type}
                />
              ))}
            </div>
  
            {/* Paginación */}
            <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
              <Pagination currentPage={page} totalPages={data?.total_pages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SearchPage />
    </Suspense>
  )
}

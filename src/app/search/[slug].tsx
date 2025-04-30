// app/search/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { MovieCard } from "@/components/MovieCard"; // usa el mismo componente
import { Movie } from "@/types/movie"; // asegúrate de tenerlo tipado

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data, error, isLoading } = useSWR(
    query
      ? `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=es-MX`
      : null,
    fetcher
  );

  if (!query) return <p className="p-8 text-center">Escribe algo para buscar.</p>;
  if (isLoading) return <p className="p-8 text-center">Buscando {query}...</p>;
  if (error) return <p className="p-8 text-center text-red-500">Ocurrió un error al buscar.</p>;

  const results = data?.results?.filter(
    (item: any) => item.poster_path && (item.media_type === "movie" || item.media_type === "tv")
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Resultados para: <span className="text-yellow-400">{query}</span>
      </h1>
      {results.length === 0 ? (
        <p>No se encontraron resultados.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item: Movie) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

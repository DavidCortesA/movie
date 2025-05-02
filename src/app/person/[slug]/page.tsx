'use client'

import { Suspense, useState } from "react";
import { useFetchGenresMovies } from "@/api/movie";
import { useFetchPersonById, useFetchPersonCombinedCredits } from "@/api/person";
import { Card, media_type } from "@/components/Common/Card";
import { getImageUrl } from "@/utils/generic";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando próximas películas...</div>
  </div>
);

const PersonPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [visibleCount, setVisibleCount] = useState(10);
  const [orderFilter, setOrderFilter] = useState("default");
  const [genreFilter, setGenreFilter] = useState("all");
  const [genre, setGenre] = useState<string>("");
  const { genresMovie, isLoadingGenres } = useFetchGenresMovies();
  
  const { data: person, isLoading: isLoadingPerson } = useFetchPersonById(slug as string);
  const { data: combinedCredits, isLoading: isLoadingCredits } = useFetchPersonCombinedCredits(slug as string);
  
  let filteredResults = combinedCredits?.crew || [];
  
  if (isLoadingPerson || !person) {
    return <div className="text-center text-gray-400 mt-10">Cargando información...</div>;
  }
  // 1️⃣ Filtro por tipo
  if (genreFilter !== "all") {
    filteredResults = filteredResults.filter((c: SearchResult) =>
      c.media_type === genreFilter
    );
  }
  
  // 2️⃣ Ordenamiento
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
  } else if (orderFilter === "popular") {
    filteredResults = [...filteredResults].sort(
      (a, b) => b.popularity - a.popularity
    );
  };
  
  // Filtrar por genero 
  if(genre) {
    filteredResults = filteredResults.filter((c: SearchResult) =>
      c.genre_ids?.includes(Number(genre))
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-3">
        <span onClick={() => router.back()} className="bg-yellow-500 hover:bg-yellow-600 text-white flex flex-row w-fit p-2 gap-2 items-center rounded-full cursor-pointer"><ChevronLeft /> Regresar</span>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagen del actor */}
        <div className="w-full md:w-1/3">
          <Image
            src={person.profile_path ? getImageUrl(person.profile_path) : "/images/empty.jpeg"}
            alt={person.name}
            width={400}
            height={600}
            className="rounded-lg object-cover w-full"
          />
        </div>
  
        {/* Datos del actor */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-yellow-400">{person.name}</h1>
  
          {person.birthday && (
            <p className="text-gray-300">
              <span className="font-semibold text-yellow-300">Fecha de nacimiento:</span> {person.birthday}
            </p>
          )}
          
          {person.place_of_birth && (
            <p className="text-gray-300">
              <span className="font-semibold text-yellow-300">Lugar de nacimiento:</span> {person.place_of_birth}
            </p>
          )}
  
          {person.biography ? (
            <p className="text-gray-300 whitespace-pre-line">{person.biography}</p>
          ) : (
            <p className="text-gray-500">No hay biografía disponible.</p>
          )}
        </div>
      </div>
  
      {/* Créditos combinados */}
      <div className="mt-12 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Filmografía</h2>
          <div className="flex gap-4 flex-wrap">
            <select
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white border border-gray-600"
            >
              <option value="all">Todos</option>
              <option value="movie">Películas</option>
              <option value="tv">Series</option>
            </select>
  
            
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
  
            {!isLoadingGenres && (
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="p-2 rounded bg-gray-800 text-white border border-gray-600"
              >
                <option value="">Todos los géneros</option>
                {genresMovie?.map((genre: Genre) => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>
  
        {isLoadingCredits ? (
          <p className="text-center text-gray-400">Cargando filmografía...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredResults?.slice(0, visibleCount).map((credit: SearchResult, index: number) => (
              <Card key={index} items={credit} isLoading={isLoadingCredits} mediaType={credit?.media_type as media_type} />
            ))}
          </div>
        )}
        {visibleCount < filteredResults?.length && (
          <div className="flex justify-center">
            <button
              className="bg-yellow-400 text-gray-800 font-semibold px-8 py-2 rounded-full mt-4 cursor-pointer hover:bg-yellow-500"
              onClick={() => setVisibleCount(visibleCount + 10)}
            >
              Mostrar más
            </button>
          </div>
        )}
  
        {filteredResults?.length === 0 && (
          <p className="text-center text-gray-400">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return(
    <Suspense fallback={<LoadingFallback />}>
      <PersonPage />
    </Suspense>
  )
}

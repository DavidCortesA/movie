'use client'

import { useFetchMovieById } from "@/api/movie";
import { MovieTabs } from "@/components/Movie/MovieTabs";
import { formatDate, getImageUrl } from "@/utils/generic";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando próximas películas...</div>
  </div>
);

const Movie = () => {
  const { slug } = useParams();
  const router = useRouter();
  const { movie, isErrorMovie, isLoadingMovie} = useFetchMovieById(slug as string);
  
  if (isErrorMovie) return null;
  if (isLoadingMovie) return null;
  
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 backdrop-blur-sm backdrop-brightness-50"></div>
        <div className="relative container mx-auto px-4 py-8">
          <div className="mb-3">
            <span onClick={() => router.back()} className="bg-yellow-500 hover:bg-yellow-600 text-white flex flex-row w-fit p-2 gap-2 items-center rounded-full cursor-pointer"><ChevronLeft /> Regresar</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
  
            {/* Imagen */}
            <div className="flex-shrink-0 w-full md:w-1/3">
              <Image
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                width={500}
                height={750}
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
  
            {/* Información */}
            <div className="flex flex-col w-full md:w-2/3">
              <h1 className="text-4xl font-bold text-yellow-500 mb-4">{movie.title}{' '}<span className="text-yellow-500/50 text-3xl">({new Date(movie.release_date).getFullYear()})</span></h1>
              <h3 className="text-md font-bold italic text-gray-400 mb-4">{movie.original_title}</h3>
              <div className="flex gap-2 flex-wrap my-2">
                {movie.genres.map((genre: Genre, index: number) => (
                  <Link href={`/genres/${genre.id}`} key={index} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm hover:text-black hover:bg-yellow-500">
                    {genre.name}
                  </Link>
                ))}
              </div>
              <p className="text-gray-300 mb-6">{movie.overview}</p>
  
              <div className="flex flex-wrap gap-4 mb-6 text-gray-400 flex-col">
                <span><strong>Duración:</strong> {movie.runtime} minutos</span>
                <span><strong>Idioma original:</strong> {movie.original_language}</span>
                <span><strong>País de origen:</strong> {movie.production_countries.map((country: ProductionCountry) => country.name).join(', ')}</span>
                <span><strong>Fecha de estreno:</strong> {movie.release_date ? formatDate(movie.release_date) : 'N/A'}</span>
                <span><strong>Popularidad:</strong> {movie.popularity.toFixed(1)}</span>
                <span><strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10</span>
                <span><strong>Votos:</strong> {movie.vote_count}</span>
                <span><strong>Status:</strong> {movie.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative container mx-auto px-4 py-8 w-full">
        <MovieTabs movieId={slug as string}/>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Movie />
    </Suspense>
  )
}

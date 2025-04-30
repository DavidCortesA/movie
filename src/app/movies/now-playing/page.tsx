'use client'
import { useFetchNowPlayingMovies } from "@/api/movie";
import { MovieGrid } from "@/components/Movie/MovieGrid";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando próximas películas...</div>
  </div>
);

const UpcomingMovies = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { nowPlayingMovie, isLoadingNowPlaying, totalPages } = useFetchNowPlayingMovies(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/movies/now-playing?page=${newPage}`);
  };

  return (
    <MovieGrid
      title="Películas En Cartelera"
      movie={nowPlayingMovie || []}
      isLoading={isLoadingNowPlaying}
      page={pageParam}
      handlePageChange={handlePageChange}
      totalPages={totalPages}
    />
  )
}

export default function Page() {
  return (
    <div>
      <Suspense fallback={<LoadingFallback />}>
        <UpcomingMovies />
      </Suspense>
    </div>
  )
}
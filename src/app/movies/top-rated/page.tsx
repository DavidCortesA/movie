'use client'
import { useFetchTopRatedMovies } from "@/api/movie";
import { MovieGrid } from "@/components/Movie/MovieGrid";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando próximas películas...</div>
  </div>
);

const TopRatedMovies = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { topRatedMovie, isLoadingTopRated, totalPages } = useFetchTopRatedMovies(pageParam);
  
  const handlePageChange = (newPage: number) => {
    router.push(`/movies/top-rated?page=${newPage}`);
  };
  
  return (
    <MovieGrid
      title="Películas Mejor Calificadas"
      movie={topRatedMovie || []}
      isLoading={isLoadingTopRated}
      page={pageParam}
      handlePageChange={handlePageChange}
      totalPages={totalPages}
    />
  )
}

export default function Page() {
  return(
    <div className="flex flex-col items-center justify-center w-full">
      <Suspense fallback={<LoadingFallback />}>
        <TopRatedMovies />
      </Suspense>
    </div>
  )
}
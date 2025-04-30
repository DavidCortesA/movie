'use client'
import { useFetchTrendingMovies } from "@/api/movie";
import { MovieGrid } from "@/components/Movie/MovieGrid";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando próximas películas...</div>
  </div>
);

const TrendingMovies = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { trendingMovie, isLoadingTrending, totalPages } = useFetchTrendingMovies(pageParam);
  
  const handlePageChange = (newPage: number) => {
    router.push(`/movies/trending?page=${newPage}`);
  };
  
  return (
    <MovieGrid
      title="Películas en Tendencia"
      movie={trendingMovie || []}
      isLoading={isLoadingTrending}
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
        <TrendingMovies />
      </Suspense>
    </div>
  )
}
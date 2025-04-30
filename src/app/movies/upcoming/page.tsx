'use client'
import { Suspense } from "react";
import { useFetchUpcomingMovies } from "@/api/movie";
import { MovieGrid } from "@/components/Movie/MovieGrid";
import { useRouter, useSearchParams } from "next/navigation";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando próximas películas...</div>
  </div>
);

// Client component that uses useSearchParams
const UpcomingMoviesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { upcomingMovie, isLoadingUpcoming, totalPages } = useFetchUpcomingMovies(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/movies/upcoming?page=${newPage}`);
  };

  return (
    <MovieGrid
      title="Proximas Peliculas"
      movie={upcomingMovie || []}
      isLoading={isLoadingUpcoming}
      page={pageParam}
      handlePageChange={handlePageChange}
      totalPages={totalPages}
    />
  );
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Suspense fallback={<LoadingFallback />}>
        <UpcomingMoviesContent />
      </Suspense>
    </div>
  )
}

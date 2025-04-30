'use client'
import { useFetchTrendingMovies } from "@/api/movie";
import { MovieGrid } from "@/components/Movie/MovieGrid";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { trendingMovie, isLoadingTrending, totalPages } = useFetchTrendingMovies(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/movies/trending?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <MovieGrid
        title="Películas en Tendencia"
        movie={trendingMovie || []}
        isLoading={isLoadingTrending}
        page={pageParam}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  )
}
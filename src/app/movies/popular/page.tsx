'use client'
import { useFetchPopularMovies } from "@/api/movie";
import { MovieGrid } from "@/components/Movie/MovieGrid";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { popularMovie, isLoadingPopular, totalPages } = useFetchPopularMovies(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/movies/popular?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <MovieGrid
        title="Películas Populares"
        movie={popularMovie || []}
        isLoading={isLoadingPopular}
        page={pageParam}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  )
}
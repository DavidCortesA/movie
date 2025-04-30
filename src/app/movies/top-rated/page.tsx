'use client'
import { useFetchTopRatedMovies } from "@/api/movie";
import { MovieGrid } from "@/components/Movie/MovieGrid";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { topRatedMovie, isLoadingTopRated, totalPages } = useFetchTopRatedMovies(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/movies/top-rated?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <MovieGrid
        title="Películas Mejor Calificadas"
        movie={topRatedMovie || []}
        isLoading={isLoadingTopRated}
        page={pageParam}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  )
}
'use client'
import { useFetchUpcomingMovies } from "@/api/movie";
import { MovieGrid } from "@/components/Movie/MovieGrid";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { upcomingMovie, isLoadingUpcoming, totalPages } = useFetchUpcomingMovies(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/movies/now-playing?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <MovieGrid
        title="Proximas Peliculas"
        movie={upcomingMovie || []}
        isLoading={isLoadingUpcoming}
        page={pageParam}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  )
}
'use client'
import { useFetchNowPlayingMovies } from "@/api/movie";
import { MovieGrid } from "@/components/Movie/MovieGrid";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { nowPlayingMovie, isLoadingNowPlaying, totalPages } = useFetchNowPlayingMovies(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/movies/now-playing?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <MovieGrid
        title="Películas En Cartelera"
        movie={nowPlayingMovie || []}
        isLoading={isLoadingNowPlaying}
        page={pageParam}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  )
}
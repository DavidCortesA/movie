'use client'
import { useFetchTopRatedSeries } from "@/api/serie";
import { SerieGrid } from "@/components/Serie/SerieGrid";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { topRatedTV, isLoadingTopRated, totalPages } = useFetchTopRatedSeries(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/series/top-rared?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <SerieGrid
        title="Series Mejor Calificadas"
        serie={topRatedTV || []}
        isLoading={isLoadingTopRated}
        page={pageParam}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  )
}
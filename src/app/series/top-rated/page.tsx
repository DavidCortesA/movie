'use client'
import { useFetchTopRatedSeries } from "@/api/serie";
import { SerieGrid } from "@/components/Serie/SerieGrid";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando próximas películas...</div>
  </div>
);

const TopRatedSeries = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { topRatedTV, isLoadingTopRated, totalPages } = useFetchTopRatedSeries(pageParam);
  
  const handlePageChange = (newPage: number) => {
    router.push(`/series/top-rared?page=${newPage}`);
  };
  
  return (
    <SerieGrid
      title="Series Mejor Calificadas"
      serie={topRatedTV || []}
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
        <TopRatedSeries />
      </Suspense>
    </div>
  )
}
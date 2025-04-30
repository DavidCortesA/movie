'use client'
import { useFetchTrendingSeries } from "@/api/serie";
import { SerieGrid } from "@/components/Serie/SerieGrid";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando próximas películas...</div>
  </div>
);

const TrendingSeries = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { trendingTV, isLoadingTrendingTV, totalPages } = useFetchTrendingSeries(pageParam);
  
  const handlePageChange = (newPage: number) => {
    router.push(`/series/trending?page=${newPage}`);
  };
  
  return (
    <SerieGrid
      title="Series en Tendencia"
      serie={trendingTV || []}
      isLoading={isLoadingTrendingTV}
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
        <TrendingSeries />
      </Suspense>
    </div>
  )
}
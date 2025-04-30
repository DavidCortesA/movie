'use client'
import { Suspense } from "react";
import { SerieGrid } from "@/components/Serie/SerieGrid";
import { useFetchPopularSeries } from "@/api/serie";
import { useRouter, useSearchParams } from "next/navigation";

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex flex-col items-center justify-center w-full p-8">
    <div className="text-lg text-gray-400">Cargando series populares...</div>
  </div>
);

// Client component that uses useSearchParams
const PopularSeriesContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { popularTV, isLoadingPopular, totalPages } = useFetchPopularSeries(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/series/popular?page=${newPage}`);
  };

  return (
    <SerieGrid
      title="Series en Populares"
      serie={popularTV || []}
      isLoading={isLoadingPopular}
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
        <PopularSeriesContent />
      </Suspense>
    </div>
  )
}

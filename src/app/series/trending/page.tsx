'use client'
import { useFetchTrendingSeries } from "@/api/serie";
import { SerieGrid } from "@/components/Serie/SerieGrid";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { trendingTV, isLoadingTrendingTV, totalPages } = useFetchTrendingSeries(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/series/trending?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <SerieGrid
        title="Series en Tendencia"
        serie={trendingTV || []}
        isLoading={isLoadingTrendingTV}
        page={pageParam}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  )
}
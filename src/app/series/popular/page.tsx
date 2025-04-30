'use client'
import { useFetchPopularSeries } from "@/api/serie";
import { SerieGrid } from "@/components/Serie/SerieGrid";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;
  const { popularTV, isLoadingPopular, totalPages } = useFetchPopularSeries(pageParam);

  const handlePageChange = (newPage: number) => {
    router.push(`/series/popular?page=${newPage}`);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <SerieGrid
        title="Series en Populares"
        serie={popularTV || []}
        isLoading={isLoadingPopular}
        page={pageParam}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  )
}
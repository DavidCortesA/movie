'use client'
import { SerieCarousel } from "./SerieCarousel";
import { useFetchTrendingSeries } from "@/api/serie";

export const SerieGrid = () => {
  const { TVSeries, isLoading } = useFetchTrendingSeries();

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full p-4">
        <SerieCarousel series={TVSeries} isLoading={isLoading} title="Trending Series" slug="/serie/trending" />
      </div>
    </div>
  )
}
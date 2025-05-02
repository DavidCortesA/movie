'use client'
import { useFetchTrendingMovies, useFetchPopularMovies, useFetchUpcomingMovies } from "@/api/movie";
import { useFetchTrendingSeries, useFetchTopRatedSeries, useFetchOnAirSeries } from "@/api/serie";
import { MovieCarousel } from "@/components/Movie/MovieCarousel";
import { SerieCarousel } from "@/components/Serie/SerieCarousel";


export default function Home() {
  const { trendingMovie, isLoadingTrending } = useFetchTrendingMovies(1);
  const { popularMovie, isLoadingPopular } = useFetchPopularMovies(1);
  const { upcomingMovie, isLoadingUpcoming } = useFetchUpcomingMovies(1);
  const { trendingTV, isLoadingTrendingTV } = useFetchTrendingSeries(1);
  const { topRatedTV, isLoadingTopRated } = useFetchTopRatedSeries(1);
  const { onAirTV, isLoadingOnAir } = useFetchOnAirSeries(1);
  
  return (
    <div className="w-full flex flex-col gap-3 items-center justify-center">
      <div className="container">
        <MovieCarousel title="Peliculas en Tendencia" slug="/movies/trending" movies={trendingMovie} isLoading={isLoadingTrending} />
        <MovieCarousel title="Peliculas Populares" slug="/movies/popular" movies={popularMovie} isLoading={isLoadingPopular} />
        <MovieCarousel title="Peliculas por venir" slug="/movies/upcoming" movies={upcomingMovie} isLoading={isLoadingUpcoming} />
        <hr className="text-yellow-300 my-10 w-full" />
        <SerieCarousel title="Series en Tendencia" slug="/series/trending" series={trendingTV} isLoading={isLoadingTrendingTV} />
        <SerieCarousel title="Series Populares" slug="/series/popular" series={topRatedTV} isLoading={isLoadingTopRated} />
        <SerieCarousel title="Series al Aire" slug="/series/on_air" series={onAirTV} isLoading={isLoadingOnAir} />
      </div>
    </div>
  );
}

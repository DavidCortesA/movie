'use client'
import { MovieCarousel } from "@/components/Movie/MovieCarousel";
import { useFetchTrendingMovies, useFetchPopularMovies, useFetchUpcomingMovies } from "@/api/movie";
import { SerieCarousel } from "@/components/Movie/MovieCarousel";


export default function Home() {
  const { trendingMovie, isLoadingTrending } = useFetchTrendingMovies();
  const { popularMovie, isLoadingPopular } = useFetchPopularMovies();
  const { upcomingMovie, isLoadingUpcoming } = useFetchUpcomingMovies();
  
  return (
    <div className="w-full flex flex-col gap-3">
      <MovieCarousel title="Peliculas en Tendencia" slug="/movie/trending" movies={trendingMovie} isLoading={isLoadingTrending} />
      <MovieCarousel title="Peliculas Populares" slug="/movie/popular" movies={popularMovie} isLoading={isLoadingPopular} />
      <MovieCarousel title="Peliculas por venir" slug="/movie/upcoming" movies={upcomingMovie} isLoading={isLoadingUpcoming} />
    </div>
  );
}

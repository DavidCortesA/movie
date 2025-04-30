import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetchTrendingMovies = (index:number) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/week?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&page=${index}&language=es-MX`,
    fetcher
  );

  return {
    trendingMovie: data?.results,
    isLoadingTrending: isLoading,
    isErrorTrending: error,
    totalPages: data?.total_pages,
    totalResults: data?.total_results,
    page: data?.page,
  };
};

export const useFetchPopularMovies = (index:number) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
    }&page=${index}&language=es-MX`,
    fetcher
  );

  return {
    popularMovie: data?.results,
    isLoadingPopular: isLoading,
    isErrorTrending: error,
    totalPages: data?.total_pages,
    totalResults: data?.total_results,
    page: data?.page,
  }
}

export const useFetchUpcomingMovies = (index:number) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/upcoming?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&page=${index}&language=es-MX`,
    fetcher
  );

  return {
    upcomingMovie: data?.results,
    isLoadingUpcoming: isLoading,
    isErrorUpcomong: error,
    totalPages: data?.total_pages,
    totalResults: data?.total_results,
    page: data?.page,
  }
};

export const useFetchNowPlayingMovies = (index:number) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/now_playing?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&page=${index}&language=es-MX`,
    fetcher
  );

  return {
    nowPlayingMovie: data?.results,
    isLoadingNowPlaying: isLoading,
    isErrorNowPlaying: error,
    totalPages: data?.total_pages,
    totalResults: data?.total_results,
    page: data?.page,
  }
};

export const useFetchTopRatedMovies = (index:number) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/top_rated?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&page=${index}&language=es-MX`,
    fetcher
  );

  return {
    topRatedMovie: data?.results,
    isLoadingTopRated: isLoading,
    isErrorTopRated: error,
    totalPages: data?.total_pages,
    totalResults: data?.total_results,
    page: data?.page,
  }
}

export const useFetchGenresMovies = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/genre/movie/list?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&language=es-MX`,
    fetcher
  );

  return {
    genresMovie: data?.genres,
    isLoadingGenres: isLoading,
    isErrorGenres: error,
  }
}
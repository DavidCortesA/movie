import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetchTrendingMovies = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/trending/movie/week?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }`,
    fetcher
  );

  return {
    trendingMovie: data?.results,
    isLoadingTrending: isLoading,
    isErrorTrending: error,
  };
};

export const useFetchPopularMovies = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/popular?api_key=${
    process.env.NEXT_PUBLIC_API_KEY
    }`,
    fetcher
  );

  return {
    popularMovie: data?.results,
    isLoadingPopular: isLoading,
    isErrorTrending: error,
  }
}

export const useFetchUpcomingMovies = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/movie/upcoming?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }`,
    fetcher
  );

  return {
    upcomingMovie: data?.results,
    isLoadingUpcoming: isLoading,
    isErrorUpcomong: error,
  }
}
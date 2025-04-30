import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetchTrendingSeries = (index:number) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${index}&language=es-MX`,
    fetcher
  );

  return {
    trendingTV: data?.results,
    isErroTrending: error,
    isLoadingTrendingTV: isLoading,
    totalPages: data?.total_pages,
    totalResults: data?.total_results,
    page: data?.page,
  };
};

export const useFetchTopRatedSeries = (index:number) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${index}&language=es-MX`,
    fetcher
  );
  return {
    topRatedTV: data?.results,
    isErroTopRated: error,
    isLoadingTopRated: isLoading,
    totalPages: data?.total_pages,
    totalResults: data?.total_results,
    page: data?.page,
  };
};

export const useFetchOnAirSeries = (index:number) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${index}&language=es-MX`,
    fetcher
  );

  return {
    onAirTV: data?.results,
    isErroOnAir: error,
    isLoadingOnAir: isLoading,
    totalPages: data?.total_pages,
    totalResults: data?.total_results,
    page: data?.page,
  };
};

export const useFetchPopularSeries = (index:number) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tv/popular?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&page=${index}&language=es-MX`,
    fetcher
  );

  return {
    popularTV: data?.results,
    isErroPopular: error,
    isLoadingPopular: isLoading,
    totalPages: data?.total_pages,
    totalResults: data?.total_results,
    page: data?.page,
  };
};

export const useFetchGenresSeries = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/genre/tv/list?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&language=es-MX`,
    fetcher
  );

  return {
    genresTV: data?.genres,
    isErroGenres: error,
    isLoadingGenres: isLoading,
  };
};
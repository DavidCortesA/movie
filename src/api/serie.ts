import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetchTrendingSeries = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  return {
    trendingTV: data?.results,
    isErroTrending: error,
    isLoadingTrendingTV: isLoading,
  };
};


export const useFetchTopRatedSeries = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );
  return {
    topRatedTV: data?.results,
    isErroTopRated: error,
    isLoadingTopRated: isLoading,
  };
};

export const useFetchOnAirSeries = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  return {
    onAirTV: data?.results,
    isErroOnAir: error,
    isLoadingOnAir: isLoading,
  };
};
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetchTrendingSeries = () => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/trending/tv/week?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    fetcher
  );

  return {
    TrendingTV: data?.results,
    error,
    isLoading,
  };
};
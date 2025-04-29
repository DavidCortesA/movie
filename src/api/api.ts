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
    movies: data?.results,
    isLoading,
    isError: error,
  };
};
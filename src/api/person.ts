import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useFetchPersonById = (id:string) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/person/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=es-MX`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export const useFetchPersonCombinedCredits = (id:string) => {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/person/${id}/combined_credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=es-MX`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
  };
};
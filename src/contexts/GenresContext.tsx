'use client';

import { createContext, useContext } from 'react';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type Genre = {
  id: number;
  name: string;
};

type GenresContextType = {
  genres: Genre[];
  isLoading: boolean;
  error: Error | null;
};

const GenresContext = createContext<GenresContextType>({
  genres: [],
  isLoading: true,
  error: null,
});

export const GenresProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: movieGenres, error: movieError } = useSWR(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=es-ES`,
    fetcher
  );
  const { data: tvGenres, error: tvError } = useSWR(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=es-ES`,
    fetcher
  );

  const combinedGenres: Genre[] = [
    ...(movieGenres?.genres || []),
    ...(tvGenres?.genres || []),
  ];

  // Para evitar duplicados (algunos géneros pueden repetirse)
  const uniqueGenres = Array.from(
    new Map(combinedGenres.map(genre => [genre.id, genre])).values()
  );

  return (
    <GenresContext.Provider
      value={{
        genres: uniqueGenres,
        isLoading: !movieGenres || !tvGenres,
        error: movieError || tvError,
      }}
    >
      {children}
    </GenresContext.Provider>
  );
};

// Hook personalizado para usar géneros fácilmente
export const useGenres = () => useContext(GenresContext);

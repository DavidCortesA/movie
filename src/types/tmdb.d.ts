interface Genre {
  id: number;
  name: string;
}

interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genres: Genre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface TVShow {
    adult: boolean;
    backdrop_path: string | null;
    first_air_date: string;
    genres: Genre[];
    id: number;
    name: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
}

interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for: (Movie | TVShow)[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string | null;
}

interface ApiResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
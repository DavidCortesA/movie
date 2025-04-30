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
  genre_ids: number[];
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
  genre_ids: number[];
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

interface SearchResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  media_type: "movie" | "tv" | "person";
  original_language: string;
  original_title: string;
  overview: string;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  name: string;
  first_air_date: string;
  origin_country: string[];
  profile_path?: string | null;
}

interface SearchResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Reviews {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface Recommended {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  original_name: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  character: string;
  credit_id: string;
  order: number;
}

interface Crew {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  profile_path: string | null;
  original_name: string;
  popularity: number;
}

interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

interface CombinedCredits {
  id: number;
  media_type: string;
  poster_path: string | null;
  backdrop_path: string | null;
  name?: string;
  title?: string;
  character?: string;
}
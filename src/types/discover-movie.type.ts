export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: "movie" | "tv";
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieCreditsResponse {
  id: number;
  cast: CastMember[];
}

export interface DiscoverMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

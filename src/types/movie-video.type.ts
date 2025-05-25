export interface MovieVideo {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: "YouTube" | "Vimeo" | string;
  size: number;
  type:
    | "Trailer"
    | "Teaser"
    | "Clip"
    | "Featurette"
    | "Behind the Scenes"
    | "Bloopers"
    | string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieVideoResponse {
  id: number;
  results: MovieVideo[];
}

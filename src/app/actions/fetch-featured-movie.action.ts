"use server";

import { axiosInstance } from "@/config";
import type {
  DiscoverMoviesResponse,
  Movie,
  MovieVideoResponse,
} from "@/types";

export async function fetchFeaturedMovie(): Promise<
  (Movie & { trailerKey?: string }) | null
> {
  try {
    const { data } = await axiosInstance.get<DiscoverMoviesResponse>(
      "/discover/movie",
      {
        params: {
          include_adult: false,
          include_video: false,
          language: "es-ES",
          page: 1,
          sort_by: "popularity.desc",
        },
      }
    );

    const movie = data.results[1];

    console.log(movie);

    // Buscar trailer
    const { data: videoData } = await axiosInstance.get<MovieVideoResponse>(
      `/movie/${movie.id}/videos`,
      {
        params: { language: "es-ES" },
      }
    );

    const trailer = videoData.results.find(
      (video: any) => video.site === "YouTube" && video.type === "Trailer"
    );

    return {
      ...movie,
      trailerKey: trailer?.key,
    };
  } catch (error: any) {
    console.error(
      "Error fetching discover movies or trailer:",
      error.response ?? error
    );
    throw new Error("Failed to fetch featured movie");
  }
}

"use server";

import { axiosInstance } from "@/config";
import type { DiscoverMoviesResponse, Movie } from "@/types";

export async function fetchDiscoverMovies(page = 1): Promise<Movie[] | null> {
  try {
    const { data } = await axiosInstance.get<DiscoverMoviesResponse>(
      "/discover/movie",
      {
        params: {
          include_adult: false,
          include_video: false,
          language: "es-ES",
          page,
          sort_by: "popularity.desc",
        },
      }
    );

    if (!data.results || data.results.length === 0) {
      return null;
    }

    return data.results;
  } catch (error: any) {
    console.error("Error fetching discover movies:", error.response ?? error);
    return null;
  }
}

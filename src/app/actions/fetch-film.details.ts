"use server";

import { axiosInstance } from "@/config";
import type { Movie, MovieVideoResponse, MovieCreditsResponse } from "@/types";

export async function fetchFilmDetails(
  id: number
): Promise<
  (Movie & { trailerKey?: string; cast?: MovieCreditsResponse["cast"] }) | null
> {
  try {
    const { data } = await axiosInstance.get<Movie>(`/movie/${id}`, {
      params: { language: "es-ES" },
    });

    // Trailer
    const { data: videoData } = await axiosInstance.get<MovieVideoResponse>(
      `/movie/${id}/videos`,
      { params: { language: "es-ES" } }
    );

    const trailer = videoData.results.find(
      (video: any) => video.site === "YouTube" && video.type === "Trailer"
    );

    // Reparto
    const { data: creditsData } = await axiosInstance.get<MovieCreditsResponse>(
      `/movie/${id}/credits`,
      { params: { language: "es-ES" } }
    );

    return {
      ...data,
      trailerKey: trailer?.key,
      cast: creditsData.cast.slice(0, 10),
    };
  } catch (error: any) {
    console.error("Error fetching movie details:", error.response ?? error);
    return null;
  }
}

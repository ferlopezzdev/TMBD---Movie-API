"use server";

import { axiosInstance } from "@/config";
import type { Movie, MovieVideoResponse, MovieCreditsResponse } from "@/types";

export async function fetchSerieDetails(
  id: number
): Promise<
  (Movie & { trailerKey?: string; cast?: MovieCreditsResponse["cast"] }) | null
> {
  try {
    const { data } = await axiosInstance.get<Movie>(`/tv/${id}`, {
      params: { language: "es-MX" },
    });

    // Trailer
    const { data: videoData } = await axiosInstance.get<MovieVideoResponse>(
      `/tv/${id}/videos`,
      { params: { language: "es-MX" } }
    );

    const trailer = videoData.results.find(
      (video: any) => video.site === "YouTube" && video.type === "Trailer"
    );

    // Reparto
    const { data: creditsData } = await axiosInstance.get<MovieCreditsResponse>(
      `/tv/${id}/credits`,
      { params: { language: "es-MX" } }
    );

    return {
      ...data,
      trailerKey: trailer?.key,
      cast: creditsData.cast.slice(0, 10),
    };
  } catch (error: any) {
    console.error("Error fetching serie details:", error.response ?? error);
    return null;
  }
}

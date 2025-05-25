"use server";

import { axiosInstance } from "@/config";
import type { DiscoverMoviesResponse, Movie } from "@/types";

const BLACKLIST_KEYWORDS = [
  "porno",
  "xxx",
  "sex",
  "orgy",
  "scream",
  "hardcore",
  "naked",
  "riley steele",
  "hustler",
  "brazzers",
];

function isSafeContent(title: string): boolean {
  const lower = title.toLowerCase();
  return !BLACKLIST_KEYWORDS.some((word) => lower.includes(word));
}

export async function fetchDiscoverSeries(page = 1): Promise<Movie[] | null> {
  try {
    const { data } = await axiosInstance.get<DiscoverMoviesResponse>(
      "/discover/tv",
      {
        params: {
          include_adult: false,
          language: "es-ES",
          page,
          sort_by: "popularity.desc",
        },
      }
    );

    if (!data.results || data.results.length === 0) return null;

    const safeSeries = data.results.filter(
      (s) =>
        !s.adult && isSafeContent(s.name || s.title || s.original_name || "")
    );

    return safeSeries.length > 0 ? safeSeries : null;
  } catch (error: any) {
    console.error("Error fetching discover series:", error.response ?? error);
    return null;
  }
}

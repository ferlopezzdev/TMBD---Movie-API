"use server";

import { axiosInstance } from "@/config";
import type { Movie } from "@/types";

type MultiSearchResult = Movie & {
  media_type: "movie" | "tv" | "person";
};

type SearchMultiResponse = {
  results: MultiSearchResult[];
};

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

export async function fetchSearched(
  query: string,
  page = 1
): Promise<MultiSearchResult[] | null> {
  try {
    const { data } = await axiosInstance.get<SearchMultiResponse>(
      "/search/multi",
      {
        params: {
          query,
          include_adult: false,
          language: "es-MX",
          page,
        },
      }
    );

    const filtered = data.results.filter((item) => {
      const title =
        item.title ??
        item.name ??
        item.original_title ??
        item.original_name ??
        "";

      return (
        (item.media_type === "movie" || item.media_type === "tv") &&
        !item.adult &&
        isSafeContent(title)
      );
    });

    return filtered.length > 0 ? filtered : null;
  } catch (error: any) {
    console.error("Error fetching multi search:", error.response ?? error);
    return null;
  }
}

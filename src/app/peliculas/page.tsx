import { fetchDiscoverMovies, fetchSearched } from "@/app/actions";
import { FilmListSection } from "@/sections/film-list-section";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function PeliculasPage({ searchParams }: Props) {
  const { page: pageRaw, search } = await searchParams;

  const page = Number(pageRaw ?? "1");
  const trimmedSearch = search?.trim();

  const movies = trimmedSearch
    ? await fetchSearched(trimmedSearch, page)
    : await fetchDiscoverMovies(page);

  if (!movies || movies.length === 0) {
    redirect("/peliculas");
  }

  return (
    <FilmListSection
      movies={movies}
      page={page}
      title={
        trimmedSearch
          ? `Resultados para: ${trimmedSearch}`
          : "Todas las películas"
      }
    />
  );
}

import { fetchDiscoverSeries } from "@/app/actions/fetch-discover-series";
import { redirect } from "next/navigation";
import { FilmListSection } from "@/sections/film-list-section";

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function SeriesPage({ searchParams }: Props) {
  const { page: pageRaw } = await searchParams;
  const page = Number(pageRaw ?? "1");

  const series = await fetchDiscoverSeries(page);

  if (!series || series.length === 0) {
    redirect("/series");
  }

  return (
    <FilmListSection movies={series} page={page} title="Todas las series" />
  );
}

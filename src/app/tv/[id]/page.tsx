import { notFound } from "next/navigation";
import { SerieDetailClient } from "./serie-details";
import { fetchSerieDetails } from "@/app/actions/fetch-serie.details";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FilmDetailPage({ params }: Props) {
  const { id } = await params;

  if (!id) return notFound();

  const movie = await fetchSerieDetails(Number(id));
  if (!movie) return notFound();

  return <SerieDetailClient movie={movie} />;
}

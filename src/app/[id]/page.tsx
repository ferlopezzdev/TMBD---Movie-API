import { fetchFilmDetails } from "@/app/actions";
import { notFound } from "next/navigation";
import { FilmDetailClient } from "./film-details";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FilmDetailPage({ params }: Props) {
  const { id } = await params;

  if (!id) return notFound();

  const movie = await fetchFilmDetails(Number(id));
  if (!movie) return notFound();

  return <FilmDetailClient movie={movie} />;
}

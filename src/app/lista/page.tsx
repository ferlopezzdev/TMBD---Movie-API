import { fetchSearched } from "@/app/actions";
import { FilmListSection } from "@/sections/film-list-section";

type Props = {
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

export default async function BuscarPeliculasPage({ searchParams }: Props) {
  const { search, page: rawPage } = await searchParams;

  const page = Number(rawPage ?? "1");
  const trimmedSearch = search?.trim();

  if (!trimmedSearch) return <NotResult />;

  const results = await fetchSearched(trimmedSearch, page);
  if (!results || results.length === 0) return <NotResult />;

  return (
    <FilmListSection
      movies={results}
      page={page}
      title={`Resultados para: ${trimmedSearch}`}
    />
  );
}

function NotResult() {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-white text-center px-4">
      <h2 className="text-4xl font-bold mb-4">Sin resultados.</h2>
      <p className="text-lg text-white/70">
        No se encontraron coincidencias para tu búsqueda.
      </p>
    </section>
  );
}

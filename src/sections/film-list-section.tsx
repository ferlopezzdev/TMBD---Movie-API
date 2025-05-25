import type { Movie } from "@/types/discover-movie.type";
import { MovieCard } from "@/components/movie-card";
import Link from "next/link";
import { Footer } from "@/components/common/footer";

type Props = {
  movies: Movie[];
  page: number;
  title: string;
  totalPages?: number;
};

export const FilmListSection = ({
  movies,
  page,
  title,
  totalPages = 10,
}: Props) => {
  const MAX_VISIBLE_PAGES = 5;

  const getPageNumbers = () => {
    const pages = [];

    const start = Math.max(1, page - Math.floor(MAX_VISIBLE_PAGES / 2));
    const end = Math.min(start + MAX_VISIBLE_PAGES - 1, totalPages);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <section className="w-full px-4 md:px-16 py-6">
        <h2 className="font-bold md:text-4xl text-2xl text-white mb-6">
          {title}
        </h2>

        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              view={false}
            />
          ))}
        </div>

        <div className="sticky bottom-0 bg-blue-950/80 backdrop-blur-md py-3 z-50 sm:static mt-8 rounded-full">
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 text-white text-sm sm:text-base">
            {page > 1 && (
              <>
                <Link
                  href={`?page=${page - 1}`}
                  className="px-3 sm:px-2 py-1.5 sm:py-2 border border-white/40 rounded hover:bg-white/10 transition"
                >
                  Atrás
                </Link>
              </>
            )}

            <span className="px-2 py-2 text-blue-400 border border-white/20 rounded select-none font-semibold">
              Página {page}
            </span>

            <Link
              href={`?page=${page + 1}`}
              className="px-3 sm:px-2 py-1.5 sm:py-2 border border-white/40 rounded hover:bg-white/10 transition"
            >
              Siguiente
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

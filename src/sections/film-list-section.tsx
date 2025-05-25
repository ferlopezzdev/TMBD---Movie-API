import type { Movie } from "@/types/discover-movie.type";
import { MovieCard } from "@/components/movie-card";
import Link from "next/link";

type Props = {
  movies: Movie[];
  page: number;
  title: string;
};

export const FilmListSection = ({ movies, page, title }: Props) => {
  return (
    <section className="w-full px-4 md:px-16 py-6">
      <h2 className="font-bold md:text-4xl text-2xl text-white mb-6">
        {title}
      </h2>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} index={index} view={false} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-8 text-white">
        {page > 1 && (
          <Link
            href={`?page=1`}
            className="px-4 py-2 border border-white/40 rounded hover:bg-white/10 transition"
          >
            Inicio
          </Link>
        )}
        {page > 1 && (
          <Link
            href={`?page=${page - 1}`}
            className="px-4 py-2 border border-white/40 rounded hover:bg-white/10 transition"
          >
            Atrás
          </Link>
        )}
        <span className="px-4 py-2 text-blue-400 border border-white/20 rounded select-none">
          Página {page}
        </span>
        <Link
          href={`?page=${page + 1}`}
          className="px-4 py-2 border border-white/40 rounded hover:bg-white/10 transition"
        >
          Siguiente
        </Link>
      </div>
    </section>
  );
};

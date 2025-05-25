"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Movie, CastMember } from "@/types";
import { ScrollArea } from "@/components/ui";

export function SerieDetailClient({
  movie,
}: {
  movie: Movie & {
    trailerKey?: string;
    media_type?: string;
    cast?: CastMember[];
  };
}) {
  const router = useRouter();

  const displayedTitle = movie.title ?? movie.name ?? "Sin título";
  const originalTitle = movie.original_title ?? movie.original_name;
  const releaseDate =
    movie.release_date ?? movie.first_air_date ?? "Fecha desconocida";

  return (
    <section className="relative w-full min-h-[100dvh] bg-black text-white overflow-hidden">
      {movie.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={displayedTitle}
          className="absolute top-0 left-0 w-full h-full object-cover object-center opacity-30"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white/70 text-xl">
          Sin imagen disponible
        </div>
      )}

      <div className="absolute inset-0 bg-black/10 z-10" />

      <div className="relative z-20 px-4 md:px-16 py-24 max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-2 absolute top-6 md:left-16 text-white bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-full text-sm border border-white/30"
        >
          <ArrowLeft size={16} />
          Volver
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Info */}
          <div className="flex-1 space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold">{displayedTitle}</h1>

            <div className="text-sm text-white/80 space-y-1">
              {originalTitle && (
                <p>
                  <span className="font-semibold text-white">
                    Título original:
                  </span>{" "}
                  {originalTitle}
                </p>
              )}
              <p>
                <span className="font-semibold text-white">
                  Fecha de estreno:
                </span>{" "}
                {releaseDate}
              </p>
              <p>
                <span className="font-semibold text-white">
                  Idioma original:
                </span>{" "}
                {movie.original_language.toUpperCase()}
              </p>
              <p>
                <span className="font-semibold text-white">Popularidad:</span>{" "}
                {movie.popularity.toFixed(1)}
              </p>
              <p>
                <span className="font-semibold text-white">Voto promedio:</span>{" "}
                {movie.vote_average.toFixed(1)} ({movie.vote_count} votos)
              </p>
            </div>

            <p className="text-sm md:text-base max-h-[15rem] overflow-y-auto pr-1">
              {movie.overview}
            </p>

            {movie.trailerKey && (
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src={`https://www.youtube.com/embed/${movie.trailerKey}`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            )}
          </div>

          {/* Reparto */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="w-full lg:w-[300px]">
              <h2 className="text-2xl font-bold mb-4">Reparto</h2>
              <ScrollArea className="flex flex-col w-full gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scroll">
                {movie.cast.map((actor) => (
                  <div
                    key={actor.id}
                    className="flex items-center md:gap-4 my-2"
                  >
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        className="w-12 h-16 rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-12 h-16 bg-gray-700 rounded-md flex items-center justify-center text-white/50 text-xs">
                        Sin foto
                      </div>
                    )}
                    <div>
                      <p className="font-semibold leading-tight text-sm">
                        {actor.name}
                      </p>
                      <p className="text-xs text-white/60">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

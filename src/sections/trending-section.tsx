import type { Movie } from "@/types/discover-movie.type";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui";
import { MovieCard } from "@/components/movie-card";

export const TrendingMoviesSection = ({ movies }: { movies: Movie[] }) => {
  return (
    <section className="flex flex-col md:px-16 px-2 text-white w-full space-y-4 relative">
      <h2 className="font-bold text-4xl">En tendencia</h2>

      <Carousel
        opts={{ align: "start", dragFree: true }}
        className="w-full select-none"
      >
        <CarouselContent>
          {movies.slice(0, 10).map((movie, index) => (
            <CarouselItem key={movie.id} className="basis-1/3 md:basis-1/5">
              <div className="p-1">
                <MovieCard movie={movie} index={index} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

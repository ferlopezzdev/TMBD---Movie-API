import { fetchFeaturedMovie, fetchDiscoverMovies } from "@/app/actions";
import { HeroSection, TrendingMoviesSection } from "@/sections";
import type { Movie } from "@/types/discover-movie.type";

export default async function HomePage() {
  const [featuredMovie, discoverMovies] = await Promise.all([
    fetchFeaturedMovie(),
    fetchDiscoverMovies(),
  ]);

  return (
    <>
      <HeroSection movie={featuredMovie as Movie} />
      <TrendingMoviesSection movies={discoverMovies ?? []} />
    </>
  );
}

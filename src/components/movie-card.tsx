"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui";
import { motion } from "framer-motion";
import type { Movie } from "@/types/discover-movie.type";

type Props = {
  movie: Movie & { media_type?: "movie" | "tv" };
  index: number;
  view?: boolean;
};

export const MovieCard = ({ movie, index, view = true }: Props) => {
  const mediaType = movie.media_type ?? "movie";

  const content = (
    <>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title || movie.name || "Sin título"}
        width={300}
        height={450}
        className="w-full h-auto object-cover hover:scale-105 duration-300"
      />
      <div className="absolute inset-0 rounded-lg transition duration-300 opacity-0 group-hover:opacity-100 pointer-events-none shadow-[inset_0_0_120px_#3b82f6]" />

      {view && (
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-sm md:text-2xl font-bold px-2 py-1 rounded-md backdrop-blur-sm">
          #{index + 1}
        </div>
      )}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.4,
        ease: "easeOut",
      }}
      className="relative"
    >
      <Card className="bg-transparent border-0">
        <CardContent
          className="p-0 overflow-hidden rounded-lg relative group"
          onMouseEnter={() => console.log(movie)}
        >
          <Link href={`/${mediaType}/${movie.id}`}>{content}</Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

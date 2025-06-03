"use client";

import { useEffect, useRef, useState } from "react";
import type { Movie } from "@/types/discover-movie.type";

import { Volume2, VolumeOff, Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const HeroSection = ({
  movie,
}: {
  movie: (Movie & { trailerKey?: string }) | null;
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!movie?.trailerKey) return;

    const loadYouTubeAPI = () => {
      if (
        typeof window.YT === "undefined" ||
        typeof window.YT.Player === "undefined"
      ) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = createPlayer;
      } else {
        createPlayer();
      }
    };

    const createPlayer = () => {
      if (playerRef.current && !player) {
        const ytPlayer = new window.YT.Player(playerRef.current, {
          videoId: movie.trailerKey,
          playerVars: {
            autoplay: 1,
            controls: 0,
            mute: 1,
            loop: 1,
            playlist: movie.trailerKey,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              event.target.mute();
              setPlayer(event.target);
            },
          },
        });
      }
    };

    loadYouTubeAPI();

    return () => {
      if (player) {
        player.destroy?.();
        setPlayer(null);
      }
    };
  }, [movie?.trailerKey]);

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  if (!movie) {
    return <p className="text-white p-4">No se encontró película</p>;
  }

  return (
    <>
      <section className="relative w-[100dvw] md:h-[70dvh] h-[50dvh] overflow-hidden">
        <div
          ref={playerRef}
          className="absolute md:top-0 -top-20 left-0 w-full h-full pointer-events-none object-cover"
        />

        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="absolute md:bottom-8 bottom-0 md:left-18 left-4 z-20 text-white max-w-[90%] md:max-w-[60%] space-y-4">
          <h1 className="text-3xl md:text-3xl font-bold leading-tight">
            {movie.title}
          </h1>
          <p className="text-sm md:text-base line-clamp-4">{movie.overview}</p>

          <Link
            href={`/movie/${movie.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-white/10 text-white rounded-full backdrop-blur-sm border border-white/30 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <Info className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">Más información</span>
            <span className="sm:hidden">Más información</span>
          </Link>
        </div>

        <Button
          variant="ghost"
          onClick={toggleMute}
          className="cursor-pointer absolute md:bottom-12 bottom-0 md:right-24 right-6 z-30 w-12 h-12 md:w-14 md:h-14 border-2 border-white rounded-full flex items-center justify-center hover:bg-white/20 transition"
        >
          {isMuted ? (
            <VolumeOff className="text-white w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <Volume2 className="text-white w-5 h-5 md:w-6 md:h-6" />
          )}
        </Button>
      </section>
      <div className="w-full h-20 bg-gradient-to-b from-black to-transparent backdrop-blur-md"></div>
    </>
  );
};

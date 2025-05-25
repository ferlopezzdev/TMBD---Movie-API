"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { SearchBar } from "../search-bar";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/series", label: "Series" },
  { href: "/peliculas", label: "Películas" },
];

export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-blue-950 via-blue-950/70 to-transparent backdrop-blur-md">
      <div className="max-w-[100dvw] mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        <div className="flex items-center space-x-6 md:space-x-8">
          <Link
            href="/"
            className="text-blue-600 font-bold text-2xl hover:opacity-80"
          >
            TMDB
          </Link>

          <nav className="flex items-center md:space-x-6 space-x-2 text-white text-sm">
            {LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base transition-all ${
                    isActive
                      ? "text-blue-200 font-bold"
                      : "text-white font-medium hover:opacity-70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-3 md:space-x-4 text-white text-sm">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

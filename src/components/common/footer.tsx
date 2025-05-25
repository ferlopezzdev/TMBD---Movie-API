"use client";

import React from "react";

export const Footer = () => {
  return (
    <footer className="z-50 w-full bg-gradient-to-t from-blue-950 to-transparent pointer-events-none select-none">
      <div className="max-w-[100dvw] mx-auto px-6 md:px-12 py-3 flex justify-center items-center pointer-events-auto">
        <p className="text-white text-sm font-medium">
          Trabajo final PROGRAMACION 2 - @UniversidadColumbia{" "}
          <span className="text-blue-500">{new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
};

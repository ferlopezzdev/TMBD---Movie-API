import { Instagram, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="z-50 bg-black/80 text-white px-6 md:px-16 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/70">
        <div className="text-center md:text-left space-y-2">
          <p className="font-semibold text-white text-base">
            Trabajo realizado para la{" "}
            <a
              className="text-green-400 hover:underline"
              href="https://www.columbia.edu.py/"
              target="_blank"
              rel="noopener noreferrer"
            >
              @UniversidadColumbia
            </a>
          </p>
          <p>Explora lo mejor del cine y la televisión.</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} TMDB.</p>

          <div className="space-y-1 mt-2">
            <p>- Fernando Lopez</p>
            <p>- Sebastian Laratro</p>
            <p>- Sabrina Alvarez</p>
            <p>- Lucas Candia</p>
            <p>- Tobias Jara</p>
            <div className="flex gap-4 justify-center md:justify-start mt-1">
              <a
                href="https://www.instagram.com/ferlopeztr?igsh=aHdsajF3anI5ZmZ0"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition"
              >
                <div className="p-2 rounded-full bg-transparent   group-hover:bg-white transition-colors">
                  <Instagram className="w-5 h-5 text-white group-hover:text-blue-950 transition-colors" />
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/fernando-lopez-b80182290/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition"
              >
                <div className="p-2 rounded-full bg-transparent   group-hover:bg-white transition-colors">
                  <Linkedin className="w-5 h-5 text-white group-hover:text-blue-950 transition-colors" />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end space-y-2">
          <a
            href="https://developer.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Datos proporcionados por TMDB
          </a>
        </div>
      </div>
    </footer>
  );
};

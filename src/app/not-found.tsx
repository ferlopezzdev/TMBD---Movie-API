import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
      <p className="text-2xl md:text-3xl mb-6">Sin resultados</p>
      <p className="text-white/70 mb-8 max-w-xl">
        No se pudo encontrar los detalles de la pelicula/serie. Tal vez fue
        movida, eliminada o nunca existió.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 text-sm md:text-base bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

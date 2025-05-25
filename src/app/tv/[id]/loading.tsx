export default function FilmDetailLoading() {
  return (
    <section className="px-4 md:px-16 py-24 flex flex-col items-center justify-center text-white">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-xl text-white/80">Espera un momento</p>
    </section>
  );
}

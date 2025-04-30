import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6 mt-10 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
        {/* Créditos */}
        <div className="text-center md:text-left">
          <p>
            Desarrollado por{" "}
            <span className="text-yellow-400 font-semibold">David Cortez</span> — {new Date().getFullYear()}
          </p>
          <p className="text-xs mt-1 text-gray-400">
            Esta app usa la API de TMDb pero no está afiliada oficialmente.
          </p>
        </div>

        {/* Enlaces */}
        <div className="flex gap-4">
          <Link
            href="https://www.themoviedb.org/"
            target="_blank"
            className="hover:text-yellow-400 transition"
          >
            TMDb
          </Link>
          <Link
            href="https://github.com/DavidCortesA"
            target="_blank"
            className="hover:text-yellow-400 transition"
          >
            GitHub
          </Link>
          <Link
            href="https://developer.themoviedb.org/docs/getting-started"
            className="hover:text-yellow-400 transition"
          >
            Sobre esta app
          </Link>
        </div>
      </div>
    </footer>
  );
};

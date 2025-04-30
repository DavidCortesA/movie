"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "./SearchInput";
import Link from "next/link";

export const Navbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState<"movies" | "series" | null>(null);

  const navItems = {
    movies: [
      { name: "Populares", href: "/movies/popular" },
      { name: "En Cartelera", href: "/movies/now-playing" },
      { name: "Próximamente", href: "/movies/upcoming" },
      { name: "Mejor Calificadas", href: "/movies/top-rated" },
    ],
    series: [
      { name: "Populares", href: "/series/popular" },
      { name: "Al Aire", href: "/series/on-air" },
      { name: "Mejor Calificadas", href: "/series/top-rated" },
    ],
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-8 py-4 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide text-yellow-400">
          🎬 PopcornBox
        </Link>

        {/* Menú central */}
        <div className="flex gap-6 relative">
          <Link href="/" className="hover:text-yellow-400 transition">Inicio</Link>

          <div
            onMouseEnter={() => setHoveredMenu("movies")}
            onMouseLeave={() => setHoveredMenu(null)}
            className="relative"
          >
            <span className="hover:text-yellow-400 cursor-pointer">Películas</span>
            <AnimatePresence>
              {hoveredMenu === "movies" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bg-white text-black shadow-lg top-8 left-0 w-48 rounded-lg overflow-hidden"
                >
                  {navItems.movies.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            onMouseEnter={() => setHoveredMenu("series")}
            onMouseLeave={() => setHoveredMenu(null)}
            className="relative"
          >
            <span className="hover:text-yellow-400 cursor-pointer">Series</span>
            <AnimatePresence>
              {hoveredMenu === "series" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bg-white text-black shadow-lg top-8 left-0 w-48 rounded-lg overflow-hidden"
                >
                  {navItems.series.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Buscador */}
        <div className="relative">
          <SearchInput />
        </div>
      </div>
    </nav>
  );
};

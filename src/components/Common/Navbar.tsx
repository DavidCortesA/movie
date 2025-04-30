"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "./SearchInput";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Navbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState<"movies" | "series" | null>(null);
  const path = usePathname();

  const navItems = {
    movies: [
      { name: "Populares", href: "/movies/popular" },
      { name: "Tendencias", href: "/movies/trending" },
      { name: "En Cartelera", href: "/movies/now-playing" },
      { name: "Próximamente", href: "/movies/upcoming" },
      { name: "Mejor Calificadas", href: "/movies/top-rated" },
    ],
    series: [
      { name: "Populares", href: "/series/popular" },
      { name: "Tendencias", href: "/series/trending" },
      { name: "Al Aire", href: "/series/on-air" },
      { name: "Mejor Calificadas", href: "/series/top-rated" },
    ],
  };

  return (
    <nav className="w-full bg-gray-900 text-white px-8 py-4 shadow-md relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide text-yellow-400">
          <Image
            src="/images/popcorn.png"
            width={50}
            height={50}
            alt="Popcorn Logo"
            className="inline-block"
          />
          PopcornBox
        </Link>

        {/* Menú central */}
        <div className="flex gap-6 relative">
          <Link href="/" className={`${!path.includes("/movies") && !path.includes("/series") ? "text-yellow-400" : "hover:text-yellow-400 transition"} cursor-pointer`}>Inicio</Link>

          <div
            onMouseEnter={() => setHoveredMenu("movies")}
            onMouseLeave={() => setHoveredMenu(null)}
            className="relative"
          >
            <span className={`${path.includes("/movies") ? "text-yellow-400" : "hover:text-yellow-400 transition"} cursor-pointer`}>Películas</span>
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
            <span className={`${path.includes("/series") ? "text-yellow-400" : "hover:text-yellow-400 transition"} cursor-pointer`}>Series</span>
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

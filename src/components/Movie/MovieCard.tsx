import Image from "next/image";
import { getImageUrl, limitText } from "@/utils/generic";
import { motion } from "framer-motion";
import { useState } from "react";

export const MovieCard = ({ movie, isLoading }: { movie: Movie, isLoading: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full cursor-pointer relative rounded-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={!isLoading ? getImageUrl(movie.poster_path) : '/loading.gif'}
        alt={movie.title}
        className="rounded w-full object-cover"
        width={200}
        height={300}
      />

      {/* Porcentaje de calificación */}
      <div className="absolute top-5 px-3 py-1 bg-yellow-400 text-black text-sm rounded-e-full font-bold shadow-sm">
        {(movie.vote_average * 10).toFixed(0)}%
      </div>

      {/* Overlay al hacer hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-bold text-white bg-black/70 backdrop-blur-sm p-4"
        >
          <div className="text-center w-full">
            <h1 className="text-xl md:text-2xl">{movie.title}</h1>
            <p className="text-sm font-medium mt-2 text-justify">
              {limitText(movie.overview, 125)}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

import Image from "next/image";
import { getImageUrl, limitText } from "@/utils/generic";
import { motion } from "framer-motion";
import { useState } from "react";

export const SerieCard = ({ serie, isLoading }: { serie: TVShow, isLoading: boolean }) => {
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
        src={!isLoading ? getImageUrl(serie.poster_path) : '/loading.gif'}
        alt={serie.name}
        className="rounded w-full object-cover"
        width={200}
        height={300}
      />
      
      {/* Porcentaje calificación */}
      <div className="absolute top-5 px-3 py-1 bg-yellow-400 text-black text-sm rounded-e-full font-bold shadow-sm">
        {(serie.vote_average * 10).toFixed(0)}%
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
            <h1 className="text-xl md:text-2xl">{serie.name}</h1>
            <p className="text-sm font-medium mt-2 text-justify">
              {limitText(serie.overview, 125)}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

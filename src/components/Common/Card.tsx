"use client";

import Image from "next/image";
import { getImageUrl, limitText } from "@/utils/generic";
import { motion } from "framer-motion";
import { useState } from "react";
import { User } from "lucide-react"; // Icono de usuario (actor)

export type media_type = 'movie' | 'tv' | 'person';

export const Card = ({ items, isLoading, mediaType }: { items: SearchResult, isLoading: boolean, mediaType: media_type }) => {
  const [isHovered, setIsHovered] = useState(false);

  const imagePath = items.poster_path || items.profile_path;
  const title = items.title || items.name;

  return (
    <motion.a
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full cursor-pointer relative rounded-md overflow-hidden
        ${mediaType === "person" ? "bg-gray-800" : "bg-transparent"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={`/${mediaType === "tv" ? "series" : mediaType === "movie" ? "movies" : "person" }/${items.id}`}
    >
      {/* Imagen */}
      <Image
        src={!isLoading && imagePath ? getImageUrl(imagePath) : '/images/empty.jpeg'}
        alt={title}
        className="rounded w-full object-cover"
        width={200}
        height={300}
      />

      {/* Badge de Score o Actor */}
      <div className={`absolute top-5 left-2 px-3 py-1 rounded-full font-bold shadow-sm 
        text-sm flex items-center gap-1
        ${mediaType === "person" ? "bg-blue-400 text-black" : "bg-yellow-400 text-black"}`}>
        
        {mediaType === "person" ? (
          <>
            <User size={16} />
            Actor
          </>
        ) : (
          <>
            {(items.vote_average * 10).toFixed(0)}%
          </>
        )}
      </div>

      {/* Overlay en Hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center font-bold text-white bg-black/70 backdrop-blur-sm p-4"
        >
          <div className="text-center w-full">
            <h1 className="text-xl md:text-2xl">{title}</h1>

            {mediaType !== "person" && (
              <p className="text-sm font-medium mt-2 text-justify">
                {limitText(items.overview, 125)}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </motion.a>
  );
};
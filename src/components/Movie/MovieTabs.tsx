'use client'

import { useState } from "react";
import { useFetchMovieReviewsByMovieId, useFetchMovieRecommendationsByMovieId, useFetchMovieCreditsByMovieId, useFetchMovieVideosByMovieId } from "@/api/movie";
import { formatDate, getImageUrl, limitText } from "@/utils/generic";
import Image from "next/image";
import Link from "next/link";
import { MovieCard } from "./MovieCard";

interface MovieTabsProps {
  movieId: string;
}

export const MovieTabs = ({ movieId }: MovieTabsProps) => {
  const [activeTab, setActiveTab] = useState<"reviews" | "recommendations" | "credits" | "crew" | "videos">("reviews");
  const [showMore, setShowMore] = useState<boolean>(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  }

  const { reviews, isLoadingReviews } = useFetchMovieReviewsByMovieId(movieId);
  const { recommended, isLoadingRecommended } = useFetchMovieRecommendationsByMovieId(movieId);
  const { credits, crew, isLoadingCredits } = useFetchMovieCreditsByMovieId(movieId);
  const { videos, isLoadingVideos } = useFetchMovieVideosByMovieId(movieId);

  return (
    <div className="mt-8">
      {/* Tabs */}
      <ul className="flex flex-wrap text-sm font-medium text-center border-b border-gray-700 dark:text-gray-400 justify-between mb-5">
        <li className="w-1/5">
          <button
            className={`inline-block md:p-4 py-4 rounded-t-lg w-full cursor-pointer hover:bg-gray-700 ${activeTab === "reviews" ? "bg-gray-800 text-yellow-500" : "text-gray-500 hover:text-yellow-500"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reseñas
          </button>
        </li>
        <li className="w-1/5">
          <button
            className={`inline-block md:p-4 py-4 rounded-t-lg w-full cursor-pointer text-wrap hover:bg-gray-700 ${activeTab === "recommendations" ? "bg-gray-800 text-yellow-500" : "text-gray-500 hover:text-yellow-500"}`}
            onClick={() => setActiveTab("recommendations")}
          >
            Recomendaciones
          </button>
        </li>
        <li className="w-1/5">
          <button
            className={`inline-block md:p-4 py-4 rounded-t-lg w-full cursor-pointer hover:bg-gray-700 ${activeTab === "credits" ? "bg-gray-800 text-yellow-500" : "text-gray-500 hover:text-yellow-500"}`}
            onClick={() => setActiveTab("credits")}
          >
            Actores
          </button>
        </li>
        <li className="w-1/5">
          <button
            className={`inline-block md:p-4 py-4 rounded-t-lg w-full cursor-pointer hover:bg-gray-700 ${activeTab === "crew" ? "bg-gray-800 text-yellow-500" : "text-gray-500 hover:text-yellow-500"}`}
            onClick={() => setActiveTab("crew")}
          >
            Equipo
          </button>
        </li>
        <li className="w-1/5">
          <button
            className={`inline-block md:p-4 py-4 rounded-t-lg w-full cursor-pointer hover:bg-gray-700 ${activeTab === "videos" ? "bg-gray-800 text-yellow-500" : "text-gray-500 hover:text-yellow-500"}`}
            onClick={() => setActiveTab("videos")}
          >
            Videos
          </button>
        </li>
      </ul>

      {/* Content */}
      <div className="w-full">
        {activeTab === "reviews" && (
          <div className="space-y-6">
            {isLoadingReviews ? (
              <p className="text-center text-gray-400">Cargando reseñas...</p>
            ) : (
              <>
                {reviews?.length > 0 ? (
                  reviews.map((review: Reviews, index: number) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-yellow-400">{review.author}</h3>
                      <p className="text-gray-300 mt-2">{formatDate(review.created_at)}</p>
                      {showMore ? (
                        <p className="text-gray-300 mt-2">{review.content}</p>
                      ) : (
                        <p className="text-gray-300 mt-2">{limitText(review.content, 200)}</p>
                      )}
                      <button
                        onClick={toggleShowMore}
                        className="text-yellow-400"
                      >
                        {showMore ? "Ver menos" : "Ver más"}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No hay reseñas disponibles.</p>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "recommendations" && (
          <div className={`${recommended?.length === 0 ? 'w-full text-center' : 'grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 mb-4'}`}>
            {isLoadingRecommended ? (
              <p className="text-center text-gray-400">Cargando recomendaciones...</p>
            ) : (
              <>
                {recommended?.length > 0 ? (
                  recommended.map((movie: Movie) => (
                    <MovieCard movie={movie} isLoading={isLoadingRecommended} key={movie.id}/>
                  ))
                ) : (
                  <p className="text-center text-gray-400">No hay recomendaciones disponibles.</p>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === "credits" && (
          <div className="w-full">
            <div className={`${credits?.lenght === 0 ? "w-full text-center" : "grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 mb-4"}`}>
              {isLoadingCredits ? (
                <p className="text-center text-gray-400">Cargando equipo...</p>
              ) : (
                <>
                  {credits?.lenght !== 0 ? (
                    credits?.map((cast: Cast) => (
                      <Link href={`/person/${cast.id}`} key={cast.id} className="bg-gray-800 rounded-lg hover:scale-105 transition-transform duration-300">
                        <div className="flex gap-4 flex-row">
                          <div className="w-2/6">
                            <Image
                              src={cast.profile_path ? getImageUrl(cast.profile_path) : '/images/empty.jpeg'}
                              alt={cast.name}
                              width={200}
                              height={300}
                              className="object-fill rounded-lg w-full h-full"
                            />
                          </div>
                          <div className="w-4/6 p-4 flex flex-col gap-2">
                            <h3 className="text-lg font-semibold text-yellow-400">{cast.name}</h3>
                            <p className="text-gray-300 mt-2">{cast.character}</p>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No hay créditos disponibles.</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "crew" && (
          <div className="w-full">
            <div className={`${crew?.lenght === 0 ? "w-full text-center" : "grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4"}`}>
              {isLoadingCredits ? (
                <p className="text-center text-gray-400">Cargando equipo...</p>
              ) : (
                <>
                  {crew?.lenght !== 0 ? (
                    crew?.map((c: Crew, index: number) => (
                      <div key={index} className="bg-gray-800 rounded-lg hover:scale-105 transition-transform duration-300">
                        <div className="flex gap-4 flex-row">
                          <div className="w-2/6">
                            <Image
                              src={c.profile_path ? getImageUrl(c.profile_path) : '/images/empty.jpeg'}
                              alt={c.name}
                              width={200}
                              height={300}
                              className="object-fill rounded-lg w-full h-full"
                            />
                          </div>
                          <div className="w-4/6 p-4 flex flex-col gap-2">
                            <h3 className="text-lg font-semibold text-yellow-400">{c.name}</h3>
                            <p className="text-gray-300 mt-2">{c.department}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No hay equipo disponibles.</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "videos" && (
          <div className="w-full">
            <div className={`${videos?.lenght === 0 ? "w-full text-center" : "grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4"}`}>
              {isLoadingVideos ? (
                <p className="text-center text-gray-400">Cargando videos...</p>
              ) : (
                <>
                  {videos?.lenght !== 0 ? (
                    videos?.map((video: Video, index: number) => (
                      <Link href={`https://www.youtube.com/watch?v=${video.key}`} target="_blank" key={index} className="bg-gray-800 rounded-lg hover:scale-105 transition-transform duration-300 relative cursor-pointer">
                        <Image
                          src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                          alt={video.name}
                          width={300}
                          height={150}
                          className="object-fill rounded-lg w-full h-full"
                        />
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white">
                          {video.name}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">No hay videos disponibles.</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

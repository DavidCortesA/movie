import Image from "next/image";
import { formatDate, getImageUrl } from "@/utils/generic";

export const MovieCard = ({ movie, isLoading }: { movie: Movie, isLoading: boolean }) => {
  return (
    <div className="flex flex-col items-center rounded-lg shadow-md hover:scale-105 transition transform cursor-pointer w-full">
      <Image
        src={`${!isLoading ? getImageUrl(movie.poster_path) : '/loading.gif'}`}
        alt={movie.title}
        className="rounded"
        width={200}
        height={300}
      />
      <h2 className="mt-2 text-center font-semibold text-lg text-gray-800 dark:text-gray-100 truncate w-full">
        {movie.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{formatDate(movie.release_date)}</p>
    </div>
  );
};

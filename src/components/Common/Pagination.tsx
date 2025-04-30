"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const rangeSize = 10;
  const currentRangeStart = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
  const currentRangeEnd = Math.min(currentRangeStart + rangeSize - 1, totalPages);

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      {/* Botón Anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800 text-white rounded cursor-pointer hover:bg-yellow-400 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={20} />
      </button>

      {/* Botones de números */}
      {Array.from({ length: currentRangeEnd - currentRangeStart + 1 }, (_, index) => {
        const pageNumber = currentRangeStart + index;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-4 py-2 rounded ${
              currentPage === pageNumber
                ? "bg-yellow-400 text-black font-bold"
                : "bg-gray-800 text-white hover:bg-yellow-400 hover:text-black cursor-pointer"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Botón Siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-yellow-400 cursor-pointer hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

// src/components/elements/mutasi/Pagination.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center space-x-0">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="text-[#549EFF] disabled:opacity-50"
      >
        <ChevronLeft />
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`w-8 h-8 flex items-center justify-center ${
            currentPage === index + 1
              ? "bg-[#549EFF] text-white"
              : "text-[#549EFF]"
          } rounded`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="text-[#549EFF] disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;

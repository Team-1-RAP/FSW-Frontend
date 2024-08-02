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
    <div
      className="flex items-center space-x-0"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="text-[#549EFF] disabled:opacity-50"
        aria-label="Halaman sebelumnya"
        aria-disabled={currentPage === 1}
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
          aria-label={`Halaman ${index + 1}`}
          aria-current={currentPage === index + 1 ? "page" : undefined}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="text-[#549EFF] disabled:opacity-50"
        aria-label="Halaman berikutnya"
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;

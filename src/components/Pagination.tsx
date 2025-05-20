import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-4 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100"
          }
        `}
      >
        Previous
      </button>

      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
          ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100"
          }
        `}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

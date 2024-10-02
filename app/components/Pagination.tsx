import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePrevClick = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="flex justify-center py-6">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-red-200"
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => handlePageClick(i + 1)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === i + 1
              ? "bg-red-300 text-white"
              : "bg-gray-200 hover:bg-red-200"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-gray-200 rounded hover:bg-red-200"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

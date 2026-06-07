interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          px-4 py-2
          bg-cyan-600
          text-white
          rounded-lg
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Previous
      </button>

      <span className="text-white font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          px-4 py-2
          bg-cyan-600
          text-white
          rounded-lg
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
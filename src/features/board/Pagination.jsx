import { useState } from "react";
export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const [groupIndex, setGroupIndex] = useState(
    Math.floor((currentPage - 1) / 5)
  );

  const handlePageClick = (page) => {
    onPageChange(page);
  };
  const handlePrevGroup = () => {
    if (groupIndex > 0) {
      const newGroup = groupIndex - 1;
      setGroupIndex(newGroup);
      onPageChange(newGroup * 5 + 1);
    }
  };

  const handleNextGroup = () => {
    const maxGroup = Math.floor((totalPages - 1) / 5);
    if (groupIndex < maxGroup) {
      const newGroup = groupIndex + 1;
      setGroupIndex(newGroup);
      onPageChange(newGroup * 5 + 1);
    }
  };

  const start = groupIndex * 5 + 1;
  const end = Math.min(start + 4, totalPages);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  return (
    <div className="join justify-center mt-2">
      <button
        className="join-item btn"
        onClick={handlePrevGroup}
        disabled={groupIndex === 0}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`join-item btn ${
            currentPage === page ? "btn-active" : ""
          }`}
        >
          {page}
        </button>
      ))}

      <button
        className="join-item btn"
        onClick={handleNextGroup}
        disabled={end === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}

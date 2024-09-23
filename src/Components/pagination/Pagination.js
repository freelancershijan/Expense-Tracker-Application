import React, { useState } from 'react';

export default function Pagination({ page = 0, pages = 0, total = 0, limit = 12, setPage, setLimit }) {
  const [visibleRange, setVisibleRange] = useState([1, Math.min(5, pages)]); // Initial range

  // Handle changing the page
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  // Handle previous button
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Handle next button
  const handleNext = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const first = (page - 1) * limit + 1 || 0;
  const last = Math.min(page * limit, total) || 0;

  // Function to show the next 4 pages
  const handleNext4Pages = () => {
    const start = visibleRange[1] + 1;
    const end = Math.min(start + 3, pages);
    setVisibleRange([start, end]);
  };

  // Generate array of page numbers
  const pageNumbers = [...Array(pages).keys()].map((n) => n + 1);

  return (
    <>
      <div className="grid justify-center sm:flex sm:justify-between sm:items-center gap-1">
        {/* Pagination */}
        <nav className="flex items-center -space-x-px" aria-label="Pagination">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrevious}
            disabled={page === 1}
            className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            aria-label="Previous"
          >
            <svg
              className="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6"></path>
            </svg>
            <span className="sr-only">Previous</span>
          </button>

          {/* Page Numbers */}
          {pageNumbers.slice(0, 3).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => handlePageChange(number)}
              className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm border border-gray-200 first:rounded-s-lg last:rounded-e-lg focus:outline-none ${ page === number
                ? 'bg-primary text-white dark:bg-neutral-500 dark:text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-100 dark:bg-neutral-600 dark:text-white'
                }`}
              aria-current={page === number ? 'page' : undefined}
            >
              {number}
            </button>
          ))}

          {/* Next 4 Pages Button (if applicable) */}
          {pages > 3 && (
            <div className="hs-tooltip inline-block border border-gray-200 dark:border-neutral-700">
              <button
                type="button"
                onClick={handleNext4Pages}
                className="hs-tooltip-toggle group min-h-[36px] min-w-[36px] flex justify-center items-center text-gray-400 hover:text-blue-600 p-2 text-sm focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:bg-white/10"
              >
                <span className="group-hover:hidden text-xs">•••</span>
                <svg
                  className="group-hover:block hidden shrink-0 size-5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 17 5-5-5-5"></path>
                  <path d="m13 17 5-5-5-5"></path>
                </svg>
                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700" role="tooltip">
                  Next 4 pages
                </span>
              </button>
            </div>
          )}

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            disabled={page === pages}
            className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm first:rounded-s-lg last:rounded-e-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            aria-label="Next"
          >
            <svg
              className="shrink-0 size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
            <span className="sr-only">Next</span>
          </button>

        </nav>

        <p>Showing {first} to {last} of {total} products</p>

        <div className="relative text-center">
          <select
            onClick={(e) => setLimit(e.target.value)}
            className=' border px-3 py-2'
            data-hs-select='{
    "placeholder": "Select option...",
    "toggleTag": "<button type=\"button\"></button>",
    "toggleClasses": "",
    "dropdownClasses": "",
    "optionClasses": "hs-selected:"
  }'>
            <option selected value="12">12</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    </>
  );
}

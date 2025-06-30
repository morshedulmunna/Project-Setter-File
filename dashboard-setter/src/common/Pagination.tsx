"use client";

import { useEffect, useState } from "react";

interface PaginationProps {
  numberOfData: number;
  limits: number;
  activePage: number;
  className?: string;
  getCurrentPage?: (page: number) => void;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rows: number) => void;
  rowsPerPageOptions?: number[];
  [key: string]: unknown;
}

const Pagination: React.FC<PaginationProps> = ({
  numberOfData,
  limits,
  className,
  getCurrentPage,
  onPageChange,
  activePage = 1,
  onRowsPerPageChange,
  rowsPerPageOptions = [10, 25, 50, 100],
  ...props
}) => {
  const [numberOfPage, setNumberOfPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(activePage);
  const [rowsPerPage, setRowsPerPage] = useState<number>(limits);

  useEffect(() => {
    if (numberOfData < rowsPerPage) {
      setNumberOfPage(1);
    } else {
      setNumberOfPage(Math.ceil(numberOfData / rowsPerPage));
    }
  }, [numberOfData, rowsPerPage]);

  useEffect(() => {
    setRowsPerPage(limits);
  }, [limits]);

  const setLimitHandler = (index: number) => {
    setCurrentPage(index + 1);
    if (getCurrentPage) {
      getCurrentPage(index + 1);
    }
    if (onPageChange) {
      onPageChange(index + 1);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRows = parseInt(e.target.value, 10);
    setRowsPerPage(newRows);
    setCurrentPage(1);
    if (onRowsPerPageChange) {
      onRowsPerPageChange(newRows);
    }
    if (getCurrentPage) {
      getCurrentPage(1);
    }
    if (onPageChange) {
      onPageChange(1);
    }
  };

  const getDisplayedPages = () => {
    const maxButtonsToShow = 5;
    let pages: number[] = [];

    if (numberOfPage <= maxButtonsToShow) {
      for (let i = 1; i <= numberOfPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 5) {
        pages = [1, 2, 3, 4, 5];
      } else if (currentPage > numberOfPage - 4) {
        pages = [
          numberOfPage - 4,
          numberOfPage - 3,
          numberOfPage - 2,
          numberOfPage - 1,
          numberOfPage,
        ];
      } else {
        pages = [
          currentPage - 2,
          currentPage - 1,
          currentPage,
          currentPage + 1,
          currentPage + 2,
        ];
      }
    }

    return pages;
  };

  const startIdx = numberOfData === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const endIdx = Math.min(currentPage * rowsPerPage, numberOfData);

  return (
    <div
      {...props}
      className={`flex flex-col w-full  lg:flex-row lg:justify-between lg:items-center ${className}`}
    >
      <div className="flex items-center space-x-2 mb-2 lg:mb-0">
        <span className="text-xs lg:text-sm font-medium">Rows per page:</span>
        {/* <select
          className="border dark:border-gray-800 rounded-md px-2 py-1 text-xs lg:text-sm focus:outline-none"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select> */}
        <span className="text-xs lg:text-sm font-medium ml-2">
          {startIdx}-{endIdx} of {numberOfData}
        </span>
      </div>
      <div className="flex flex-wrap gap-y-1 items-center space-x-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setLimitHandler(currentPage - 2)}
          className={`border dark:border-gray-800 hover:border hover:border-gray-300 transition-all ease-in-out bg-transparent px-3 gap-2 py-1.5 flex justify-center items-center rounded-md ${
            currentPage === 1 && "opacity-50"
          } `}
        >
          <p className="font-medium text-xs lg:text-sm">Prev</p>
        </button>

        {currentPage > 5 && numberOfPage > 5 && (
          <button
            onClick={() => setLimitHandler(0)}
            className={`border dark:border-gray-800 h-8 w-8 flex flex-wrap justify-center items-center rounded-md text-xs lg:text-sm font-medium ${
              currentPage === 1 ? "bg-blue-500 text-black" : "bg-transparent"
            }`}
          >
            1
          </button>
        )}
        {currentPage > 5 && numberOfPage > 5 && (
          <span className="border dark:border-gray-800 h-8 w-8 flex flex-wrap justify-center items-center rounded-md text-xs lg:text-sm font-medium bg-transparent">
            ...
          </span>
        )}

        {getDisplayedPages().map((each) => (
          <button
            key={each}
            onClick={() => setLimitHandler(each - 1)}
            className={`border dark:border-gray-800 h-8 w-8 flex flex-wrap justify-center items-center rounded-md text-xs lg:text-sm font-medium ${
              currentPage === each
                ? "bg-blue-500 border-none text-white"
                : "bg-transparent"
            }`}
          >
            {each}
          </button>
        ))}

        {currentPage <= numberOfPage - 5 && numberOfPage > 5 && (
          <span className="border dark:border-gray-800 h-8 w-8 flex flex-wrap justify-center items-center rounded-md text-xs lg:text-sm font-medium bg-transparent">
            ...
          </span>
        )}
        {currentPage <= numberOfPage - 5 && numberOfPage > 5 && (
          <button
            onClick={() => setLimitHandler(numberOfPage - 1)}
            className={`border dark:border-gray-800 h-8 w-8 flex flex-wrap justify-center items-center rounded-md text-xs lg:text-sm font-medium ${
              currentPage === numberOfPage
                ? "bg-primary text-white"
                : "bg-transparent"
            }`}
          >
            {numberOfPage}
          </button>
        )}

        <button
          disabled={numberOfPage <= 1 || numberOfPage === currentPage}
          onClick={() => setLimitHandler(currentPage)}
          className={`border dark:border-gray-800 hover:border hover:border-gray-300 transition-all ease-in-out bg-transparent px-4 py-1.5 gap-2 flex justify-center items-center rounded-md text-xs lg:text-sm ${
            (numberOfPage <= 1 || numberOfPage === currentPage) && "opacity-50"
          }`}
        >
          <p className="font-medium text-xs lg:text-sm">Next</p>
        </button>
      </div>
    </div>
  );
};

export default Pagination;

import { useMemo } from 'react';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const DOTS = '...';

const usePagination = (
  currentPage: number,
  totalPokemon: number,
  pageSize: number,
  neighbours: number,
) => {
  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(totalPokemon / pageSize);

    const pageNums = neighbours + 5;

    if (pageNums >= totalPages) {
      return range(1, totalPages);
    }
    const left = Math.max(currentPage - neighbours, 1);
    const right = Math.min(currentPage + neighbours, totalPages);

    const leftDots = left > 2;
    const rightDots = right < totalPages - 2;

    if (!leftDots && rightDots) {
      const leftPages = 3 + 2 * neighbours;
      const leftRange = range(1, leftPages);

      return [...leftRange, DOTS, totalPages];
    } else if (leftDots && !rightDots) {
      const rightPages = 3 + 2 * neighbours;
      const rightRange = range(totalPages - rightPages + 1, totalPages);
      return [1, DOTS, ...rightRange];
    } else {
        const middleRange = range(left, right);
        return [1, DOTS, ...middleRange, DOTS, totalPages];
    }
  }, [currentPage, totalPokemon, pageSize, neighbours]);
  return paginationRange;
};

export default usePagination;

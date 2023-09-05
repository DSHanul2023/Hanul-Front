import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const MinichatPagination = ({ totalPages, currentPage, onPageChange }) => {
  const visiblePageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // 현재 페이지를 중심으로 앞 뒤로 5개의 페이지만 보이도록 계산
  const maxVisiblePages = 5;
  const middlePage = Math.ceil(maxVisiblePages / 2);
  let startPage = Math.max(currentPage - middlePage, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <Pagination className="minichat-pagination" aria-label="Page navigation example">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous href="#" onClick={() => handlePageChange(currentPage - 1)} />
      </PaginationItem>
      {visiblePageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
        <PaginationItem key={pageNumber} active={pageNumber === currentPage}>
          <PaginationLink href="#" onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next href="#" onClick={() => handlePageChange(currentPage + 1)} />
      </PaginationItem>
    </Pagination>
  );
};

export default MinichatPagination;

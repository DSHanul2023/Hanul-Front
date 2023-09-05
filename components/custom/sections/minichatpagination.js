import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const MinichatPagination = ({ totalPages, currentPage, onPageChange }) => {
  const visiblePageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

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
      {visiblePageNumbers.map((pageNumber) => (
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

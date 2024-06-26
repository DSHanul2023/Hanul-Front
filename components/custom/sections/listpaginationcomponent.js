import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const ListPagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  // 현재 페이지를 중심으로 앞 뒤로 5개의 페이지만 보여주도록 설정
  const visiblePageNumbers = pageNumbers.filter(
    (pageNumber) => pageNumber >= currentPage - 5 && pageNumber <= currentPage + 5
  );

  const handlePageChange = (page) => {
    // 페이지 번호가 최소값과 최대값을 벗어나지 않도록 검사
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    onPageChange(nextPage);
  };

  return (
    <Pagination className="listpagination" aria-label="Page navigation example">
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

export default ListPagination;

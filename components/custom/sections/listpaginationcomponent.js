import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// ContentList 컴포넌트에서 전달받은 데이터에 따라 동적으로 페이지네이션을 생성
const ListPagination = ({ totalPages }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination className="listpagination" aria-label="Page navigation example">
      <PaginationItem>
        <PaginationLink previous href="#" />
      </PaginationItem>
      {pageNumbers.map((pageNumber) => (
        <PaginationItem key={pageNumber}>
          <PaginationLink href="#">{pageNumber}</PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationLink next href="#" />
      </PaginationItem>
    </Pagination>
  );
};

export default ListPagination;

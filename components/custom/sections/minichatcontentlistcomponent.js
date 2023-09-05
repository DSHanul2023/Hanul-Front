import React, { useState } from 'react';
import { Container, Row } from 'reactstrap';
import MinichatItemComponent from './minichatitemcomponent';
import MinichatPagination from './minichatpagination';

const MinichatContentList = ({ recommendedMovies }) => {
  const itemsPerPage = 10; // 한 페이지에 표시할 아이템 수
  const totalPages = Math.ceil(recommendedMovies.length / itemsPerPage);

  // 현재 페이지와 페이지 변경 함수를 상태로 관리
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 해당하는 아이템들을 추출
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = recommendedMovies.slice(startIndex, endIndex);

  return (
    <Container style={{ position: 'relative' }}>
      {currentItems.map((movie, index) => (
        <MinichatItemComponent key={index} movie={movie} />
      ))}
      {/* currentPage와 onPageChange를 MinichatPagination 컴포넌트에 전달 */}
      <MinichatPagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </Container>
  );
};

export default MinichatContentList;

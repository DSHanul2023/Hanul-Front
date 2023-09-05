import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import MinichatPagination from './minichatpagination';
import MinichatItemComponent from './minichatitemcomponent';

const MinichatContentList = ({ recommendedMovies }) => {
  const itemsPerPage = 5; // 한 페이지에 표시할 아이템 수
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const totalPages = Math.ceil(recommendedMovies.length / itemsPerPage);

  // 페이지 변경 시 해당 페이지의 아이템을 추출
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = recommendedMovies.slice(startIndex, endIndex);
    setCurrentItems(itemsToDisplay);
  }, [recommendedMovies, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container style={{ position: 'relative' }}>
      <Row>
        {currentItems.map((movie, index) => (
          <MinichatItemComponent key={index} movie={movie} />
        ))}
      </Row>
      <div className="listpagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '30px' }}>
        <MinichatPagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </Container>
  );
};

export default MinichatContentList;

import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import ItemComponent from './itemcomponent';
import ListPagination from './ListPaginationComponent';

const ContentList = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page) => {
    try {
      const response = await fetch(`http://localhost:8080/items/all?page=${page}&size=${itemsPerPage}`);
        if (!response.ok) {
            throw new Error('데이터를 가져오는 중 오류 발생');
        }
        const data = await response.json();
        const totalItems = Number(response.headers.get('Total-Count'));
        const totalPages = Math.ceil(totalItems / itemsPerPage); // Math.ceil을 사용하여 올림 (10개 이하인 경우도 고려)
        setTotalPages(totalPages);
        setMovies(data);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
      // 오류 처리: 오류 메시지 / 대체 콘텐츠 보여줌
    }
};


  return (
    <Container style={{ position: 'relative' }}>
      <ItemComponent movies={movies} />
      <div className="listpagination" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)'}}>
        <ListPagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </Container>
  );
};

export default ContentList;

import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import ItemComponent from './itemcomponent';
import ListPagination from './listpaginationcomponent';
import MovieDetailComponent from './movieDetailcomponent';

const ContentList = () => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = async (page) => {
    try {
      const response = await fetch(`http://43.201.180.174:8080/items/all?page=${page}&size=${itemsPerPage}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는 중 오류 발생');
      }
      const data = await response.json();
      const totalPages = data.totalPages;
      setTotalPages(totalPages);
      setMovies(data.content);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
      // 오류 처리: 오류 메시지 / 대체 콘텐츠 보여줌
    }
  };

  const handleMovieClick = (movie) => {
    router.push(`/moviedetail/${movie.id}`);
  };

  return (
    <Container style={{ position: 'relative' }}>
      <ItemComponent movies={movies} onMovieClick={handleMovieClick} />
      <div className="listpagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
        <ListPagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      </div>
    </Container>
  );
};

export default ContentList;

import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import ItemComponent from './itemcomponent';
import ListPagination from './ListPaginationComponent';

const ContentList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:8080/items/all');
      const data = await response.json();

      // 프론트엔드에서 사용하는 데이터 구조에 posterUrl 속성을 추가
      const moviesWithPosterUrl = data.map(movie => ({
        ...movie,
        posterUrl: movie.posterUrl ? `https://image.tmdb.org/t/p/w500${movie.posterUrl}` : '', // 영화 포스터 이미지 URL
      }));

      setMovies(moviesWithPosterUrl);
    } catch (error) {
      console.error('영화 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  return (
    <Container style={{ position: 'relative' }}>
      <ItemComponent movies={movies} />
      <div className="listpagination" style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)'}}>
        <ListPagination />
      </div>
    </Container>
  );
};

export default ContentList;

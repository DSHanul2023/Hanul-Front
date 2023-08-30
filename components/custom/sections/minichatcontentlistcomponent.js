import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import MinichatItemComponent from './minichatitemcomponent';
import { useRouter } from 'next/router';
import { useHistory } from 'react-router-dom'; // useHistory 추가

const MinichatContentList = () => {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const itemsPerPage = 10;
  const router = useRouter();
  const history = useHistory(); // useHistory 초기화

  useEffect(() => {
    fetchRecommendedMovies(currentPage);
  }, [currentPage]);

  const fetchRecommendedMovies = async (page) => {
    try {
      const response = await fetch(`http://localhost:8080/survey/recommended?page=${page}&size=${itemsPerPage}`);
      if (!response.ok) {
        throw new Error('데이터를 가져오는 중 오류 발생');
      }
      const data = await response.json();
      const totalPages = data.totalPages;
      setTotalPages(totalPages);
      setRecommendedMovies(data.content);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
      // 오류 처리: 오류 메시지 / 대체 콘텐츠 보여줌
    }
  };

  const handleMovieClick = (movieId) => {
    history.push(`/items/${movieId}`); // 해당 영화 페이지로 이동
  };

  return (
    <Container style={{ position: 'relative' }}>
      {/* MinichatItemComponent 컴포넌트에 추천된 영화 목록과 클릭 핸들러 전달 */}
      <MinichatItemComponent recommendedMovies={recommendedMovies} onMovieClick={handleMovieClick} />
    </Container>
  );
};

export default MinichatContentList;

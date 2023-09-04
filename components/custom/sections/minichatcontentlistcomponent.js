import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import MinichatItemComponent from './minichatitemcomponent';

const MinichatContentList = ({ recommendedMovies }) => {
  return (
    <Container style={{ position: 'relative' }}>
      {/* 서버 응답으로 받은 추천된 영화 데이터 출력 */}
      {recommendedMovies && recommendedMovies.map((movie, index) => (
        <div key={index}>
          <h2>{movie.itemNm}</h2>
          <p>장르: {movie.genreName}</p>
          {/* 원하는 데이터 필드를 추가로 출력할 수 있습니다 */}
        </div>
      ))}
    </Container>
  );
};

export default MinichatContentList;

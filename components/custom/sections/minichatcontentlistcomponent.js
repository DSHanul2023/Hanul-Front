import React from 'react';
import { Container } from 'reactstrap';
import Image from 'next/image'; // next/image를 import

const MinichatContentList = ({ recommendedMovies }) => {
  return (
    <Container style={{ position: 'relative' }}>
      {recommendedMovies && recommendedMovies.map((movie, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>{movie.itemNm}</h2>
          <p>장르: {movie.genreName}</p>
          <p>상세 정보: {movie.itemDetail}</p>
          {/* next/image를 사용하여 이미지를 렌더링 */}
          <Image
            src={movie.posterUrl}
            alt={movie.itemNm}
            width={300}
            height={400} // 이미지의 원하는 크기로 설정
          />
        </div>
      ))}
    </Container>
  );
};

export default MinichatContentList;

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import Link from 'next/link';

const MinichatContentList = ({ recommendedMovies }) => {
  // 5개씩 영화 데이터를 묶어 배열 생성
  const chunkedMovies = [];
  for (let i = 0; i < recommendedMovies.length; i += 5) {
    chunkedMovies.push(recommendedMovies.slice(i, i + 5));
  }

  return (
    <Container style={{ position: 'relative' }}>
      {chunkedMovies.map((moviesRow, rowIndex) => (
        <Row key={rowIndex}>
          {moviesRow.map((movie, colIndex) => (
            <Col key={colIndex} xs={12} md={2} className="item">
              <Link href={`/items/${movie.movieId}`} passHref>
                <div style={{ cursor: 'pointer' }}>
                  <div className="itemimg" style={{ width: '100%', height: '80%' }}>
                    <Image
                      src={movie.posterUrl}
                      alt={movie.itemNm}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <Container className="itemsummary">
                    <p className="itemtitle" style={{ marginTop: '70px', fontSize: '13px' }}>
                      {movie.itemNm}
                    </p>
                  </Container>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default MinichatContentList;

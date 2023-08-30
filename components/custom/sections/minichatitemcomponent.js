import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import Link from 'next/link';

const MinichatItemComponent = ({ recommendedMovies }) => {
    const chunkedMovies = [];
    const itemsPerRow = 5;
    
    // minichat의 경우, 추천받은 영화가 10개 미만인 경우도 고려
    // recommendedMovies를 itemsPerRow로 나누어 chunkedMovies 배열에 추가
    for (let i = 0; i < recommendedMovies.length; i += itemsPerRow) {
      chunkedMovies.push(recommendedMovies.slice(i, i + itemsPerRow));
    }
  
    return (
      <Container className="contentlist">
        <Container className="movielist">
          {chunkedMovies.map((row, rowIndex) => (
            <Row key={rowIndex} style={{ marginTop: '40px' }}>
              {row.map((movie, colIndex) => (
                <Col
                  key={colIndex}
                  className="item"
                  style={{ height: '300px', width: '200px', cursor: 'pointer' }}
                >
                  <Link href={`/items/${movie.movieId}`} passHref>
                    <div>
                      <div
                        className="itemimg"
                        style={{ width: '100%', height: '80%' }}
                      >
                        <Image
                          src={movie.posterUrl}
                          alt={movie.itemNm}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <Container className="itemsummary">
                        <p
                          className="itemtitle"
                          style={{ marginTop: '70px', fontSize: '13px' }}
                        >
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
      </Container>
    );
  };
  
  export default MinichatItemComponent;
  
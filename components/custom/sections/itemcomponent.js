import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';

const ItemComponent = ({ movies }) => {
  const router = useRouter();

const handleMovieClick = (movie) => {
  router.push(`/items/${movie.id}`);
};
  
  const chunkedMovies = [];
  const itemsPerRow = 5;
  for (let i = 0; i < movies.length; i += itemsPerRow) {
    chunkedMovies.push(movies.slice(i, i + itemsPerRow));
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
                onClick={() => handleMovieClick(movie)}> {/* 'onMovieClick' 대신 'handleMovieClick' 사용 */}
                <div className="itemimg" style={{ width: "100%", height: "80%" }}>
                  <Image
                    src={movie.posterUrl}
                    alt={movie.itemNm}
                    layout="fill"
                    objectFit="cover"/>
                </div>
                <Container className="itemsummary">
                  <p className="itemtitle" style={{ marginTop: "70px", fontSize: "13px" }}>{movie.itemNm}</p>
                </Container>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </Container>
  );
};

export default ItemComponent;

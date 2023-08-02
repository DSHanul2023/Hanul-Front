import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';

const ItemComponent = ({ movies }) => {
  // 2차원 배열로 변환 (페이지마다 10개의 영화 데이터를 가지고 있다고 가정)
  const chunkedMovies = [];
  const itemsPerRow = 5;
  for (let i = 0; i < movies.length; i += itemsPerRow) {
    chunkedMovies.push(movies.slice(i, i + itemsPerRow));
  }

  return (
    <Container className="contentlist">
      <Container className="movielist">
        {chunkedMovies.map((row, rowIndex) => (
          <Row key={rowIndex} style={{ marginTop: "40px" }}>
            {row.map((movie, colIndex) => (
              <Col key={colIndex} className="item" style={{ height: "300px", width: "200px" }}>
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
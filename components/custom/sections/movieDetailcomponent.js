import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';

const MovieDetailComponent = ({ movie }) => {
  return (
    <Container className="moviedetail">
      <Row>
        <Col xs={12} md={6} className="poster">
          <Image
            src={movie.posterUrl}
            alt={movie.itemNm}
            layout="responsive"
            width={300}
            height={450}
          />
        </Col>
        <Col xs={12} md={6} className="info">
          <h2>{movie.itemNm}</h2>
          <p>{movie.itemDetail}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailComponent;

import React from 'react';
import { Col, Container } from 'reactstrap';
import Image from 'next/image';
import Link from 'next/link';

const MinichatItemComponent = ({ movie }) => { // movie 프로퍼티 추가
  return (
    <Col xs={12} md={2} className="item">
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
  );
};

export default MinichatItemComponent;

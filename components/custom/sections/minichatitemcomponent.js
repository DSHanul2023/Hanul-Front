import React from 'react';
import { Col, Container } from 'reactstrap';
import Image from 'next/image';
import Link from 'next/link';

const MinichatItemComponent = ({ movie }) => {
  return (
    <Col xs={12} md={2} className="item" style={{ height: '300px', width: '200px', cursor: 'pointer' }}>
      <Link href={`/items/${movie.movieId}`} passHref>
        <div style={{ cursor: 'pointer' }}>
          <div className="itemimg" style={{ width: '100%', height: '80%' }}>
            <Image src={movie.posterUrl} alt={movie.itemNm} layout="fill" objectFit="cover" />
          </div>
          <Container>
            <p className="itemtitle" style={{ marginTop: '315px', fontSize: '13px',  color: '#B95C37', textAlign: 'center' }}>
              {movie.itemNm}
            </p>
          </Container>
        </div>
      </Link>
    </Col>
  );
};

export default MinichatItemComponent;

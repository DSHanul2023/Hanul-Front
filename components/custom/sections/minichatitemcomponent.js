import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import Link from 'next/link';

const MinichatItemComponent = ({ recommendedMovies }) => {
  return (
    <Container className="contentlist">
      {recommendedMovies.map((movie, index) => (
        <div key={index}>
          <Row style={{ marginTop: '40px' }}>
            <Col
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
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default MinichatItemComponent;

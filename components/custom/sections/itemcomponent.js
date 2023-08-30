import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import Link from 'next/link';

const ItemComponent = ({ movies }) => {
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
                style={{ height: '300px', width: '200px', cursor: 'pointer' }}>
                <Link href={`/items/${movie.id}`} passHref>
                  <a>
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
                  </a>
                </Link>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </Container>
  );
};

export default ItemComponent;

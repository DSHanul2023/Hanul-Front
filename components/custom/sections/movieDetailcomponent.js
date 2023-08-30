import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MovieDetailComponent = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movieId) {
      fetch(`/items/${movieId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setMovie(data);
        })
        .catch(error => {
          console.error('Error while fetching data:', error);
        });
    }
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

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

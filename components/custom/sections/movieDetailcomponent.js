import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MovieDetailComponent = () => {
  const router = useRouter();
  const { state } = router.query;
  const [movie, setMovie] = useState(state?.movie || null);

  useEffect(() => {
    if (!movie && state) {
      setMovie(state.movie); // Set the movie from the state
    }
  }, [state, movie]);

  if (!state || !state.movie) {
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

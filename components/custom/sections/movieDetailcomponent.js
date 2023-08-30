import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MovieDetailComponent = ({ movieId }) => {
  const router = useRouter();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) {
      return; // movieId가 없으면 아무 작업도 수행하지 않음
    }

    // 여기서 실제로 API 요청 등을 통해 영화 데이터를 가져와서 setMovie로 설정해야 합니다.
    // 아래는 예시로서 fetch를 사용해서 데이터를 가져온다고 가정합니다.
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

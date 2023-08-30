import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MovieDetailComponent = ({ movieId }) => {
  const router = useRouter();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (!movieId) {
      return;
    }
  
    console.log('영화 데이터를 가져오는 중...');
  
    fetch(`http://localhost:8080/items/${movieId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        return response.json();
      })
      .then(data => {
        console.log('가져온 영화 데이터:', data);
        setMovie(data);
      })
      .catch(error => {
        console.error('데이터 가져오기 오류:', error);
      });
  }, [movieId]);
  

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="moviedetail" style={{ marginTop: "20px" }}>
      <Row className="justify-content-center ml-4 mr-4"> {/* 중앙 정렬 및 좌우 여백 */}
        <Col xs={12} md={3} className="poster">
          <Image
            src={movie.posterUrl}
            alt={movie.itemNm}
            layout="responsive"
            width={150}   // 이미지 너비 조정
            height={225}  // 이미지 높이 조정
          />
        </Col>
        <Col xs={12} md={9} className="info">
          <h2>{movie.itemNm}</h2>
          <p>{movie.itemDetail}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailComponent;

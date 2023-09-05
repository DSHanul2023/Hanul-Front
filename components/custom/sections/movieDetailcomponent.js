import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart,faVideo } from "@fortawesome/free-solid-svg-icons";
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
  const keyworddiv = () =>{
    const keywordsString = movie.keyword;
    const keywordsArray = keywordsString.split(',');
    
    return keywordsArray.slice(0, 5).map((keyword, index) => (
      <div key={index} className="tag tag-blank">
        #{keyword.replace(/\s+/g, '_').replace('_', '')}
      </div>
    ));
  }
  return (
    <Container className="moviedetail">
      <Row className="justify-content-center" style={{paddingTop:'30px',paddingBottom:'50px'}}> {/* 중앙 정렬 및 좌우 여백 */}
        <Col xs={12} md={4} className="poster mt-2">
          <Image
            src={movie.posterUrl}
            alt={movie.itemNm}
            layout="responsive"
            width={280}   // 이미지 너비 조정
            height={400}  // 이미지 높이 조정
          />
        </Col>
        <Col xs={12} md={7} className="info ml-5">
          <div className="itemNm"><h2>{movie.itemNm}</h2></div>
          <div className="tag_wrap tag_detail">
            {keyworddiv()}
          </div>
          <div className="playdiv">
            <button type="button" href="/" className="playbtn">
            <FontAwesomeIcon icon={faVideo} className='mr-3'/>
            <span>보러가기</span>
            <div></div>
            </button>
            <div>
            <button className="heartbtn">
            <FontAwesomeIcon icon={faHeart} className="hearticon"/>
            <span>찜</span>
            </button>
            </div>
            </div>
          <div style={{marginTop:'12px'}}>감독  {movie.director}</div>
          <div>출연  {movie.cast}</div>
          <div style={{marginTop:'12px'}}>{movie.itemDetail}</div>
                    
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailComponent;

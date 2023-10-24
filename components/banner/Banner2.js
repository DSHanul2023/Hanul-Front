import React from "react";
import { Container, Row, Col, Button} from "reactstrap";
import Image from "next/image";
import bannerimg from "../../assets/images/landingpage/chatting.jpg";
import { useRouter } from "next/router";
/**
 * Main Page 1 
 */

const Banner2 = () => {
  const router = useRouter();
  const surveyHandleClick = () => {
    router.push("/survey");
  }
  return (
    <div className="static-slider-head banner2">
      <Container>
        <Row>
          <Col lg="6" md="6">
            
          <h5 className="subtitle font-light">
            <br/>
            펫봇과 대화하며 마음의 안정을 찾고, 맞춤 영화를 추천받아보세요! 🐾🍿<br/><br/>

            자유게시판 / 취미 게시판 / 우리 동네 / 병원 후기 커뮤니티에서<br/>
            비슷한 고민을 가진 사람들과 소통을 할 수 있습니다.
            </h5>
          
            <button
              onClick={surveyHandleClick}
              className="try-btn m-t-30 font-16 font-bold"
            >
              이야기 치료법 체험해보기
            </button>
          </Col>
          <Col lg="6" md="6">
          <Image src={bannerimg} alt="hero banner" className="ml-4" 
          style={{ width: '100%', height: 'auto' }} />

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner2;

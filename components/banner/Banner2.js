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
            we:lover는 단순 상담 수준에서 그쳤던 기존 서비스들과 달리<br/>
            오늘의 채팅펫이 선택 가능하고 상담이 끝난 뒤<br/>
            사용자의 고민과 감정 상태를 고려하여<br/> 
            이야기 치료법의 일환으로써 영화 콘텐츠를 제공합니다.<br/><br/>

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

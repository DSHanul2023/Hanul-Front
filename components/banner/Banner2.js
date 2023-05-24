import React from "react";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import bannerimg from "../../assets/images/landingpage/chatting.jpg";
/**
 * Main Page 1 
 */

const Banner2 = () => {
  return (
    <div className="static-slider-head banner2">
      <Container>
        <Row className="">
          <Col lg="6" md="6">
            <h1 className="m-t-40 title font-bold">
            we:lover
            </h1>
            <h4 className="subtitle font-light">
            we:lover는 상담 기반으로 이야기 치료법을 제공합니다
            </h4>
          </Col>
          <Col lg="6" md="6">
            <Image src={bannerimg} alt="hero banner" className=" m-t-40 ml-4"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner2;

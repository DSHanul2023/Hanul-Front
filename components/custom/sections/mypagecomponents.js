import React from "react";
import Image from "next/image";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
} from "reactstrap";
import img2 from "../../../assets/images/ui/5.jpg";

const MyPageComponents = () => {
  return (
    <div className="my-page-container">
      <div className="spacer" id="card-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="6" className="text-center">
              <h1 className="title font-bold">My Page</h1>
              <h6 className="subtitle">마이페이지입니다.</h6>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="my-page-content">
        <Row className="justify-content-center">
          <Col md="6">
            <Card body className="card-shadow">
              <div className="d-flex">
                <div className="align-self-center">
                  <Image
                    src={img2}
                    alt="img"
                    className="img-circle w-50 h-50"
                  />
                </div>
                <div className="align-self-center">
                  <CardTitle>위러버</CardTitle>
                  <CardText>welover@duksung.ac.kr</CardText>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6" className="d-flex justify-content-between">
            <div style={{ width: "135px" }}>
              <Button outline color="secondary" className="w-100">
                작성게시물
              </Button>
            </div>
            <div style={{ width: "135px" }}>
              <Button outline color="secondary" className="w-100">
                작성댓글
              </Button>
            </div>
            <div style={{ width: "135px" }}>
              <Button outline color="secondary" className="w-100">
                북마크
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            md="6"
            className="d-flex justify-content-between flex-column align-items-center"
          >
            <div style={{ width: "100%" }}>
              <Button outline color="secondary" className="w-100 mt-4">
                회원정보변경
              </Button>
            </div>
            <div style={{ width: "100%" }}>
              <Button outline color="secondary" className="w-100 mt-4">
                1:1 문의하기
              </Button>
            </div>
            <div style={{ width: "100%" }}>
              <Button href="/#coming" outline color="secondary" className="w-100 mt-4">
                로그아웃
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyPageComponents;

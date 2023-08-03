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
import img2 from "../../../assets/images/chat/dog.png";

const MyPageComponents = () => {
  return (
    <div className="my-page-container">
      <div className="spacer" id="card-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="6" className="text-center">
              <h1 className="my-title font-bold">My Page</h1>
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
                    className="img-circle mr-4"
                    width={100} 
                    height={100}
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
          <Col md="6">
            <div className="mb-3">
              <Button
                outline
                color="secondary"
                className="w-100"
                href="/mypost"
              >
                작성게시물
              </Button>
            </div>
            <div className="mb-3">
              <Button
                outline
                color="secondary"
                className="w-100"
                href="/mycomment"
              >
                작성댓글
              </Button>
            </div>
            <div className="mb-3">
              <Button
                outline
                color="secondary"
                className="w-100"
                href="/savepage"
              >
                북마크
              </Button>
            </div>
            <div className="mb-3">
              <Button
                outline
                color="secondary"
                className="w-100"
                href="/memberinfochange"
              >
                회원정보변경
              </Button>
            </div>
            <div className="mb-3">
              <Button
                outline
                color="secondary"
                className="w-100"
                href="/onetooneinquiry"
              >
                1:1 문의하기
              </Button>
            </div>
            <div className="mb-3">
              <Button
                href="/#coming"
                outline
                color="secondary"
                className="w-100"
              >
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

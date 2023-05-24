import React from "react";
import { Row, Col, Container, Form} from "reactstrap";
import Image from "next/image";
import siginupimage from "../../../assets/images/form-banners/banner1/siginupimage.jpg"

const FormBannerComponent = () => {
  return (
    <div>
      <div className="bg-light">
        <section>
          <div id="banner1" className="banner spacer">
            <Container>
              <Row>
                <Col lg="7" md="7" className="align-self-center">
                  <h2 className="title font-bold">
                  고민 상담 AI 챗봇 기반 이야기 치료법 제공 서비스
                  </h2>
                  <p className="m-t-15 m-b-30">
                  회원가입 후 서비스를 이용해 보세요
                  </p>
                  <Form className="m-t-40">
                    <div>
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="font-14"
                    />
                    </div>
                    <div className="m-t-10">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="font-14"
                    />
                    <input 
                      type="submit"
                      value="Enter"
                      className="font-14 btn-rounded text-white text-center ml-2"
                    />
                    </div>
                  </Form>
                  <button className="m-t-10 font-14 text-white text-center">
                    이야기 치료법 체험해보기</button>
                </Col>
                <Col lg="5" md="5" className="align-self-center ml-auto">
                  <Image 
                    src={siginupimage}
                    alt="We are Digital Agency"
                    className="img-fluid"
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FormBannerComponent;

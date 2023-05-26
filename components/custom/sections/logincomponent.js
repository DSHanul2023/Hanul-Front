import React from "react";
import { Row, Col, Container, Form} from "reactstrap";
import Image from "next/image";

const LoginComponent = () => {
  return (
    <div>
      <div className="bg-light">
        <section>
          <div id="login" className="login spacer">
            <Container>
            <Row className="justify-content-center align-items-center">
        <Col lg="7" md="7" className="align-self-center text-center">
          <p className="m-t-15 m-b-30">
            로그인 후 서비스를 이용해 보세요
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
        </Col>
      </Row>
            </Container>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;
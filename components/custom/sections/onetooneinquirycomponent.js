import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const OneToOneInquiry = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [inquiry, setInquiry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Subject:", subject);
    console.log("Inquiry:", inquiry);
  };

  return (
    <div className="one-to-one-inquiry">
      <Container>
        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <h1 className="title m-5 text-center">1:1 문의하기</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="d-flex align-items-center">
                <Label for="name" className="mb-0 mr-2" style={{ minWidth: "70px" }}>
                  이름
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="d-flex align-items-center">
                <Label for="email" className="mb-0 mr-2" style={{ minWidth: "70px" }}>
                  이메일
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="d-flex align-items-center">
                <Label for="subject" className="mb-0 mr-2" style={{ minWidth: "70px" }}>
                  제목
                </Label>
                <Input
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup className="mt-5">
                <Label for="inquiry"> 문의 내용</Label>
                <Input
                  type="textarea"
                  id="inquiry"
                  value={inquiry}
                  onChange={(e) => setInquiry(e.target.value)}
                  style={{ height: "400px" }}
                  required
                />
              </FormGroup>
              <div className="text-right mb-5">
                <Button type="submit" className="btn btn-inverse waves-effect waves-light">
                  보내기
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    
  );
};

export default OneToOneInquiry;

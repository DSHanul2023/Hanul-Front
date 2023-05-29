import React from "react";
import { Card, Button, CardTitle, CardText, Container, Row, Col } from "reactstrap";

const Contents = () => {
    return (
        <Container>
                <Row className="justify-content-center">
                    <Col className="d-flex">
                        <Card body className="content-card card-shadow">
                            <div className="img-content"></div>
                            <CardTitle className="contents-title">책 제목</CardTitle>
                            <CardText className="contents-subtitle">책 소개</CardText>
                        </Card>
                    </Col>
                </Row>
            </Container>
    );
};

export default Contents;
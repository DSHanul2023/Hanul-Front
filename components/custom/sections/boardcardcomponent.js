/* eslint-disable */
import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container} from 'reactstrap';

const BoardCards = () => {
    return (
        <div>
            <Container className="board">
                <Row className='card-row'>
                    <Col md="12">
                        <Card body className="card-shadow card">
                            <Container>
                                <Row className='card-main'>
                                    <Col md="11">
                                        <CardTitle>게시물 제목</CardTitle>
                                        <CardText>내용 미리보기</CardText>
                                    </Col>
                                    <Col className='board-right'>
                                        <CardText>작성일</CardText>
                                    </Col>
                                </Row>
                                    <hr></hr>
                                <Row>
                                    <Col md="11">
                                        <CardText>작성자</CardText>
                                    </Col>
                                    <Col className='board-right'>
                                        <CardText>3</CardText>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default BoardCards;

/* eslint-disable */
import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container} from 'reactstrap';
const BoardCards = (boarditem,key) => {
    const item = boarditem.boarditem;
    return (
        <div>
            <Container className="board">
                <Row className='card-row'>
                    <Col md="12">
                        <Card body className="card-shadow card">
                            <Container>
                                <Row className='card-main'>
                                    <Col md="11">
                                        <CardTitle>{item.title}</CardTitle>
                                        <CardText>{item.contents}</CardText>
                                    </Col>
                                    <Col className='board-right'>
                                        <CardText>{item.date}</CardText>
                                    </Col>
                                </Row>
                                    <hr></hr>
                                <Row>
                                    <Col md="11">
                                        <CardText>{item.author}</CardText>
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

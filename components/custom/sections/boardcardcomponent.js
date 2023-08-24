import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardTitle, CardText, Row, Col, Container } from 'reactstrap';

const BoardCards = (boarditem, key) => {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/board/${item.idx}`);
        };
    const item = boarditem.boarditem;
    return (
        <div>
            <Container className="board">
                <Row className='card-row'>
                    <Col md="12">
                    <a href="#" onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card body className="card-shadow card">
                                <Container>
                                    <Row className='card-main'>
                                        <Col md="10">
                                            <CardTitle>{item.title}</CardTitle>
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
                                            <CardText></CardText>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default BoardCards;
/* eslint-disable */
import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap';

const BoardCards = () => {
    return (
        <div>
            <Container className="board">
                <Row className='card-row'>
                    <Col md="12">
                        <Card body className="card-shadow card">
                            <CardTitle>게시물 제목</CardTitle>
                            <CardText>내용 미리보기</CardText>
                            <Button>Go somewhere</Button>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default BoardCards;

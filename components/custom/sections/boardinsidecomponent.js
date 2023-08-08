import React, { useState, useEffect } from 'react';
import { Container, Button, FormGroup, Input, Label, Form } from 'reactstrap';
import { useRouter } from "next/router";
import { Card, CardTitle, CardText, Row, Col } from 'reactstrap';

const BoardInsideComponent = () => {
    const router = useRouter();
    const { query } = router;
    const { id } = query;
    const [token,setToken] = useState([]);
    const [boardData, setBoardData] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const [selected, setSelected] = useState(1);
    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (!accessToken) {
            window.location.href = "/login";
        } else {
            console.log(accessToken);
            handleFetchBoardData(accessToken);
            setToken(accessToken);
        }
    }, []);
    const handleFetchBoardData = async (accessToken) => {
        console.log(accessToken);
        try {
            const response = await fetch(`http://localhost:8080/board/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBoardData(data.data[0]);
                console.log(data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleEditClick = () => {
        setIsEditMode(true);
        setTitle(boardData.title);
        setContents(boardData.contents);
        setSelected(boardData.type);
    };

    const handleCancelClick = () => {
        setIsEditMode(false);
    };

    const handleUpdateClick = async () => {
        const accessToken = token;

        console.log(accessToken);
        try {
            const response = await fetch(`http://localhost:8080/board`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    idx:id,
                    title,
                    contents,
                    image:"m"                    
                    
                }),            });
            if (response.ok) {
                console.log("Content update successful");
                setIsEditMode(false);
                handleFetchBoardData(token);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div className='boardCreate'>
            <Container>
                {isEditMode ? (
                    <Form style={{marginTop:"20px"}}>
                        <FormGroup>
                            <Label for="catSelect">
                                게시판
                            </Label>
                            <Input
                                id="catSelect"
                                name="select"
                                type="text" 
                                value={selected === "1" ? "자유게시판" : selected === "2" ? "취미게시판" : selected === "3" ? "우리 동네" : selected === "4" ? "병원 후기" : ""}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="title">제목</Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="제목을 입력하세요."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="contents">내용</Label>
                            <Input
                                style={{ height: '200px' }}
                                type="textarea"
                                className="form-control"
                                id="contents"
                                value={contents}
                                onChange={(e) => setContents(e.target.value)}
                                placeholder="내용을 입력하세요."
                            />
                        </FormGroup>
                        <Button color="themecolor" onClick={handleUpdateClick}>수정하기</Button>{' '}
                        <Button color="secondary" onClick={handleCancelClick}>취소</Button>
                    </Form>
                ) : (
                    <> <Card style={{ backgroundColor: "#ffffff" }}>
                    <Container>
                        <Row className='card-main'>
                            <Col md="11">
                                <CardTitle tag="h1">{boardData.title}</CardTitle>
                            </Col>
                            <Col className='board-right' style={{ textAlign: "right" }}>
                                <CardText>{boardData.date}</CardText>
                            </Col>
                        </Row>
                        <hr></hr>
                        <Row>
                            <Col md="11">
                                <CardText>{boardData.contents}</CardText>
                            </Col>
                            <Col className='board-right'>
                                <CardText></CardText>
                            </Col>
                        </Row>
                    </Container>
                </Card>
                <Button color="themecolor" onClick={handleEditClick} style={{ float: "right" }}>수정</Button>
                    </>
                )}
            </Container>
        </div>
    );
}

export default BoardInsideComponent;

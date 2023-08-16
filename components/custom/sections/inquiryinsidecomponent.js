import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Container, FormGroup, Label, Input, Card, CardTitle, CardText, Form } from 'reactstrap';
import { useRouter } from "next/router";

const InquiryInsideComponent = () => {
    const [token, setToken] = useState([]);
    const [inquiry, setInquiry] = useState({});
    const router = useRouter();
    const { query } = router;
    const { id } = query;
    const [isEditMode, setIsEditMode] = useState(false);
    const [inquiryNm, setInquiryNm] = useState("");
    const [inquiryDetail, setInquiryDetail] = useState("");

    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (!accessToken) {
            window.location.href = "/login";
        } else {
            console.log(accessToken);
            handleFetchInquirydData(accessToken);
            setToken(accessToken);
        }
    }, []);

    const handleFetchInquirydData = async (accessToken) => {
        console.log(accessToken);
        try {
            const response = await fetch(`http://localhost:8080/api/inquiry/${id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setInquiry(data.data[0]);
                console.log(data.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEditClick = () => {
        setIsEditMode(true);
        setInquiryNm(inquiry.inquiryNm);
        setInquiryDetail(inquiry.inquiryDetail);
    };

    const handleUpdateClick = async () => {
        try {
            const requestUrl = `http://localhost:8080/api/inquiry`;
            const method = 'PUT';

            const response = await fetch(requestUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id:id,
                    inquiryNm: inquiryNm,
                    inquiryDetail: inquiryDetail,
                    // Other fields you might want to update
                })
            });

            if (!response.ok) {
                throw new Error('문의 수정에 실패했습니다.');
            }

            const responseData = await response.json();
            setInquiry(responseData.data[0]);
            setIsEditMode(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteClick = async () => {
        try {
            const requestUrl = `http://localhost:8080/api/inquiry`;
            const method = 'DELETE';

            const response = await fetch(requestUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id:id,
                })
            });

            if (!response.ok) {
                throw new Error('문의 삭제에 실패했습니다.');
            }
            router.push('/inquiry'); 

        } catch (error) {
            console.error(error);
        }
    };
    const handleCancelClick = () => {
        setIsEditMode(false);
    };
    const handleBackClick = () =>{
        router.push('/inquiry');
    };
    return (<>
        <Button color="themecolor" onClick={handleBackClick}>&lt; Inquiry</Button> {/* '<' 버튼 추가 */}
        <Card>
            <Container>
                {isEditMode ? (
                    <Form style={{ marginTop: "20px" }}>
                        <FormGroup>
                            <Label htmlFor="title">제목</Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="제목을 입력하세요."
                                value={inquiryNm}
                                onChange={(e) => setInquiryNm(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="contents">내용</Label>
                            <Input
                                style={{ height: '200px' }}
                                type="textarea"
                                className="form-control"
                                id="contents"
                                value={inquiryDetail}
                                onChange={(e) => setInquiryDetail(e.target.value)}
                                placeholder="내용을 입력하세요."
                            />
                        </FormGroup>
                        <Button color="themecolor" onClick={handleUpdateClick}>수정하기</Button>{' '}
                        <Button color="themecolor" onClick={handleCancelClick}>취소</Button>
                    </Form>
                ) : (
                    <>
                        <Row className='card-main'>
                            <Col md="11" className='mt-5 ml-3'>
                                <CardTitle tag="h4">{inquiry.inquiryNm}</CardTitle>
                            </Col>
                            <Col className='board-right'>
                                <CardText>{inquiry.createdAt}</CardText>
                            </Col>
                        </Row><hr/>
                        <Row className='ml-3 mb-5'>
                            <Col md="11">
                                <CardText>{inquiry.inquiryDetail}</CardText>
                            </Col>
                        </Row><hr/>
                        <Row>
                            <Col className='board-right mb-5'>
                                <Button color="themecolor" onClick={handleEditClick}>수정</Button>
                                <Button color='themecolor' onClick={handleDeleteClick} className='ml-2'>삭제</Button>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
            
        </Card>
        <Card>
            <Container>
                <Row className='mt-5 mb-5'>
                    <Col>
                    <h4>답변</h4><hr/>
                        <div className='mt-3'>
                            <div>
                                <p>{inquiry.answer}
                                <span style={{ float: 'right' }} className='ml-3'>{inquiry.answer_date}</span>
                                <span style={{ float: 'right' }} className='ml-3'>관리자</span>
                                </p> 
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Card>
    </>
    );
}

export default InquiryInsideComponent;
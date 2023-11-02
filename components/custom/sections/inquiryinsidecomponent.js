import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Container, FormGroup, Label, Input, Card, CardTitle, CardText, Form } from 'reactstrap';
import { useRouter } from "next/router";

const InquiryInsideComponent = (props) => {
    const [token, setToken] = useState([]);
    const [inquiry, setInquiry] = useState({});
    const router = useRouter();
    const id = props.id;
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
            const response = await fetch(`http://43.201.180.174:8080/api/inquiry/${id}`, {
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
            const requestUrl = `http://43.201.180.174:8080/api/inquiry`;
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
            handleFetchInquirydData(token); 

            setIsEditMode(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleDeleteClick = async () => {
        try {
            const requestUrl = `http://43.201.180.174:8080/api/inquiry`;
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
    return (<div className='inquiryinside mt-3'>
        <Button onClick={handleBackClick} className='inquirybtn mb-2'>&lt; Inquiry</Button>
        <Card className='inquirycard'>
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
                        <Button className='formbtn' onClick={handleCancelClick}>취소</Button>
                        <Button className='formbtn' onClick={handleUpdateClick}>수정하기</Button>{' '}
                    </Form>
                ) : (
                    <>
                        <Row className='card-main mt-5'>
                            <Col md="9" className='ml-3'>
                                <CardTitle tag="h4">{inquiry.inquiryNm}</CardTitle>
                            </Col>
                            <Col className='board-right'>
                                <CardText>{inquiry.createdAt}</CardText>
                            </Col>
                        </Row><hr/>
                        <Row className='ml-3 mb-5'>
                            <Col md="11 mb-5 mt-1">
                                <CardText>{inquiry.inquiryDetail}</CardText>
                            </Col>
                        </Row><hr/>
                        <Row>
                            <Col className='mb-5'>
                            <Button className='formbtn' onClick={handleDeleteClick}>삭제</Button>
                            <Button className='formbtn' onClick={handleEditClick}>수정</Button>
                            </Col>
                        </Row>
                    </>
                )}
            </Container>
        </Card>
        {!isEditMode && (
        <Card>
            <Container>
                <Row className='mt-5 mb-5'>
                    <Col>
                    <h5>답변</h5><hr/>
                    {inquiry.answer ?(
                        <div className='mt-3'>
                            <div>
                                <p>{inquiry.answer}
                                <span style={{ float: 'right' }} className='ml-3'>{inquiry.answer_date}</span>
                                <span style={{ float: 'right' }} className='ml-3'>관리자</span>
                                </p> 
                            </div>
                        </div>
                    ):(
                        <span>문의 처리중입니다.</span>
                    )}
                    </Col>
                </Row>
            </Container>
        </Card>)}
    </div>
    );
}

export default InquiryInsideComponent;
import React, { useState, useEffect } from 'react';
import {
    Button, ButtonGroup,UncontrolledDropdown,DropdownToggle,DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Container,
    FormGroup,
    Label,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import InquiryForm from './inquiryformcomponent';

const InquiryBoard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [showInquiryForm, setShowInquiryForm] = useState(false);
    const apiUrl = 'http://localhost:8080/api/inquiry';
    const retrieveInquiryList = async () => {
        try {
            const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZWxsbzJAd29ybGQuY29tIiwiaWF0IjoxNjkwMjE5MDUyLCJleHAiOjE2OTAzMDU0NTIsImlkIjoiNDAyOGEzMjg4OTg4YWRmYzAxODk4OGFlNDY5MjAwMDAifQ.r1H0VUBMkZNzv4oBUTT5YF8k6pjKP2K411FbEa3yTuc' // `Bearer ${token}`
                    }
            });

            if (!response.ok) {
            throw new Error('Failed to fetch inquiries');
            }

            const inquiries = await response.json();
            console.log("1"+inquiries);
            return inquiries.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    useEffect(() => {
        fetchInquiries();
        }, []);

    const fetchInquiries = async () => {
        try {
                const data = await retrieveInquiryList(); // api/inquiry.js의 retrieveInquiryList 함수 호출
                setInquiries(data);
            } 
        catch (error) {
            console.error(error);
        }
    };   
    const toggleInquiryForm = () => {
        setShowInquiryForm(!showInquiryForm);
    };
    const handleInquirySubmit = async (formData) => {
        console.log('폼 데이터 제출:', formData);
        // 필요한 경우 추가 작업을 수행합니다.

        // 폼 제출이 끝나면 폼을 숨깁니다.
        setShowInquiryForm(false);
        // 필요한 경우 문의 목록을 업데이트합니다.
        fetchInquiries();
    };
        
    const handleFormCancel = () => {
        // 사용자가 폼 제출을 취소하면 폼을 숨깁니다.
        setShowInquiryForm(false);
    };
    return (
        <div className='inquiry'>
            {!showInquiryForm && (
            <Container>
                <Row>
                    <Col md="6">
                        <h2 className="font-bold">문의하기</h2>
                    </Col>
                    <Col md="2">
                        <Button color='themecolor' onClick={toggleInquiryForm}>문의하기</Button>
                    </Col>
                    <Col md="4">
                        <ButtonGroup className='btn-group-board'>
                            <UncontrolledDropdown setActiveFromChild>
                                <DropdownToggle tag="button" className="btn btn-outline-secondary" caret>
                                    제목
                                </DropdownToggle>
                                <DropdownMenu>
                                <DropdownItem tag="a" href="/blah">
                                    제목
                                </DropdownItem>
                                <DropdownItem tag="a" href="/blah">
                                    작성자
                                </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </ButtonGroup>
                        <FormGroup className='btn-group-board'>
                                <Label htmlFor="name"></Label>
                                <Input type="text" className="form-control" id="name" placeholder="검색어를 입력하세요." />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" className='inquiry-table'>
                        <div className="table-responsive">
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>제목</th>
                                    <th>작성자</th>
                                    <th>작성일</th>
                                    <th>상태</th>
                                </tr>
                                </thead>
                                <tbody>
                                {inquiries && inquiries.map((inquiry, index) => (
                                    <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{inquiry.inquiryNm}</td>
                                    <td>{inquiry.inquiryDetail}</td>
                                    <td>{inquiry.state}</td>
                                    {/* Add other inquiry properties as needed */}
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className='page'>
                        <Pagination>
                            <PaginationItem>
                                <PaginationLink first href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink previous href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    1
                                    </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    2
                                    </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    3
                                    </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    4
                                    </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">
                                    5
                                    </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink next href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink last href="#" />
                            </PaginationItem>
                        </Pagination>
                    </Col>
                </Row>
            </Container> 
            )}  
            {showInquiryForm && (
                <Container>
                    <h2 className="font-bold">문의하기</h2>
                    <InquiryForm onFormSubmit={handleInquirySubmit} onFormCancel={handleFormCancel} />
                </Container>
            )}
        </div>
    );
}

export default InquiryBoard;
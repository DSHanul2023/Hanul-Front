import React, { useState, useEffect } from 'react';
import {
    Button,
    Row,
    Col,
    Container,
    FormGroup,
    Label,
    Input,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,Card
} from 'reactstrap';
import InquiryForm from './inquiryformcomponent';
import { useRouter } from 'next/router';
const InquiryBoard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const apiUrl = 'http://43.201.180.174:8080/api/inquiry';
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // 한 페이지에 보여질 항목 수
    const router = useRouter();
    const [token, setToken] = useState([]);

    const retrieveInquiryList = async (accessToken) => {
        try {
            if( accessToken && accessToken !== null ) {
            const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
            });

            if (!response.ok) {
            throw new Error('Failed to fetch inquiries');
            }

            const inquiries = await response.json();
            return inquiries.data;
        }} catch (error) {
            console.error(error);
            throw error;
        }
    };
    useEffect(() => {
        const accessToken = localStorage.getItem("ACCESS_TOKEN");
        if (!accessToken) {
            router.push("/login");
        }
        else{
            setToken(accessToken);
            fetchInquiries(accessToken);
        }
        }, [currentPage]);

    const fetchInquiries = async (accessToken) => {
        try {
                const data = await retrieveInquiryList(accessToken); // api/inquiry.js의 retrieveInquiryList 함수 호출
                setInquiries(data.reverse());
            } 
        catch (error) {
            console.error(error);
        }
    };   
    const toggleCreateForm = () => {
        setShowCreateForm(!showCreateForm);
    };
    
    const handleInquiryItemClick = (inquiryId) => {
        router.push(`/inquiry/${inquiryId}`);
    };
    const handleInquirySubmit = async (formData) => {
        try {
            if (formData === null) {
                fetchInquiries(token); 
            } else {
                setShowCreateForm(false);
                fetchInquiries(token);
            }
        } catch (error) {
            console.error(error);
        }
    };
        
    const handleFormCancel = () => {
        setShowCreateForm(false);
    };
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async () => {
        try {
            const response = await fetch(`${apiUrl}/search/${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch inquiries');
            }

            const inquiries = await response.json();
            setInquiries(inquiries.data.reverse());
        } catch (error) {
            console.error(error);
        }
    };
    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const renderPagination = () => {
        const pageCount = Math.ceil((inquiries && inquiries.length) / itemsPerPage);
        if (pageCount <= 1) return null;
        const paginationItems = [];
        for (let i = 1; i <= pageCount; i++) {
            paginationItems.push(
            <PaginationItem key={i} active={i === currentPage}>
                <PaginationLink className={i === currentPage ? 'page-active' : ''} onClick={() => handlePaginationClick(i)}>
                    {i}
                </PaginationLink>
            </PaginationItem>
            );
        }
        return (
        <Pagination style={{display:'flex',justifyContent:'center'}}>
            <PaginationItem>
                <PaginationLink previous onClick={() => handlePaginationClick(currentPage - 1)} />
            </PaginationItem>
            {paginationItems}
            <PaginationItem>
                <PaginationLink next onClick={() => handlePaginationClick(currentPage + 1)} />
            </PaginationItem>
            </Pagination>
        );
    };
    const renderInquiries = () => {
        // 현재 페이지에 해당하는 데이터만 추출
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const inquiriesToShow = inquiries.slice(startIndex, endIndex);
        return (
            inquiriesToShow.map((inquiry, index) => (
                <tr key={index} onClick={() => handleInquiryItemClick(inquiry.id)}>
                    <td>{startIndex + index + 1}</td>
                    <td>{inquiry.inquiryNm}</td>
                    <td>{inquiry.createdAt}</td>
                    <td>{inquiry.state ? "답변완료" : "처리중"}</td>
                </tr>
            ))
        );
    };
    return (
        <div className='inquiry'>
            <Card style={{padding:'30px', height:"60vh", width:"70vw", margin:"auto"}}>
            {!showCreateForm && (
            <Container>
                <Row>
                    <Col md="6">
                        <h3 className="font-bold mt-2">문의 게시판</h3>
                    </Col>
                    <Col md="2">
                        <Button onClick={toggleCreateForm}>문의하기</Button>
                    </Col>
                    <Col md="4">
                        <FormGroup className='btn-group-board'>
                            <Label htmlFor="name"></Label>
                                <Input
                                    type="text"
                                    className="form-control mt-1"
                                    id="name"
                                    placeholder="검색어를 입력하세요."
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                            <Col md="6"><Button onClick={handleSearchSubmit}>검색</Button></Col> 
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
                                    <th>작성일</th>
                                    <th>상태</th>
                                </tr>
                                </thead>
                                <tbody>
                                {renderInquiries()}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className='page'>
                        {renderPagination()}
                    </Col>
                </Row>
            </Container> 
            )}  
            {showCreateForm && (
                <Container>
                    <h2 className="font-bold">문의하기</h2>
                    <InquiryForm onFormSubmit={handleInquirySubmit} onFormCancel={handleFormCancel} />
                </Container>
            )}</Card>
        </div>
    );
}

export default InquiryBoard;
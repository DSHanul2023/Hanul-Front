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
    PaginationLink
} from 'reactstrap';
import InquiryForm from './inquiryformcomponent';

const InquiryBoard = () => {
    const [inquiries, setInquiries] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const apiUrl = 'http://localhost:8080/api/inquiry';
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // 한 페이지에 보여질 항목 수
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    const retrieveInquiryList = async () => {
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
        fetchInquiries();
        }, [currentPage]);

    const fetchInquiries = async () => {
        try {
                const data = await retrieveInquiryList(); // api/inquiry.js의 retrieveInquiryList 함수 호출
                setInquiries(data);
            } 
        catch (error) {
            console.error(error);
        }
    };   
    const toggleCreateForm = () => {
        setShowCreateForm(!showCreateForm);
        setSelectedInquiry(null);
    };
    
    const toggleEditForm = (inquiryId) => {
        setShowEditForm(!showEditForm);
        setSelectedInquiry(inquiryId);
    };
    const handleInquiryItemClick = (inquiryId) => {
        setSelectedInquiry(inquiryId);
        toggleEditForm(inquiryId);
    };
    const handleInquirySubmit = async (formData) => {
        try {
            if (formData === null) {
                // Handle deletion case
                fetchInquiries(); // Fetch updated inquiry list after deletion
            } else {
                // Handle creation/update case
                setShowCreateForm(false);
                setShowEditForm(false);
                fetchInquiries();
            }
        } catch (error) {
            console.error(error);
        }
    };
        
    const handleFormCancel = () => {
        // 사용자가 폼 제출을 취소하면 폼을 숨깁니다.
        setShowCreateForm(false);
        setShowEditForm(false);
    };
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async () => {
        try {
            const response = await fetch(`${apiUrl}/${searchQuery}`, {
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
            setInquiries(inquiries.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const renderPagination = () => {
        const pageCount = Math.ceil(inquiries.length / itemsPerPage);
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
        <Pagination>
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
                    <td>{inquiry.state}</td>
                </tr>
            ))
        );
    };
    return (
        <div className='inquiry'>
            {!showCreateForm && !showEditForm && (
            <Container>
                <Row>
                    <Col md="6">
                        <h2 className="font-bold">문의 게시판</h2>
                    </Col>
                    <Col md="2">
                        <Button color='themecolor' onClick={toggleCreateForm}>문의하기</Button>
                    </Col>
                    <Col md="4">
                        <FormGroup className='btn-group-board'>
                            <Label htmlFor="name"></Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="검색어를 입력하세요."
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                            <Col md="5"><Button color='themecolor' onClick={handleSearchSubmit}>검색</Button></Col> 
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
            )}
            {showEditForm && (
            <Container>
                <h2 className="font-bold">문의 수정</h2>
                <InquiryForm
                    inquiryToEdit={inquiries.find((inquiry) => inquiry.id === selectedInquiry)}
                    onFormSubmit={handleInquirySubmit}
                    onFormCancel={handleFormCancel}
                />
            </Container>
            )}
        </div>
    );
}

export default InquiryBoard;
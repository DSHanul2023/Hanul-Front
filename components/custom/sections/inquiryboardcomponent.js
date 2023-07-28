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
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const apiUrl = 'http://localhost:8080/api/inquiry';
    const retrieveInquiryList = async () => {
        try {
            const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZWxsbzJAd29ybGQuY29tIiwiaWF0IjoxNjkwNTQ0MzQ2LCJleHAiOjE2OTA2MzA3NDYsImlkIjoiNDAyODQ4ZTg4OTljNGEyZjAxODk5YzRiNjQ4ZDAwMDAifQ.M5SlUZt5OlEmWBY7jKMF9J1X-6oFw7AujMi0qXfZLwc' // `Bearer ${token}`
            }
            });

            if (!response.ok) {
            throw new Error('Failed to fetch inquiries');
            }

            const inquiries = await response.json();
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
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJoZWxsbzJAd29ybGQuY29tIiwiaWF0IjoxNjkwNTQ0MzQ2LCJleHAiOjE2OTA2MzA3NDYsImlkIjoiNDAyODQ4ZTg4OTljNGEyZjAxODk5YzRiNjQ4ZDAwMDAifQ.M5SlUZt5OlEmWBY7jKMF9J1X-6oFw7AujMi0qXfZLwc' // `Bearer ${token}`
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
    return (
        <div className='inquiry'>
            {!showCreateForm && !showEditForm && (
            <Container>
                <Row>
                    <Col md="6">
                        <h2 className="font-bold">문의하기</h2>
                    </Col>
                    <Col md="2">
                        <Button color='themecolor' onClick={toggleCreateForm}>문의하기</Button>
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
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="검색어를 입력하세요."
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                />
                                <Button color='themecolor' onClick={handleSearchSubmit}>검색</Button>
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
                                    <tr key={index}  onClick={() => handleInquiryItemClick(inquiry.id)}>
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
            {showCreateForm && (
        <Container>
            <h2 className="font-bold">문의하기</h2>
            <InquiryForm onFormSubmit={handleInquirySubmit} onFormCancel={handleFormCancel} />
        </Container>
    )}
    {showEditForm && (
        <Container>
            <h2 className="font-bold">문의 수정하기</h2>
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
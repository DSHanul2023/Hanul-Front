import React from 'react';
import {Button, Row, Col, Container, Dropdown, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input, Table, Pagination, PaginationItem, PaginationLink} from 'reactstrap';

const InquiryBoard = () => {
    return (
        <div className='inquiry'>
            <Container>
                <Row>
                    <Col md="6">
                        <h2 className="font-bold">문의하기</h2>
                    </Col>
                    <Col md="2">
                        <Button color='themecolor'>문의하기</Button>
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
                                    <tr>
                                        <td>1</td>
                                        <td>로그인이 안 돼요.</td>
                                        <td>Prohaska</td>
                                        <td>23.05.21</td>
                                        <td><span className='label label-light-inverse'>답변 대기</span> </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>내 정보를 변경하고 싶어요.</td>
                                        <td>Gaylord</td>
                                        <td>23.05.23</td>
                                        <td><span className="label label-inverse">답변 완료</span> </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className='page'>
                        <Pagination aria-label="Page navigation example">
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
        </div>
    );
}

export default InquiryBoard;
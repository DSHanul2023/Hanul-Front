import React from 'react';
import {Button, Row, Col, Container, Dropdown, ButtonGroup, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Label, Input, Table, Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import BoardCards from './boardcardcomponent';

const MyPost = () => {
    return (
        <div className='mypost'>
            <Container>
                <Row>
                    <Col>
                        <h2 className="title font-bold">작성 게시물</h2>
                    </Col>
                </Row>
                <BoardCards/>
            </Container>
        </div>
    );
}

export default MyPost;
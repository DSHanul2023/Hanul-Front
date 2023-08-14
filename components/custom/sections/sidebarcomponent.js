import React from 'react';
import { Row, Col, Container } from 'reactstrap';

const SideBarComponent = ({ onSidebarItemClick,selectedBoardType }) => {
    const handleItemClick = (boardType) => {
        onSidebarItemClick(boardType);
    };    
    return (
        <div>
            <div className="sidebar">
            <Container>
                <Row>
                <Col>
                    <h2 className="title font-bold">커뮤니티</h2>
                </Col>
                </Row>
                <div className="tab-row">
                <div className="col">
                    <div className="list-group" id="list-tab" role="tablist">
                    <a
                        className={`list-group-item list-group-item-action ${selectedBoardType === 1 ? 'active' : ''}`}
                        id="list-home-list"
                        data-bs-toggle="list"
                        href="#list-home"
                        role="tab"
                        aria-controls="list-home"
                        onClick={() => handleItemClick(1)}
                    >
                        자유게시판
                    </a>
                    <a
                        className={`list-group-item list-group-item-action ${selectedBoardType === 2 ? 'active' : ''}`}
                        id="list-hobby-list"
                        data-bs-toggle="list"
                        href="#list-hobby"
                        role="tab"
                        aria-controls="list-hobby"
                        onClick={() => handleItemClick(2)}
                    >
                        취미게시판
                    </a>
                    <a
                        className={`list-group-item list-group-item-action ${selectedBoardType === 3 ? 'active' : ''}`}
                        id="list-neigh-list"
                        data-bs-toggle="list"
                        href="#list-neigh"
                        role="tab"
                        aria-controls="list-neigh"
                        onClick={() => handleItemClick(3)}
                    >
                        우리 동네
                    </a>
                    <a
                        className={`list-group-item list-group-item-action ${selectedBoardType === 4 ? 'active' : ''}`}
                        id="list-hospital-list"
                        data-bs-toggle="list"
                        href="#list-hospital"
                        role="tab"
                        aria-controls="list-hospital"
                        onClick={() => handleItemClick(4)}
                    >
                        병원 후기
                    </a>
                    </div>
                </div>
                </div>
            </Container>
            </div>
        </div>
        );
    }
export default SideBarComponent;
import React from 'react';
import { Row, Col, Container } from 'reactstrap';

const SideBarComponent = () => {
    return(
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
                            <a className="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">
                                자유게시판
                            </a>
                            <a className="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">
                                취미게시판
                            </a>
                            <a className="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">
                                우리 동네
                            </a>
                            <a className="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">
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
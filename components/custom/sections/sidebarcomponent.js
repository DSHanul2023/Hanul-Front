import React, { useState } from 'react';
import { Row, Col, Container, Input } from 'reactstrap';

const SideBarComponent = ({ onSidebarItemClick, selectedBoardType }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleItemClick = (boardType) => {
        onSidebarItemClick(boardType);
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            // 엔터 키를 누르면 검색어를 selectedBoardType로 전달
            onSidebarItemClick(searchQuery);
            setSearchQuery('');
        }
    };

    return (
        <div className="sidebar mt-5 mr-5">
            <Container>
                <div className="tab-row">
                    <div className="col">
                        <div className="list-group" id="list-tab" role="tablist">
                            <a
                                className={`list-group-item list-group-item-action ${selectedBoardType === 'A5' ? 'active' : ''}`}
                                id="list"
                                data-bs-toggle="list"
                                role="tab"
                                aria-controls="list"
                                onClick={() => handleItemClick('A5')}
                            >
                                전체
                            </a>
                            <a
                                className={`list-group-item list-group-item-action ${selectedBoardType === 'A1' ? 'active' : ''}`}
                                id="list-home-list"
                                data-bs-toggle="list"
                                href="#list-home"
                                role="tab"
                                aria-controls="list-home"
                                onClick={() => handleItemClick('A1')}
                            >
                                자유게시판
                            </a>
                            <a
                                className={`list-group-item list-group-item-action ${selectedBoardType === 'A2' ? 'active' : ''}`}
                                id="list-hobby-list"
                                data-bs-toggle="list"
                                href="#list-hobby"
                                role="tab"
                                aria-controls="list-hobby"
                                onClick={() => handleItemClick('A2')}
                            >
                                취미게시판
                            </a>
                            <a
                                className={`list-group-item list-group-item-action ${selectedBoardType === 'A3' ? 'active' : ''}`}
                                id="list-neigh-list"
                                data-bs-toggle="list"
                                href="#list-neigh"
                                role="tab"
                                aria-controls="list-neigh"
                                onClick={() => handleItemClick('A3')}
                            >
                                우리 동네
                            </a>
                            <a
                                className={`list-group-item list-group-item-action ${selectedBoardType === 'A4' ? 'active' : ''}`}
                                id="list-hospital-list"
                                data-bs-toggle="list"
                                href="#list-hospital"
                                role="tab"
                                aria-controls="list-hospital"
                                onClick={() => handleItemClick('A4')}
                            >
                                병원 후기
                            </a>
                            <div style={{ marginTop: '48.5px' }}>
                                <Input
                                    placeholder='Q    검색'
                                    style={{ height: '48.5px', fontSize: '14px', borderColor: 'white' }}
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    onKeyDown={handleSearchInputKeyPress}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SideBarComponent;

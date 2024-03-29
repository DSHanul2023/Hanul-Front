import SideBarComponent from "./sections/sidebarcomponent";
import BoardComponent from "./sections/boardcomponent";
import { Row, Col } from 'reactstrap';
import React, {useEffect, useState} from 'react';
import SearchBarComponent from './sections/searchbarcomponent';

const CommunityComponents = () => {
  const [boardList, setBoardList] = useState([]);
  const [selectedBoardType, setSelectedBoardType] = useState('A5'); // 기본값은 "1"로 자유게시판을 나타냅니다.

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      // router.push("/login"); // Redirect to the main page if not logged in
      window.location.href = "/login";
    } else {
      getBoardList(accessToken);
    }
  }, []);

  const getBoardList = async (accessToken) => {
    try {
      console.log(accessToken);
        if( accessToken && accessToken !== null ) {
        const response = await fetch("http://43.201.180.174:8080/board", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
        });
        if (!response.ok) {
        throw new Error('Failed to fetch boardList');
        }
        const data = await response.json(); 
        setBoardList(data.data.reverse());     
      }} catch (error) {
        console.error(error);
        throw error;
    }
};
  // useEffect(() => {
  //   getBoardList(); // 1) 게시글 목록 조회 함수 호출
  // }, []);
  const handleSidebarItemClick = (boardType) => {
    setSelectedBoardType(boardType);
  };
    return (
      <div className='community d-flex justify-content-center'>
      <Row>
        <Col style={{maxWidth:'280px', paddingRight: '25px'}}>
          <SideBarComponent onSidebarItemClick={handleSidebarItemClick} selectedBoardType={selectedBoardType}/>
        </Col>
        <Col >
          <Row>
            <SearchBarComponent onSidebarItemClick={handleSidebarItemClick} />
          </Row>
          <Row>
            <BoardComponent boardList={boardList} selectedBoardType={selectedBoardType}/>
          </Row>
        </Col>
      </Row>
    </div>
    
    );
  };
  
  export default CommunityComponents;
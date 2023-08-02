import SideBarComponent from "./sections/sidebarcomponent";
import BoardComponent from "./sections/boardcomponent";
import { Row, Col } from 'reactstrap';
import React, {useEffect, useState} from 'react';

const CommunityComponents = () => {
  const [boardList, setBoardList] = useState([]);
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  const getBoardList = async () => {
    try {
        if( accessToken && accessToken !== null ) {
        const response = await fetch("http://localhost:8080/board", {
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
        setBoardList(data.data);     
      }} catch (error) {
        console.error(error);
        throw error;
    }
};
  useEffect(() => {
    getBoardList(); // 1) 게시글 목록 조회 함수 호출
  }, []);

    return (
      <div>
        <div className='community'>
          <Row>
            <Col md="3">
              <SideBarComponent />
            </Col>
            <Col>
              <BoardComponent boardList={boardList}/>
            </Col>
          </Row>
        </div>
      </div>
    );
  };
  
  export default CommunityComponents;
import SideBarComponent from "./sections/sidebarcomponent";
import BoardComponent from "./sections/boardcomponent";
import { Row, Col } from 'reactstrap';
import React, {useEffect, useState} from 'react';

const CommunityComponents = () => {
  const [boardList, setBoardList] = useState([]);

  const getBoardList = async () => {
    const resp = await fetch("http://localhost:8080/board", {
      method: 'GET'
    }).json; // 2) 게시글 목록 데이터에 할당  
    setBoardList(resp); // 3) boardList 변수에 할당
    console.log(boardList);
  }

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
              <BoardComponent />
            </Col>
          </Row>
        </div>
      </div>
    );
  };
  
  export default CommunityComponents;
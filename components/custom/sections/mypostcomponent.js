import React, {useEffect, useState} from 'react';
import {
  Button,
  Row,
  Col,
  Container,
  Dropdown,
  ButtonGroup,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormGroup,
  Label,
  Input,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import BoardCards from "./boardcardcomponent";
import BoardComponent from "./boardcomponent";

const MyPost = () => {
  const [boardList, setBoardList] = useState([]);
//   const [selectedBoardType, setSelectedBoardType] = useState(1); // 기본값은 "1"로 자유게시판을 나타냅니다.

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      window.location.href = "/login";
    } else {
      getBoardList(accessToken);
    }
  }, []);

  const getBoardList = async (token) => {
    try {
      if (token && token !== null) {
        const response = await fetch("http://localhost:8080/board/mypost", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch boardList");
        }
        const data = await response.json();
        setBoardList(data.data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="mypost">
      <Container>
        <Row>
          <Col>
            <h2 className="title font-bold">작성 게시물</h2>
          </Col>
        </Row>
        <Col>
          {/* <BoardComponent
            boardList={boardList}
            selectedBoardType={selectedBoardType}
          /> */}
          {boardList.map((boarditem, index) => (
            <BoardCards boarditem={boarditem} key={index} />
          ))}
        </Col>
      </Container>
    </div>
  );
};

export default MyPost;
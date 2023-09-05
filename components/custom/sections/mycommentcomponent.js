import React, {useEffect, useState} from 'react';
import {
  Row,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import BoardCards from "./boardcardcomponent";

const ITEMS_PER_PAGE = 6; // 한 페이지에 보일 아이템 수
const PAGES_TO_SHOW = 5; // 보여줄 페이지 수

const MyComment = () => {
  const [boardList, setBoardList] = useState([]);
//   const [selectedBoardType, setSelectedBoardType] = useState(1); // 기본값은 "1"로 자유게시판을 나타냅니다.
  const [currentPage, setCurrentPage] = useState(1);

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
        const response = await fetch("http://localhost:8080/comments/mycomment", {
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

  // 현재 페이지에 맞는 아이템을 반환하는 함수
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return boardList.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(boardList.length / ITEMS_PER_PAGE);

  // 현재 페이지 범위를 계산하는 함수
  const getCurrentPageRange = () => {
    const startPage = Math.floor((currentPage - 1) / PAGES_TO_SHOW) * PAGES_TO_SHOW + 1;
    const endPage = Math.min(startPage + PAGES_TO_SHOW - 1, totalPages);
    return [startPage, endPage];
  };

  return (
    <div className="mycomment">
      <Container>
      <Container className="title-spacer">
        <Row className="justify-content-center">
          <Col md="6" className="text-center">
            <h1 className="my-title font-bold">My Comment</h1>
          </Col>
        </Row>
      </Container>
        <Container className="mycomment-container">
        <Col className="mycomment-contents">
          {getCurrentPageItems().length > 0 ? (
            getCurrentPageItems().map((boarditem, index) => (
              <BoardCards boarditem={boarditem} key={index} />
            ))
          ) : (
            // <p className='text-center'>작성한 댓글이 없습니다.</p>
            <div className='text-center'>
          <p>작성한 댓글이 없습니다.</p>
        </div>
          )}
        </Col>
        </Container>
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col md="6" className="m-b-30">
            <Pagination aria-label="Page navigation example" className="paging">
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink previous href="#" onClick={() => setCurrentPage(currentPage - 1)} />
              </PaginationItem>
              {Array.from({ length: PAGES_TO_SHOW }).map((_, index) => {
                const [startPage, endPage] = getCurrentPageRange();
                const pageNumber = startPage + index;
                if (pageNumber <= endPage) {
                  return (
                    <PaginationItem key={index} active={currentPage === pageNumber}>
                      <PaginationLink href="#" onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              })}
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink next href="#" onClick={() => setCurrentPage(currentPage + 1)} />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyComment;

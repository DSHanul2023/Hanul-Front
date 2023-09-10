import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Col,
} from "reactstrap";
import Contents from "../../basic/contents";

const ITEMS_PER_PAGE = 8; // 한 페이지에 보일 아이템 수
const PAGES_TO_SHOW = 5; // 보여줄 페이지 수

const SaveComponent = () => {
  const [member, setMember] = useState(null);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      window.location.href = "/login";
    } else{
      fetchMemberInfo(accessToken);
    } 
  }, []); // 컴포넌트가 마운트될 때 한 번만 호출하도록 설정

  const fetchMemberInfo = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:8080/members/getMemberInfo",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMember(data);
        fetchItemsByMember(data.id);
      } else {
        console.log("Failed to fetch member information");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchItemsByMember = async (memberId) => {
    try {
      const response = await fetch(`http://localhost:8080/members/${memberId}/bookmarked-items`);
      if (!response.ok) {
        throw new Error("Failed to fetch member's items");
      }
      const items = await response.json();
      setItems(items);
      console.log(items);
    } catch (error) {
      console.error(error);
    }
  };

  // 현재 페이지에 맞는 아이템을 반환하는 함수
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  // 현재 페이지 범위를 계산하는 함수
  const getCurrentPageRange = () => {
    const startPage = Math.floor((currentPage - 1) / PAGES_TO_SHOW) * PAGES_TO_SHOW + 1;
    const endPage = Math.min(startPage + PAGES_TO_SHOW - 1, totalPages);
    return [startPage, endPage];
  };

  return (
    <div className="save-page">
      <Container className="title-spacer">
        <Row className="justify-content-center">
          <Col md="6" className="text-center">
            <h1 className="save-title font-bold">Bookmark</h1>
          </Col>
        </Row>
      </Container>
      <Container className="save-page-container">
        <Contents items={getCurrentPageItems()}/> {/* 아이템 목록을 전달 */}
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

export default SaveComponent;

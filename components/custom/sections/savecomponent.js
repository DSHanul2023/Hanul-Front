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
      const response = await fetch(`http://localhost:8080/items/members/${memberId}`);
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

  return (
    <div className="save-page">
      <Container className="spacer">
        <Row className="justify-content-center">
          <Col md="6" className="text-center">
            <h1 className="save-title font-bold">북마크</h1>
            <h6 className="subtitle">북마크페이지입니다.</h6>
          </Col>
        </Row>
      </Container>
      <Container className="save-page-container">
        <Contents items={items} /> {/* 아이템 목록을 전달 */}
      </Container>
      <Container>
        <Row className="justify-content-center">
          <Col md="6" className="m-b-30">
            <Pagination aria-label="Page navigation example" className="paging">
              <PaginationItem>
                <PaginationLink first href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last href="#" />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SaveComponent;

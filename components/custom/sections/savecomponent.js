import React from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Col,
} from "reactstrap";
import Contents from "../../basic/contents";

const SaveComponent = () => {
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
      <Container className="save-page-container col-md-8">
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4">
          <Col><Contents /></Col>
          <Col><Contents /></Col>
          <Col><Contents /></Col>
          <Col><Contents /></Col>
          <Col><Contents /></Col>
        </Row>
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

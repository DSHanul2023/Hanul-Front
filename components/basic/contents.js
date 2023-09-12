import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import Image from "next/image";
import Link from 'next/link';

const Contents = ({ items }) => {
  const rowStyle = {
    margin: '0 auto',
    maxWidth: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  };

  return (
    <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4" style={rowStyle}>
      {items.map((item) => (
        <Col key={item.id} className="d-flex">
          <Link href={`/items/${item.id}`} passHref>
          <Card body className="card-shadow">
          <a onClick={(e) => {
              e.preventDefault(); // 기본 동작(링크 이동)을 막음
              window.open(`/items/${item.id}`, "_blank"); // 새 창으로 열기
            }} className="img-ho" rel="noopener noreferrer">
              <div
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  overflow: "hidden",
                  position: "relative",
                  boxSizing: "border-box",
                  margin: "0px",
                }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    display: "block",
                    maxWidth: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    src={item.posterUrl}
                    style={{
                      maxWidth: "100%",
                      display: "block",
                      margin: "0px",
                      border: "none",
                      padding: "0px",
                    }}
                  />
                </div>
                <Image
                  className="card-img-top"
                  src={item.posterUrl}
                  alt={item.itemNm}
                  fill={true}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </a>
            <CardBody>
              <div>
                <h5 className="font-medium m-b-0" style={{ color: "black", fontWeight: "bold" }}>
                  {item.itemNm}
                </h5>
              </div>
            </CardBody>
          </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default Contents;

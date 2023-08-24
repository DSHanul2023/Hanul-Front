// import React from "react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
} from "reactstrap";
import default_profile from "../../../public/profile/default_profile.png";
import { useRouter } from "next/router";

const MyPageComponents = () => {
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [profilePictureName, setProfilePictureName] = useState("");

  useEffect(() => {
    // Check if user is logged in (you can adjust this condition based on your login mechanism)
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      router.push("/login"); // Redirect to the main page if not logged in
    } else {
      fetchMemberInfo(accessToken);
    }
  }, []);

  const fetchMemberInfo = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/members/getMemberInfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMember(data);
        setProfilePictureName(data.profilePictureName);
      } else {
        console.log("Failed to fetch member information");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN"); // Clear access token
    router.push("/"); // Redirect to the main page after logout
  };

  return (
    <div className="my-page-container">
      <div className="spacer" id="card-component">
        <Container>
          <Row className="justify-content-center">
            <Col md="6" className="text-center">
              <h1 className="my-title font-bold">My Page</h1>
              <h6 className="subtitle">마이페이지입니다.</h6>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="my-page-content">
        <Row className="justify-content-center">
          <Col md="6">
            <Card body className="card-shadow">
              <div className="d-flex">
                <div className="align-self-center">
                  <Image
                    src={profilePictureName ? `/profile/${member.profilePictureName}` : default_profile}
                    alt="img"
                    className="img-circle mr-4"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="align-self-center">
                  {/* Display member's name and email */}
                  {member && (
                    <>
                      <CardTitle>{member.name}</CardTitle>
                      <CardText>{member.email}</CardText>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <div className="mb-3">
              <Button
                outline
                color="secondary"
                className="w-100"
                href="/mypost"
              >
                작성게시물
              </Button>
            </div>
            <div className="mb-3">
              <Button
                outline
                color="secondary"
                className="w-100"
                href="/mycomment"
              >
                작성댓글
              </Button>
            </div>
            <div className="mb-3">
              <Button
                outline
                color="secondary"
                className="w-100"
                href="/savepage"
              >
                북마크
              </Button>
            </div>
            <div className="mb-3">
              <Button
                outline
                color="secondary"
                className="w-100"
                href="/memberinfochange"
              >
                회원정보변경
              </Button>
            </div>
            {/* <div className="mb-3">
              <Button
                outline
                color="secondary"
                className="w-100"
                href="/onetooneinquiry"
              >
                1:1 문의하기
              </Button>
            </div> */}
            <div className="mb-3">
              <Button
                onClick={handleLogout}
                outline
                color="secondary"
                className="w-100"
              >
                로그아웃
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyPageComponents;

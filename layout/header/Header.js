import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import logo from "../../assets/images/logos/LOGO2.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  const [logState, setLogState] = useState("");
  const accessToken =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("ACCESS_TOKEN")
      : null;
  const memberId =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("MEMBER_ID")
      : null;

  useEffect(() => {
    if (!accessToken) {
      setLogState("LogIn");
    } else {
      setLogState("LogOut");
    }
  }, [accessToken]);

  const handleLogOut = async () => {
    if (accessToken) {
      try {
        const response = await fetch(
          `http://localhost:8080/members/${memberId}/logout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          if (typeof localStorage !== "undefined") {
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("MEMBER_ID");
            localStorage.removeItem("PET_NUM")
          }
          setLogState("LogIn");
          router.push("/"); // 로그아웃 후 홈페이지로 이동
        } else {
          console.error("로그아웃 실패");
        }
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      }
    } else {
      console.error("이미 로그아웃된 상태");
    }
  };

  const handleLogIn = () => {
    if (accessToken) {
      handleLogOut();
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div className="topbar" id="top">
      <div className="header6">
        <Container className="po-relative">
          <Navbar className="navbar-expand-lg h6-nav-bar">
            <NavbarBrand href="/">
              <Image src={logo} alt="wrapkit" />
            </NavbarBrand>
            <NavbarToggler onClick={toggle}>
              <span className="ti-menu"></span>
            </NavbarToggler>
            <Collapse
              isOpen={isOpen}
              navbar
              className="hover-dropdown ml-auto"
              id="h6-info"
            >
              <Nav navbar className="ml-auto">
                <NavItem>
                  <Link
                    href="/chat"
                    className={
                      router.pathname == "/chat"
                        ? "text-white nav-link"
                        : "nav-link"
                    }
                  >
                    Chatbot
                  </Link>
                </NavItem>

                <NavItem>
                  <Link
                    href="/community"
                    className={
                      router.pathname == "/community"
                        ? "text-white nav-link"
                        : "nav-link"
                    }
                  >
                    Community
                  </Link>
                </NavItem>

                <NavItem>
                  <Link
                    href="/inquiry"
                    className={
                      router.pathname == "/inquiry"
                        ? "text-white nav-link"
                        : "nav-link"
                    }
                  >
                    Inquiry
                  </Link>
                </NavItem>

                <NavItem>
                  <Link
                    href="/mypage"
                    className={
                      router.pathname == "/mypage"
                        ? "text-white nav-link"
                        : "nav-link"
                    }
                  >
                    MyPage
                  </Link>
                </NavItem>
              </Nav>
              <div className="act-buttons">
                <button
                  className="btn btn-light font-14"
                  onClick={handleLogIn}
                >
                  {logState}
                </button>
              </div>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
};

export default Header;

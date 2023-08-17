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
  NavLink,
} from "reactstrap";
import logo from "../../assets/images/logos/white-text.png";
// import { access } from "fs";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  const [logState, setLogState] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      setLogState("LogIn");
    } else {
      setLogState("LogOut");
    }
  }, []);

  // const handleLogOut = () => {
  //   router.push("/");
  //   localStorage.removeItem("ACCESS_TOKEN");
  //   setLogState("LogIn");
  // };

  const handleLogIn = () => {
    if(localStorage.getItem("ACCESS_TOKEN")){
      // router.push("/");
      window.location.href = "/";
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("MEMBER_ID");
      // setLogState("LogIn");
    } else{
      window.location.href = "/login";
      // router.push("/login");
      // setLogState("LogOut");
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
                <NavLink
                // href="/login"
                className="btn btn-light font-14 text-white"
                onClick={handleLogIn}
                >
                  {logState}
                </NavLink>
              </div>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </div>
  );
};

export default Header;

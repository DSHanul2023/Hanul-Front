import React, { useState } from "react";
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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
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
                    href="/basic"
                    className={
                      router.pathname == "/basic"
                        ? "text-white nav-link"
                        : "nav-link"
                    }
                  >
                    Basic
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
                  href="/login"
                  className="btn btn-light font-14 text-white"
                  target="_blank"
                >
                  Login
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

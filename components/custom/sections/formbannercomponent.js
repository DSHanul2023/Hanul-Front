import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form } from "reactstrap";
import Image from "next/image";
import { gsap } from "gsap/dist/gsap";
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

import siginupimage from "../../../assets/images/form-banners/banner1/siginupimage.jpg";
import { useRouter } from "next/router";
import Link from 'next/link';

const FormBannerComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const ACCESS_TOKEN = "ACCESS_TOKEN";
  const MEMBER_ID = "MEMBER_ID";
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://43.201.180.174:8080/members/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const memberId = data.id;
        console.log("Login successful");
        console.log("Token:", token);
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem(MEMBER_ID, memberId);
        // router.push("/chat"); // 로그인 후 채팅 페이지로 이동
        window.location.href = "/pet";
      } else {
        console.log("Invalid credentials");
        alert("아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const joinHandleClick = () => {
    router.push("/join");
  }
  const surveyHandleClick = () => {
    router.push("/survey");
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".img-fluid", {
      scrollTrigger: {
      trigger: ".img-fluid",
      toggleActions: "restart none reverse none",
      //markers: true,
      start: "top center"
    },
    rotation: 100, x: 300, duration: 1, opacity: 0});
  }, []);

  return (
    <div>
      <div className="bg-light">
        <section>
          <div id="banner1" className="banner spacer">
            <Container>
              <Row className="justify-content-center">
                <Col lg="7" md="7" className="align-self-center">
                  <h2 className="title text-darkbrown font-bold" style={{fontSize:"30px"}}>
                    고민 상담 AI 챗봇 기반<br/><br/>
                    이야기 치료법 제공 서비스
                  </h2>
                  
                  <Form className="m-t-40" onSubmit={handleLogin}>
                    
                    <div className="m-t-10">
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="font-14"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{width:"70%"}}
                      />
                    </div>
                    <div className="m-t-10">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="font-14"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <input
                        type="submit"
                        value="Login"
                        className="font-14 btn-rounded text-white text-center ml-2"
                      />
                    </div>
                  </Form>
                
                <div className="m-t-15 m-b-30 font-bold">
                <Link href="/join" style={{ color: "#645E4E", textDecoration: 'underline' }}>
                회원가입 후 서비스를 이용해 보세요
                </Link>
                <span style={{ margin: '0 10px', color: "#645E4E" }}>|</span>
                <Link href="/reset" style={{ color: "#645E4E", textDecoration: 'underline' }}>
                비밀번호 초기화
                </Link>
                </div>
                </Col>
                <Col lg="5" md="5" className="align-self-center ml-auto">
                  <Image
                    src={siginupimage}
                    alt="We are Digital Agency"
                    className="img-fluid"
                  />
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FormBannerComponent;

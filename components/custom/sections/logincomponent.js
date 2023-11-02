import React, { useState } from "react";
import { Row, Col, Container, Form } from "reactstrap";
import Image from "next/image";
import { useRouter } from "next/router";
const ACCESS_TOKEN = "ACCESS_TOKEN";
import Link from 'next/link';

const LoginComponent = () => {
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

  return (
    <div>
      <div className="bg-light">
        <section>
          <div id="login" className="login spacer">
            <Container>
              <Row className="justify-content-center align-items-center" style={{minHeight:500}}>
                <Col lg="7" md="10" className="align-self-center text-center">
                  {/* <p className="m-t-15 m-b-30">
                    로그인 후 서비스를 이용해 보세요
                  </p> */}
                  <h1 className="my-title font-bold m-4 text-center" style={{fontSize:"40px"}}>Log In</h1>
                  <Form onSubmit={handleLogin} style={{marginTop:"80px"}}>
                    <div>
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="font-14"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value="LogIn"
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
              </Row>
            </Container>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginComponent;

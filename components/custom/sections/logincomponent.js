import React, { useState } from "react";
import { Row, Col, Container, Form } from "reactstrap";
import { useRouter } from "next/router";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const ACCESS_TOKEN = "ACCESS_TOKEN";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/members/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        const memberId = data.memberId;
        localStorage.setItem(ACCESS_TOKEN, token);
        localStorage.setItem("MEMBER_ID", memberId);
        router.push("/chat"); // 로그인 후 채팅 페이지로 이동
      } else {
        console.log("Invalid credentials");
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
              <Row className="justify-content-center align-items-center">
                <Col lg="7" md="7" className="align-self-center text-center">
                  <p className="m-t-15 m-b-30">
                    로그인 후 서비스를 이용해 보세요
                  </p>
                  <Form className="m-t-40" onSubmit={handleLogin}>
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
                        value="Enter"
                        className="font-14 btn-rounded text-white text-center ml-2"
                      />
                    </div>
                  </Form>
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
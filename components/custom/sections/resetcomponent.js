import React, { useState } from "react";
import { Row, Col, Container, Form } from "reactstrap";
import { useRouter } from "next/router";

const ResetComponent = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleresetpassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/members/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        // 비밀번호 재설정 이메일이 성공적으로 보내진 경우
        alert("임시 비밀번호가 이메일로 전송되었습니다.");
        router.push("/login"); // 로그인 페이지로 이동
      } else {
        // 이메일이 잘못된 경우
        console.log("Invalid credentials");
        alert("이메일을 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.");
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
              <Row className="justify-content-center align-items-center" style={{ minHeight: 500 }}>
                <Col lg="7" md="10" className="align-self-center text-center">
                  <h1 className="my-title font-bold m-4 text-center" style={{ fontSize: "40px" }}>
                    Reset Password
                  </h1>
                  <Form onSubmit={handleresetpassword} style={{ marginTop: "80px" }}>
                    <div className="m-t-10">
                      <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        className="font-14"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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

export default ResetComponent;

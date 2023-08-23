import React, { useState } from "react";
import { Row, Col, Container, Form } from "reactstrap";
import { useRouter } from "next/router";

const JoinComponent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch("http://localhost:8080/members/register", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        if (response.ok) {
            console.log("Member registered successfully");
            router.push("/login"); // 회원가입 후 로그인 페이지로 이동
        } else {
            console.log("Failed to register member");
        }
        } catch (error) {
        console.error("Error:", error);
        }
    };
    const loginHandleClick = () => {
        router.push("/login");
    }
    return (
        <div>
        <div className="bg-light">
            <section>
            <div id="login" className="login spacer">
                <Container>
                <Row className="justify-content-center align-items-center">
                    <Col lg="7" md="7" className="align-self-center text-center">
                    <p className="m-t-15 m-b-30">
                        회원가입 후 서비스를 이용해 보세요
                    </p>
                    <Form className="m-t-40" onSubmit={handleRegister}>
                        <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="font-14"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        </div>
                        <div className="m-t-10">
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
                    <button className="m-t-10 font-14 text-white text-center">
                        이야기 치료법 체험해보기
                    </button>
                    <p className="m-t-15 m-b-30" onClick={loginHandleClick} style={{textDecoration:'underline'}}>
                    이미 회원이신가요? 로그인하기
                    </p>
                    </Col>
                </Row>
                </Container>
            </div>
            </section>
        </div>
        </div>
    );
    };

export default JoinComponent;

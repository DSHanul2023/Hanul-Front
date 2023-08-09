import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Input, Button, Image } from "reactstrap";
import Link from "next/link";

const ChatComponent = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      window.location.href = "/login";
    }
  }, []);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") {
      return;
    }
    const newMessage = {
      content: inputMessage,
      sender: "user",
    };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputMessage("");
    setShowChat(true);
    // Handle sending the message to Dialogflow or your chatbot backend
  };

  return (
    <div className="full-height">
      <div className="bg-light">
        <section>
          <div id="chat" className="banner spacer">
            <Container className="h-100">
              <Row>
                <Col md="6">
    
                  <div className="chat-div">
                    안녕하세요! 저는 We:Lover에요. <br />
                    저한테 고민을 얘기해주세요!
                  </div>
                  <p className="timestamp">12:00PM | 3월 28일</p>
                </Col>
              </Row>

              <Row className="mt-4">
                <Col md="6"></Col>
                <Col md="6">
                  <div className="user-div">
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <p className="timestamp2">12:07PM | 3월 28일</p>
                </Col>

              </Row>

              <Row className="mt-4">
                <Col md="6">
                  <div className="chat-div">
                    그런 일이 있으셨군요. 제가 도움이 될 만한 책과 영화를 추천해드릴게요. 
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button className="treat-div">
                    이야기 치료법 보러가기
                    </Button>
                  </div>
                  <p className="timestamp">12:13PM | 3월 28일</p>
                </Col>
              </Row>

              {showChat && (
                <Row className="mt-4">
                  <Col md="6"></Col>
                  <Col md="6">
                    <div className="test-div">
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`message ${
                            message.sender === "user" ? "user-message" : "bot-message"
                          }`}
                        >
                          {message.content}
                        </div>
                      ))}
                      {inputMessage && (
                        <div className="message user-message">{inputMessage}</div>
                      )}
                    </div>
                  </Col>
                </Row>
              )}

              <Row className="mt-4 justify-content-between">
                <Col className="col-10">
                  <Form onSubmit={handleMessageSubmit} className="w-100">
                    <Input
                      type="text"
                      name="message"
                      placeholder="메시지를 입력하세요"
                      value={inputMessage}
                      className="font-14 chat-input"
                      onChange={(e) => setInputMessage(e.target.value)}
                    />
                  </Form>
                </Col>
                <Col className="col-2">
                  <Button
                    type="submit"
                    color="primary"
                    className="font-14 btn-rounded text-white text-center"
                    onClick={handleMessageSubmit}
                    style={{ height: "100%" }}
                  >
                    보내기
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChatComponent;

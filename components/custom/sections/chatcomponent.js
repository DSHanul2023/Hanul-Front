import React, { useState } from "react";
import { Row, Col, Container, Form, Input, Button } from "reactstrap";
import UserChatComponent from "./UserChatComponent";
import BotChatComponent from "./BotChatComponent";

const ChatComponent = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") {
      return;
    }
    const newUserMessage = {
      content: inputMessage,
      sender: "user",
    };
    setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);

    const newBotMessage = {
      content: "안녕하세요! 저는 We:Lover에요. 저한테 고민을 얘기해주세요!",
      sender: "bot",
    };
    setChatMessages((prevMessages) => [...prevMessages, newBotMessage]);

    setInputMessage("");
    setShowChat(true);
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

              {/* 사용자 및 봇 메시지 출력 */}
              {showChat && (
                <Row className="mt-4">
                  <Col md="6"></Col>
                  <Col md="6">
                    <BotChatComponent messages={chatMessages} />
                    {inputMessage && <UserChatComponent message={inputMessage} />}
                  </Col>
                </Row>
              )}

              {/* 메시지 입력 및 전송 버튼 */}
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
                    className="font-14 btn-rounded text-white text-center chat-input-btn"
                    onClick={handleMessageSubmit}
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

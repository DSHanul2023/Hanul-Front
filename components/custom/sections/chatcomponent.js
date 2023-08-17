import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Input, Button } from "reactstrap";
import UserChatComponent from "./UserChatComponent";
import BotChatComponent from "./BotChatComponent";
import { useRouter } from "next/router";

const ChatComponent = () => {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      router.push("/login");
    }
  }, []);

  const handleMessageSubmit = async (e) => {
    const memberId = localStorage.getItem("MEMBER_ID");

    e.preventDefault();
    if (inputMessage.trim() === "") {
      return;
    }
  
    const newUserMessage = {
      content: inputMessage,
      sender: "user",
    };
  
    setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");
  
    try {
      const response = await fetch("http://localhost:8080/chats/chatdialogflow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberId, message: inputMessage }),
      });
    
      if (response.ok) {
        const responseData = await response.json();
        const botResponse = {
          sender: "bot",
          content: responseData.message,
        };
        setChatMessages((prevMessages) => [...prevMessages, botResponse]);
        setShowChat(true);
      } else {
        console.log("메시지 전송 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    }
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

              {showChat && (
                <Row className="mt-4">
                  <Col md="6"></Col>
                  <Col md="6">
                    <BotChatComponent messages={chatMessages} />
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

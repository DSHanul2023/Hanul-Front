import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Container, Form, Input, Button } from "reactstrap";
import BotChatComponent from "./botchatcomponent";
import { useRouter } from "next/router";
import Image from "next/image";
import { petprofiles,petlist } from "./petImages";
const ChatComponent = () => {
  const router = useRouter();
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [timestamp, setTimestamp] = useState(""); 
  const [showLoading, setShowLoading] = useState(false);
  const [petNum,setPetNum] = useState(0);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      router.push("/login");
    }
    const PetNum = localStorage.getItem("PET_NUM");
    setPetNum(PetNum);
    if(!PetNum){
      setPetNum(0);
    }
    const initialTimestamp = getCurrentTime(); 
    setTimestamp(initialTimestamp);
  }, []);

  useEffect(() => {
    console.log(chatBoxRef)
    scrollToBottom();
  }, [chatMessages]);

  const handleMessageSubmit = async (e) => {
    const memberId = localStorage.getItem("MEMBER_ID");

    e.preventDefault();
    if (inputMessage.trim() === "") {
      return;
    }
  
    const newUserMessage = {
      content: inputMessage,
      sender: "user",
      time: new Date(),
    };
  
    setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");
    setShowLoading(true);
  
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
          time: responseData.timestamp,
          recommend_status: responseData.recommend_status,
        };
        setChatMessages((prevMessages) => [...prevMessages, botResponse]);
        setShowChat(true);
      } else {
        console.log("메시지 전송 실패");
      }
    } catch (error) {
      console.error("오류:", error);
    } finally {
      setShowLoading(false); // 로딩이 끝났을 때
      scrollToBottom(); // 스크롤을 맨 아래로 이동
    }
  };
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return ` ${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm} `;
  };
  const scrollToBottom = () => {
    chatBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: "end", inline: 'nearest'});
  };

  return (
    <div className="full-height" style={{minHeight:"470px"}}>
      <div style={{display:'flex',justifyContent:'center',backgroundColor:'#F9F4E8'}}>
        <section style={{width:'50%'}}>
          <div id="chat" className="banner spacer" style={{paddingBottom:"80px", maxHeight:"100vh", paddingTop:"40px"}}>
            <Container className="chat-box">
              <Row>
                <div className="chatimgdiv" style={{marginLeft:'15px'}}>
                  <Image
                        src={petprofiles[petNum]}
                        alt="img"
                        className="img-circle mr-2"
                        width={55}
                      />
                  </div>
                <Col md="6" style={{paddingLeft:'0px',display: 'flex'}}>
                  <div className="chat-div">
                    안녕하세요! 저는 We:Lover의 {petlist[petNum]}에요. <br />
                    저한테 고민을 얘기해주세요!
                  </div>
                  <p className="timestamp mb-0" style={{marginTop:'auto',minWidth:'60px'}}>
                    {timestamp}
                  </p>             
                </Col>
              </Row>
                <Row>
                  <Col md="12" style={{paddingRight:'6%'}}> 
                    <BotChatComponent messages={chatMessages} loading={showLoading}/>
                  </Col>
                </Row>
                {showLoading && (
                  <Row className="ml-1">
                  <div className="chatimgdiv">
                  <Image
                        src={petprofiles[petNum]}
                        alt="img"
                        className="img-circle mr-2"
                        width={55}
                      /></div>
                    <Col md="6" style={{paddingLeft:'0px',display: 'flex'}}>
                      <div className="message bot-message">
                        입력중. . .
                      </div>           
                    </Col>
                  </Row>
                )}
                <div ref={chatBoxRef}></div>
            </Container>
            <Container className="chat-input-box" style={{ position: "absolute", bottom: 0, width: "100%", marginBottom: "40px"}}>
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
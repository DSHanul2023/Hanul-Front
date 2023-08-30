import React, { useState, useEffect } from "react";
import Image from "next/image";
import default_profile from "../../../public/profile/default_profile.png";
import { Button } from "reactstrap";
const BotChatComponent = ({ messages }) => {
  const [profilePictureName, setProfilePictureName] = useState("");
  const [timestamps, setTimestamps] = useState([]);

  const fetchMemberInfo = async (token) => {
    // ... 이전 fetchMemberInfo의 코드 ...
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      router.push("/login");
    } else {
      fetchMemberInfo(accessToken);
    }
  }, []);

  useEffect(() => {
    setTimestamps(messages.map(() => getCurrentTime()));
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes}${ampm}`;
  };
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  };
  return (
    <div className="mt-4">
      {messages.map((message, index) => (
        <div
          className={`message-container ${message.sender}-message-container mb-4`}
          key={index}
        >
          {message.sender === 'bot' ? (
            <>
              <div>
                <Image
                  src={default_profile}
                  alt="img"
                  className="img-circle mr-2"
                  width={43}
                  height={43}
                />           
              </div>
              <div className={`message ${message.sender}-message`}>{message.content}
                {message.recommend_status &&(
                  <div className="recommendBtn mt-3"  style={{ display: "flex", justifyContent: "center" }}>
                    <Button>추천 영화 보기</Button>
                  </div>
                )}
              </div>      
              <p className="timestamp ml-2 mb-0" style={{marginTop:'auto'}}>{formatTime(message.time)}</p>
            </>
          ) : (
            <>
              <p className={`timestamp ${message.sender}-timestamp mr-2 mb-0`} style={{ marginTop: 'auto'}}>
                {formatTime(message.time)}
              </p>            
              <div className={`message ${message.sender}-message`}>{message.content}</div>      
            </>
          )}
        </div>
      ))}
    </div>
  );
};
export default BotChatComponent;
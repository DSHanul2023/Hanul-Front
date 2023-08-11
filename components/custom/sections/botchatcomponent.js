import React from "react";

const BotChatComponent = ({ messages }) => {
  return (
    <div className="test-div">
      {messages.map((message, index) => (
        <div key={index} className="message-container bot-message-container">
          <div className={`message bot-message`}>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BotChatComponent;

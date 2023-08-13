import React from "react";

const BotChatComponent = ({ messages }) => {
  return (
    <div className="mt-4">
      {messages.map((message, index) => (
        <div
          className={`message-container ${message.sender}-message-container`}
          key={index}
        >
          <div className={`message ${message.sender}-message`}>{message.content}</div>
        </div>
      ))}
    </div>
  );
};

export default BotChatComponent;
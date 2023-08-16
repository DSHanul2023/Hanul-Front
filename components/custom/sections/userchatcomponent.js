import React from "react";

const UserChatComponent = ({ message }) => {
  return (
    <div className="message-container user-message-container">
      <div className="message user-message bubble">{message}</div>
    </div>
  );
};

export default UserChatComponent;
const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={`message ${isCurrentUser ? "current-user" : "other-user"}`}>
      <div className="message-sender">{message.sender}</div>
      <div className="message-text">{message.text}</div>
      <div className="message-time">
        {new Date(message.timestamp).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Message;

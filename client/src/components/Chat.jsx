import { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import Message from "./Message";

const Chat = ({ user, room, leaveRoom }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useContext(SocketContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Get chat history when joining a room
    socket.emit("get_history", room);

    // Set up event listeners
    socket.on("chat_history", (history) => {
      setMessages(history);
    });

    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("message_sent", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("chat_history");
      socket.off("receive_message");
      socket.off("message_sent");
    };
  }, [room, socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit("send_message", {
        room,
        text: newMessage,
        sender: user,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Room: {room}</h3>
        <button onClick={leaveRoom}>Leave Room</button>
      </div>
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            isCurrentUser={message.sender === user}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;

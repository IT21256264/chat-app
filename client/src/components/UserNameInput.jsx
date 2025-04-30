import { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const UserNameInput = ({ setUser }) => {
  const [name, setName] = useState("");
  const socket = useContext(SocketContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setUser(name);
      socket.emit("set_username", name);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="username-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
      />
      <button type="submit">Join Chat</button>
    </form>
  );
};

export default UserNameInput;

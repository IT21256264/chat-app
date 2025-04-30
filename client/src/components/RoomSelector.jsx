import { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const RoomSelector = ({ user, setRoom }) => {
  const [roomInput, setRoomInput] = useState("");
  const socket = useContext(SocketContext);

  const handleJoinRoom = (room) => {
    if (room.trim()) {
      socket.emit("join_room", room);
      setRoom(room);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleJoinRoom(roomInput);
  };

  return (
    <div className="room-selector">
      <h2>Welcome, {user}!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          placeholder="Enter room name"
          required
        />
        <button type="submit">Join Room</button>
      </form>
      <div className="quick-rooms">
        <p>Or try one of these:</p>
        <button onClick={() => handleJoinRoom("general")}>General</button>
        <button onClick={() => handleJoinRoom("random")}>Random</button>
        <button onClick={() => handleJoinRoom("tech")}>Tech</button>
      </div>
    </div>
  );
};

export default RoomSelector;

import { useState } from "react";
import UserNameInput from "./components/UserNameInput";
import RoomSelector from "./components/RoomSelector";
import Chat from "./components/Chat";
import "./App.css";

function App() {
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  const leaveRoom = () => {
    setRoom("");
  };

  return (
    <div className="app">
      {!user ? (
        <UserNameInput setUser={setUser} />
      ) : !room ? (
        <RoomSelector user={user} setRoom={setRoom} />
      ) : (
        <Chat user={user} room={room} leaveRoom={leaveRoom} />
      )}
    </div>
  );
}

export default App;

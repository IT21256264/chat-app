import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { SocketContext, socket } from "./context/SocketContext";

// Find your root element
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Render your app
root.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </React.StrictMode>
);

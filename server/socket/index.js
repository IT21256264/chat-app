const Message = require("../models/Message");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    // Join a room
    socket.on("join_room", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
    });

    // Leave a room
    socket.on("leave_room", (room) => {
      socket.leave(room);
      console.log(`User ${socket.id} left room ${room}`);
    });

    // Send and save message
    socket.on("send_message", async (data) => {
      try {
        const { room, text, sender } = data;

        // Save message to database
        const message = new Message({ text, sender, room });
        await message.save();

        // Emit to all in the room except sender
        socket.to(room).emit("receive_message", message);

        // Emit to sender for confirmation
        socket.emit("message_sent", message);
      } catch (err) {
        console.error("Error saving message:", err);
        socket.emit("message_error", "Failed to send message");
      }
    });

    // Get chat history
    socket.on("get_history", async (room) => {
      try {
        const messages = await Message.find({ room })
          .sort({ timestamp: 1 })
          .limit(50);
        socket.emit("chat_history", messages);
      } catch (err) {
        console.error("Error fetching history:", err);
        socket.emit("history_error", "Failed to load chat history");
      }
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

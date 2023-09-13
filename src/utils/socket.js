import { Server } from "socket.io";

const setupSockets = (httpServer) => {
  const io = new Server(httpServer);
  const messages = [];

  io.on("connection", (socket) => {
    console.log("New client connected");
    io.emit("messageLogs", messages);
    socket.broadcast.emit("messageConected", "Un nuevo usuario se ha conectado");

    socket.on("message", (data) => {
      messages.push(data);
      io.emit("messageLogs", messages);
    });
  });
};

export default setupSockets;

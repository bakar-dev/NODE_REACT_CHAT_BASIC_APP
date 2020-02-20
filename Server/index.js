const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", socket => {
  console.log("New User connected..!!!");

  socket.on("join", ({ name, room }) => {
    console.log(name, room);
  });

  socket.on("disconnet", () => {
    console.log("User disconnected...");
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));

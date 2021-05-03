//LOAD ENV VARS
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
require("./config/db");
require("colors");

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 8081;
const index = require("./routes/index");

app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("Transactions", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));

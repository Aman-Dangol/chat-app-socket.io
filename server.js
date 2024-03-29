const http = require("http");
const fs = require("fs");
const { Server } = require("socket.io");
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.setHeader("content-type", "text/html");
    let data = fs.readFileSync("./index.html");
    res.write(data);
    res.end();
  } else if (req.url == "/styles/styles.css") {
    res.setHeader("content-type", "text/CSS");
    let data = fs.readFileSync("./styles/styles.css");
    res.write(data);
    res.end();
  } else if (req.url == "/client.js") {
    res.setHeader("content-type", "text/javascript");
    res.statusCode = 200;
    fs.readFile("./client.js", (err, data) => {
      if (err) {
        res.end("file not found");
        return;
      }
      res.end(data);
    });
  }
});

server.listen(3000);

const io = new Server(server);

// when a socket connects to a the server
io.on("connection", (socket) => {
  console.log("user connected");
  // when the socket disconnects
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  // when a message is sent
  socket.on("chat-message", (message) => {
    // io.emit("receive-message",message);
    if (message.room == "") {
      socket.broadcast.emit("receive-message", message);
      return;
    }
    socket.to(message.room).emit("receive-message", message);
  });
  // joining a room
  socket.on("join-room", (room) => {
    console.log(room);
    socket.join(room.value);
    socket.to(room.value).emit("joined-room", room);
  });
});

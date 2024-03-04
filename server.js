const http = require("http");
const fs = require("fs");
const path = require("path");
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
  }
});

server.listen(3000);



const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection',(socket)=>{
  console.log("user connected");
})

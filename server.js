const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.setHeader("content-type", "text/html");
    let data = fs.readFileSync("./index.html");
    res.write(data);
    res.end();
  }
  if (req.url == "/styles/styless.css") {
    res.setHeader("content-type", "text/CSS");
    let data = fs.readFileSync("./styles/styless.css");
    res.write(data);
    res.end();
  }
});

server.listen(3000);

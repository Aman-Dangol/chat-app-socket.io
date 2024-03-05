import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

let userName = prompt("enter you name");
console.log(userName);
const socket = io();

let form = document.getElementById("form");
let textbox = document.getElementById("textBox");
let chatbody = document.getElementById("chat-body");
let roomForm = document.getElementById("roomForm");
let roomInput = document.getElementById("room");
let roomValue = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (textbox.value) {
    let messagebody = document.createElement("div");
    messagebody.className = "you text-format";
    messagebody.innerHTML = `<span>you</span><span>${textbox.value}</span>`;
    chatbody.appendChild(messagebody);
    socket.emit("chat-message", {
      sender: userName,
      message: textbox.value,
      room: roomValue,
    });
    textbox.value = "";
  }
});

socket.on("receive-message", (msg) => {
  console.log(msg);
  let messagebody = document.createElement("div");
  messagebody.className = "others text-format";
  messagebody.innerHTML = `<span>${msg.sender}</span><span>${msg.message}</span>`;
  chatbody.appendChild(messagebody);
  chatbody.scrollTo(0, chatbody.scrollHeight);
});

// room form

roomForm.addEventListener("submit", (e) => {
  e.preventDefault();
  roomValue = roomInput.value;
  socket.emit("join-room", roomValue);
});

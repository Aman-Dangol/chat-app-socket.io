import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

let userName = "";
const socket = io();

let form = document.getElementById("form");
let textbox = document.getElementById("textBox");
let chatbody = document.getElementById("chat-body");
let roomForm = document.getElementById("roomForm");
let roomInput = document.getElementById("room");
let name_display = document.getElementById("name-display");
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
  chatbody.scrollTo(0, chatbody.scrollHeight);
});

socket.on("receive-message", (msg) => {
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
  socket.emit("join-room", {
    value: roomValue,
    name: userName,
  });
  displayRoom(roomValue);
});

function getUserName() {
  userName = prompt("enter you name");
  if (/^\s*$/.test(userName)) {
    console.log("username");
    userName = "stranger";
  } else {
    console.log("regext false");
  }
  name_display.innerHTML = `User-name: ${userName}`;
}

function displayRoom(roomValue) {
  let joinedNotify = document.createElement("div");
  joinedNotify.id = "room-info";
  if (roomValue == "") {
    joinedNotify.innerHTML = `You've joined global chat`;
    socket.emit("join-room", {
      name: userName,
      value: "global",
    });
  } else joinedNotify.innerHTML = `You've joined ${roomValue} chat`;
  chatbody.appendChild(joinedNotify);
  chatbody.scrollTo(0, chatbody.scrollHeight);
}

socket.on("joined-room", (room) => {
  let div = document.createElement("div");
  console.log(room);
  div.className = "notify";
  if (!room.value) {
    room.value = "Global chat";
  }
  div.innerHTML = `${room.name} has joined the ${room.value} chat`;
  chatbody.appendChild(div);
});
getUserName();
displayRoom("");

const socket = io("/");
const messageForm = document.getElementById("send-container");
const messageContainer = document.getElementById("messages");
const roomContainer = document.getElementById("room-container");
const messageInput = document.getElementById("message-input");
const user_status = document.getElementById("users");

const my_message = function (message) {
  let currentDate = new Date();
  let time = (currentDate.getHours() % 12) + ":" + currentDate.getMinutes();
  const messageElement = document.createElement("div");
  messageElement.classList.add("my");
  messageElement.innerHTML = `<div class="msg_details">
  <div class="sent_by">You<span class="tab"></span>${time}</div>
  <div class="sent_msg">${message}</div>
</div>`;
  messageContainer.append(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
};

const others_message = function (name, message) {
  let currentDate = new Date();
  let time = (currentDate.getHours() % 12) + ":" + currentDate.getMinutes();
  const messageElement = document.createElement("div");
  messageElement.classList.add("other");
  messageElement.innerHTML = `<div class="msg_details">
    <div class="sent_by">${name}<span class="tab"></span>${time}</div>
    <div class="sent_msg">${message}</div>
  </div>`;
  messageContainer.append(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;
};

const user_connected = function (message) {
  const userElement = document.createElement("div");
  userElement.classList.add("connected");
  userElement.innerHTML = message;
  user_status.append(userElement);
  user_status.scrollTop = user_status.scrollHeight;
};
const user_disconnected = function (message) {
  const userElement = document.createElement("div");
  userElement.classList.add("disconnected");
  userElement.innerHTML = message;
  user_status.append(userElement);
  user_status.scrollTop = user_status.scrollHeight;
};

if (messageForm != null) {
  const name = prompt("Enter you name.....");
  user_connected("You are connected !");
  socket.emit("new-user", roomName, name);

  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message != "") {
      my_message(message);
      socket.emit("send-chat-message", roomName, message);
    }
    messageInput.value = "";
  });
}

socket.on("room-created", (room) => {
  const roomElement = document.createElement("div");
  roomElement.classList.add("room-name");
  roomElement.innerHTML = ` <div class="name">${room}</div>
  <div><a href="/${room}" class="join">Join</a></div>`;
  roomContainer.append(roomElement);
});

socket.on("chat-message", (data) => {
  others_message(data.name, data.message);
}); // chat-message is the event name which we had given in the server.js file

socket.on("user-connected", (name) => {
  user_connected(`${name} connected !`);
});

socket.on("user-disconnected", (name) => {
  user_disconnected(`${name} disconnected !`);
});

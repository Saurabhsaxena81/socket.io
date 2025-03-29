# 📡 Socket.IO Chat Application

A real-time chat application built using **Socket.IO**, **Express**, and **React**. This project enables users to join chat rooms, send messages, and communicate in real time.

## 📌 Features
- JWT authentication with cookies
- Real-time messaging using **Socket.IO**
- Room-based chat system
- React frontend with Material-UI
- Express.js backend with CORS support

## 🛠 Tech Stack
- **Frontend:** React.js, Material-UI, Socket.IO Client
- **Backend:** Node.js, Express, Socket.IO Server
- **Authentication:** JWT, Cookies

---

## 🖼 Architecture Diagram

```
+------------+        WebSocket        +------------+
|  Client 1  | <--------------------> |  Server    |
+------------+                        +------------+
        |                                     |
        |                                     |
        v                                     v
+------------+                        +------------+
|  Client 2  | <--------------------> |  Database  |
+------------+                        +------------+
```

This architecture represents:
- Clients (React frontend) connecting to the server using WebSockets.
- The server handling multiple clients and relaying messages.
- Optional database integration for storing messages and user sessions.

---

## 🚀 Getting Started

### 1️⃣ Backend Setup
```sh
# Clone the repository
git clone https://github.com/yourusername/socketio-chat.git
cd socketio-chat/server

# Install dependencies
npm install

# Run the server
node index.js
```

### 2️⃣ Frontend Setup
```sh
cd ../client

# Install dependencies
npm install

# Start the React app
npm start
```

---

## 🔌 API Endpoints

| Method | Route   | Description        |
|--------|--------|--------------------|
| GET    | `/`    | Test route         |
| GET    | `/login` | Generates a JWT token |

---

## 📡 WebSocket Events

| Event Name       | Description                |
|-----------------|----------------------------|
| `connect`       | Fires when a user connects |
| `message`       | Sends a message            |
| `join-room`     | Joins a chat room          |
| `receive-message` | Receives a message       |

---

## 🎯 ER Diagram

```
+------------+       +------------+
|   Users    |<----->|   Rooms    |
+------------+       +------------+
        |
        |
        v
+------------+
|  Messages  |
+------------+
```

This ER diagram represents:
- Users joining chat rooms.
- Messages being linked to both users and rooms.

---

## 🔍 Understanding Socket.IO

### What is Socket.IO?
Socket.IO is a JavaScript library that enables **real-time, bidirectional, and event-driven communication** between web clients and servers. It is built on top of WebSockets and includes fallbacks for older browsers that do not support WebSockets.

### Key Features
- **Bidirectional communication**: Messages can be sent and received in real-time.
- **Automatic reconnection**: Clients automatically attempt to reconnect if disconnected.
- **Room-based messaging**: Users can join specific rooms for group communication.
- **Supports multiple transports**: WebSockets, AJAX long polling, etc.
- **Binary data transfer**: Supports sending files and media.

### How Socket.IO Works
1. A **client** (React frontend) establishes a connection to the **server** (Node.js backend) via WebSockets.
2. The server and client **exchange events** using an event-based system.
3. Users can **join rooms** and send messages to specific rooms.
4. The server **broadcasts messages** to all users in a room.
5. When a user disconnects, the server handles the event accordingly.

### Basic Socket.IO Example
#### Server-Side (Node.js)
```js
const io = require("socket.io")(3000, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("message", msg); // Broadcast to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});
```

#### Client-Side (React.js)
```js
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3000");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Chat;
```

### Use Cases of Socket.IO
- **Chat applications** (WhatsApp, Messenger)
- **Live notifications** (e.g., real-time stock price updates)
- **Online gaming** (e.g., multiplayer games with real-time interactions)
- **Collaborative tools** (Google Docs, whiteboards)
- **Live tracking systems** (GPS, delivery tracking)

---



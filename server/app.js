import express from "express";
const app = express();
import { Server } from "socket.io";
import { createServer } from "http";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const PORT = 3000;
import cors from "cors";
import { log } from "console";
const server = new createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// app.use(cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
// }));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  const token = jwt.sign({ _id: "1234" }, "secretkey");
  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({ message: "Login Success" });
});

io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, (err) => {
    if (err) return next(err);
    const token = socket.request.cookies.token;
    if (!token) return next(new Error("Authentication error"));
    const decode = jwt.verify(token, "secretkey");
    next();
  });
});

/**
 * here socket means individual socket
 */
io.on("connection", (socket) => {
  console.log("User connected:", socket.id); // Log the socket ID of the connected user

  socket.on("message", ({ room, message }) => {
    console.log({ room, message });
    io.to(room).emit("receive-message", message);
  });

  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User ${room} joined `);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import { useEffect, useState, useMemo } from "react";
import { io } from "socket.io-client";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
const App = () => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );
  // const socket = io("http://localhost:3000");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketID] = useState("");
  const [roomName, setRoomName] = useState("");
  console.log(messages);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketID(socket.id); // Set the socket ID when connected
      console.log("Connected to server:", socket.id); // Log the socket ID of the connected user
    });
    // socket.on("receive-message", (data) => {
    //   console.log(data); // Log the received message from the server
    //   setMessages(() => [...messages, data]);
    // });
    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (message) => {
      console.log(message); // Log the welcome message from the server
    });
    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, []);

  const joinRoomHandler = (e)=>{
    e.preventDefault();
    socket.emit("join-room" , roomName);
    setRoomName("")
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.elements[0].value;
    socket.emit("message", { message, room }); // Emit the message to the server
    // console.log(message);
    setMessage(""); // Clear the input field after sending the message
    setRoom("");
  };
  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Typography variant="h6" component="div" gutterBottom>
        {socketID}
      </Typography>
      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />

        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send Message
        </Button>
      </form>
      <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  );
};

export default App;

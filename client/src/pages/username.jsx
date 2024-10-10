import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { SocketContext } from "../contexts/appSocket";

export default function Username() {
  const [username, setUsername] = useState("");
  const socket = useContext(SocketContext);
  // console.log(socket, "Ini Socket");

  const greet = () => {
    socket.emit("Greet");

    socket.on("Hi", (data) => {
      console.log("Greetings", data);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: `Connect success in socket ${data.socketId}`,
      });
    });
  };
  const navigate = useNavigate();

  const addUsername = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setUsername("");
    navigate("/home");
  };

  return (
    <>
      <h1>Welcome to Socket.IO Testing</h1>
      <button onClick={greet}>Check SocketId</button>
      <form onSubmit={addUsername}>
        <h3 htmlFor="username">Input your username here:</h3>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

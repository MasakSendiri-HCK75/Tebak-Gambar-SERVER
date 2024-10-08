import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
const socket = io("http://localhost:3000");

export default function Username() {
  const [username, setUsername] = useState("");
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
        title: `Connect success in socket ${data.socketId}`
      });
    });

  };
  const navigate = useNavigate();

  const addUsername = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    setUsername("");

    //mengeset leaderboard
    const player = localStorage.getItem("username");
    const score = 100;
    socket.emit("createLeaderBoard", { player, score });

    navigate("/home");
  };

  //   useEffect(() => {
  //     socket.on("Greetings", (data) => {
  //       console.log("Greetings", data);
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: "top-end",
  //         showConfirmButton: false,
  //         timer: 2000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.onmouseenter = Swal.stopTimer;
  //           toast.onmouseleave = Swal.resumeTimer;
  //         },
  //       });
  //       Toast.fire({
  //         icon: "success",
  //         title: data.message,
  //       });
  //     });

  //     socket.on("Hi", (message) => {
  //       const Toast = Swal.mixin({
  //         toast: true,
  //         position: "top-end",
  //         showConfirmButton: false,
  //         timer: 2000,
  //         timerProgressBar: true,
  //         didOpen: (toast) => {
  //           toast.onmouseenter = Swal.stopTimer;
  //           toast.onmouseleave = Swal.resumeTimer;
  //         },
  //       });
  //       Toast.fire({
  //         icon: "success",
  //         title: message.message,
  //       });
  //     });
  //   }, []);

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

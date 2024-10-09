import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../contexts/appSocket";

export default function Home() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  console.log(socket.id, "Ini Socket");

  let [data, setData] = useState([]); // data room
  let [leader, setLeader] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  useEffect(() => {
    socket.emit("username", localStorage.getItem("username"));
    socket.on("Greetings with username", (data) => {
      //   console.log(data.rooms, "ini socket");
      setData(data.rooms);
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
        title: data.message,
      });
    });

    socket.on("showLeaderBoard:broadcast", (leaderBoard) => {
      setLeader(leaderBoard);
    });
  }, [leader]);

  //   console.log(data, "ini useState");

  return (
    <>
      {/* <h1>LeaderBoard</h1> */}
      {data.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        data.map((room, index) => {
          return (
            <div key={index}>
              <button>{room}</button>
            </div>
          );
        })
      )}

      <button onClick={handleLogout}>Logout</button>

      <h1>Leader Board</h1>
      {leader.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        leader.map((user, index) => {
          return (
            <div key={index}>
              <label>
                <b>Player : </b>
                {user.player},{" "}
              </label>
              <label>
                <b>Score : </b>
                {user.score},{" "}
              </label>
              <label>
                <b>Time : </b>
                {user.createdAt}{" "}
              </label>
            </div>
          );
        })
      )}
    </>
  );
}

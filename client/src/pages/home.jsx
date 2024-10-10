import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { SocketContext } from "../contexts/appSocket";
import Leader from "./leader";

export default function Home() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  // console.log(socket.id, "Ini Socket");

  let [data, setData] = useState([]); // data room
  let [leader, setLeader] = useState([]);

  console.log(leader, "ini leader===== III");
  
  const handleRoom = () => {
    socket.emit("GameStart");
    // navigate("/room");
  };

  const handleLogout = () => {
    socket.emit("removeUserFromRoom", socket.id);
    localStorage.removeItem("username");
    localStorage.removeItem("score");

    navigate("/");
  };

  useEffect(() => {
    socket.on("StartTheGame", () => {
      let timerInterval;
      Swal.fire({
        title: "Game will start in",
        html: "<b></b> milliseconds.",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
          navigate("/room");
        },
      });
    });

    socket.on("showLeaderBoard:broadcast", (leaderBoard) => {
      console.log(leaderBoard, "ini leaderboard ==== II");
      
      setLeader(leaderBoard);
    });

    // *Saat User baru masuk ke room
    socket.emit("username", localStorage.getItem("username"));
    socket.on("Greetings with username", (data) => {
      console.log(data, "ini socket");
      setData(data.users);
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

    socket.on("UsersRemaining", (users) => {
      setData(users);
    });

  }, [])

  console.log(leader, "===== ini leader");
  
  return (
    <>
      <div>
        <Link className="btn bg-sky-800" onClick={handleRoom}>
          Start the Game
        </Link>
      </div>

      <button className="btn bg-red-700" onClick={handleLogout}>
        Logout
      </button>
      {data.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((user, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{user.username}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

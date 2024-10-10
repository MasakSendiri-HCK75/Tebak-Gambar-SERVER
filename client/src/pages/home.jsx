import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { SocketContext } from "../contexts/appSocket";

export default function Home() {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  // console.log(socket.id, "Ini Socket");

  let [data, setData] = useState([]); // data room
  let [leader, setLeader] = useState([]);

  const handleRoom = () => {

    navigate("/room");
  };

  const handleLogout = () => {
    socket.emit("removeUserFromRoom", socket.id);

    navigate("/");
  };

  useEffect(() => {
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

    socket.on("showLeaderBoard:broadcast", (leaderBoard) => {
      setLeader(leaderBoard);
    });


    //   console.log(data, "ini useState");

  }, [])

  return (
    <>
      <div>
        <Link className="btn bg-green-100" onClick={handleRoom} >Waiting Room</Link>
      </div>

      <button onClick={handleLogout}>Logout</button>

      {/* <h1>Leader Board</h1>
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
        }) */}
        
      {/* <h1>LeaderBoard</h1> */}


      <h1>Leader Board</h1>
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

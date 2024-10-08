import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Swal from "sweetalert2";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
const socket = io("http://localhost:3000");
function App() {
  let [username, setUsername] = useState("");
  let [rooms, setRooms] = useState([]);

  return (
    <>
      {/* 
      
      <br />
      <br />
      <br />
      */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;

import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import PropTypes from "prop-types";
// const socket = io("http://localhost:3000");

export const SocketContext = createContext({
  socket: null,
});

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:3000"));
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

SocketProvider.propTypes = {
  children: PropTypes.node,
};

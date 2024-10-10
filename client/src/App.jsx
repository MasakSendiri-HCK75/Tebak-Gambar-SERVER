import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SocketProvider } from "./contexts/appSocket";
// const socket = io("http://localhost:3000");
function App() {
  return (
    <>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </>
  );
}

export default App;

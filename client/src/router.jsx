import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/rootLayout";
import Username from "./pages/username";
import Home from "./pages/home";
import Room from "./pages/Room";
import Leader from "./pages/leader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Username />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "room",
        element: <Room/>
      },
      {
        path: "leader",
        element: <Leader />,
      }
    ],
  },
]);

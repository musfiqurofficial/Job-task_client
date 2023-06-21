import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Error from "./Error";
import MainLayout from "./layout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

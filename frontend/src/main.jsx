import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Recommendation from "./pages/Recommendation.jsx";
import History from "./pages/History.jsx";
import NotFound from "./pages/NotFound.jsx";
import "./styles.css";

// Router configuration stays outside React rendering so route definitions are stable.
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "recommendation",
        element: <Recommendation />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

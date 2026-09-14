import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router";

import App from "../App";
import Browse from "../pages/Browse";
import Rating from "../pages/Rating";
import History from "../pages/History";
import Upload from "../pages/Upload";
import Video from "../pages/Video";
import Profile from "../pages/Profile";
import FeedBack from "../pages/FeedBack";
import Dashboard from "../pages/Dashboard";

import AuthRoute from "./AuthRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";

const PageRoutes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthRoute />,
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },

    {
      path: "/main",
      element: <ProtectedRoute />,
      children: [
        {
          path: "",
          element: <App />,
          children: [
            {
              index: true,
              element: <Navigate to="browse" />,
            },

            {
              path: "browse",
              element: <Browse />,
            },

            {
              path: "history",
              element: <History />,
            },

            {
              path: "rating",
              element: <Rating />,
            },

            {
              path: "upload",
              element: <Upload />,
            },

            {
              path: "profile",
              element: <Profile />,
            },

            {
              path: "feedback",
              element: <FeedBack />,
            },

            {
              path: "dashboard",
              element: <Dashboard />,
            },

            {
              path: "video/:id",
              element: <Video />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default PageRoutes;


import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import HomePage from "./pages/Home/Home";

import AuthPage from "./pages/Auth/Auth";

import SamplesPage from "./pages/Samples/Samples";
import SampleInfoPage from "./pages/Samples/Sample/Info/SampleInfo";
import SaveSamplePage from "./pages/Samples/Sample/Save/SaveSample";
import SampleTypePage from "./pages/Samples/Sample/Type/SampleType";
import SampleMeasurementPage from "./pages/Samples/Sample/Measurement/SampleMeasurement";
import UserSamplesPage from "./pages/Samples/User/UserSamples";

import UsersPage from "./pages/Users/Users";
import UserInfoPage from "./pages/Users/User/Info/UserInfo";
import AddUserPage from "./pages/Users/User/AddUser/AddUser";
import EditUserPage from "./pages/Users/User/EditUser/EditUser";
import DeleteUserPage from "./pages/Users/User/DeleteUser/DeleteUser";
import { isAdmin, isAuth } from "./global/slices/auth/auth-actions";

const router = createBrowserRouter([
  /***  Error (404) Routes ***/
  {
    path: "*",
    loader: () => {
      return redirect("/");
    },
  },

  /***  Home Routes ***/
  {
    path: "/",
    element: <HomePage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      return null;
    },
  },

  /***  Auth Routes ***/
  {
    path: "/auth",
    element: <AuthPage />,
    loader: () => {
      if (isAuth()) {
        return redirect("/");
      }

      return null;
    },
  },

  /***  Sample Routes ***/
  {
    path: "/samples",
    element: <SamplesPage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      return null;
    },
  },
  {
    path: "/samples/sample/:id",
    element: <SampleInfoPage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      return null;
    },
  },
  {
    path: "/samples/sample/save",
    element: <SaveSamplePage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      return null;
    },
  },
  {
    path: "/samples/sample/types",
    element: <SampleTypePage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      if (!isAdmin()) {
        return redirect("/");
      }

      return null;
    },
  },
  {
    path: "/samples/sample/measurements",
    element: <SampleMeasurementPage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      if (!isAdmin()) {
        return redirect("/");
      }

      return null;
    },
  },
  {
    path: "/samples/user/:id",
    element: <UserSamplesPage />,
    loader: ({ params }) => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      const role = params.id.charAt(0);
      if ((role === "T" || role === "R") && !isAdmin()) {
        return redirect("/");
      }

      return null;
    },
  },

  /***  User Routes ***/
  {
    path: "/users",
    element: <UsersPage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      return null;
    },
  },
  {
    path: "/users/user/:id",
    element: <UserInfoPage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      return null;
    },
  },
  {
    path: "/users/user/add",
    element: <AddUserPage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      return null;
    },
  },
  {
    path: "users/user/edit",
    element: <EditUserPage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      return null;
    },
  },
  {
    path: "/users/user/delete",
    element: <DeleteUserPage />,
    loader: () => {
      if (!isAuth()) {
        return redirect("/auth");
      }

      if (!isAdmin()) {
        return redirect("/");
      }

      return null;
    },
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

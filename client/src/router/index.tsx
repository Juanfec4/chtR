import { createBrowserRouter } from "react-router-dom";
import App from "./layouts/app";
import AuthLayout from "./layouts/auth";
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

//App router
const router = createBrowserRouter([
  //Landing Page
  {
    path: "/",
    element: <App />,
    children: [
      {
        // Auth Routes
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/register",
            element: <RegisterPage />,
          },
          {
            path: "/auth/login",
            element: <LoginPage />,
          },
        ],
      },
      //404 Not found
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
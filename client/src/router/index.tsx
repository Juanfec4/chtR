import { createBrowserRouter } from "react-router-dom";
import App from "./layouts/app";
import AuthLayout from "./layouts/auth";
import UserLayout from "./layouts/user";
import WebAppLayout from "./layouts/webApp";
import NotFoundPage from "./pages/404";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import UserEditPage from "./pages/userEdit";

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
      //Web app
      {
        path: "/web-app",
        element: <WebAppLayout />,
        children: [
          {
            // Users
            path: "/web-app/user",
            element: <UserLayout />,
            children: [
              {
                path: "/web-app/user/edit",
                element: <UserEditPage />,
              },
            ],
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

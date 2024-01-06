import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: FC = () => {
  return (
    <div id="auth-page">
      <Outlet />
    </div>
  );
};
export default AuthLayout;

import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../@types/redux";

const AuthLayout: FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();

  useEffect(() => {
    //Redirect
    if (isLoggedIn) {
      navigator("/web-app");
    }
  }, [isLoggedIn]);

  return (
    <div id="auth-page" className="p-6 md:p-12">
      <Outlet />
    </div>
  );
};
export default AuthLayout;

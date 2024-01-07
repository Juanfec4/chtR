import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../@types/redux";

const WebAppLayout: FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const navigator = useNavigate();

  useEffect(() => {
    //Redirect
    if (!isLoggedIn) {
      navigator("/auth/login");
    }
  }, [isLoggedIn]);

  return (
    <div id="web-app-page">
      <Outlet />
    </div>
  );
};
export default WebAppLayout;

import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../../@types/redux";
import UserDetailsCard from "../../components/cards/userDetails";

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
    <div id="web-app-page" className=" grid grid-cols-12 gap-4 min-h-screen">
      <aside className=" col-span-2 bg-slate-100">
        <UserDetailsCard />
      </aside>
      <main className=" col-span-10">
        <Outlet />
      </main>
    </div>
  );
};
export default WebAppLayout;

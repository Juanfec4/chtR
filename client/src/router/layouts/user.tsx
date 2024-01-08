import { FC } from "react";
import { Outlet } from "react-router-dom";

const UserLayout: FC = () => {
  return (
    <div id="user-page" className="p-6 md:p-12 w-full h-full">
      <div className="bg-neutral-100 w-full h-full rounded-sm shadow-md">
        <Outlet />
      </div>
    </div>
  );
};
export default UserLayout;

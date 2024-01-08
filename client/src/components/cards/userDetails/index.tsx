import { IconChevronDown, IconChevronUp, IconLogout, IconUserEdit } from "@tabler/icons-react";
import { FC, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../@types/redux";
import useCookies from "../../../hooks/useCookies";
import { logout } from "../../../redux/slices/userSlice";
import avatar from "../../../services/avatar";
import OnlineStatus from "../../dataDisplay/onlineStatus";

const UserDetailsCard: FC = () => {
  const { isLoggedIn, username, displayName, avatarSeed } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { clearAllCookies } = useCookies();

  //Menu state
  const [showMenu, setShowMenu] = useState(false);

  //Get avatar img by seed
  const svg = useMemo(() => avatar.getSvgBySeed(avatarSeed || ""), [avatarSeed]);

  //Switch menu toggle icon depending on state
  const MenuToggleIcon = showMenu ? IconChevronUp : IconChevronDown;

  //Logout
  const handleLogout = () => {
    clearAllCookies();
    dispatch(logout());
    navigator("/auth/login");
  };

  //Edit
  const handleEdit = () => {
    navigator("/web-app/user/edit");
    setShowMenu(false);
  };

  //Return if not logged in
  if (!isLoggedIn) return null;

  return (
    <div className="flex p-6 gap-2 border-b border-neutral-300 relative">
      <img src={svg} alt="" className="h-20 w-20 rounded-md" />
      <div>
        {/*TODO: Switch to onlineStatus from socket connection*/}
        <OnlineStatus status={true} />
        <h2 className="text-4xl font-light">{displayName}</h2>
        <h3 className="text-sm font italic text-blue-800">@{username}</h3>
      </div>
      <div className="flex flex-col absolute right-6 top-6">
        <MenuToggleIcon
          className="h-5 w-5 hover:text-blue-500 transition duration-200 cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        />
        <div className="relative">
          {showMenu && (
            <ul className="bg-neutral-100 absolute z-50 rounded-sm shadow-md p-2 flex flex-col justify-center text-md gap-1 border border-neutral-300 w-max">
              <li className=" hover:text-blue-500 cursor-pointer">
                <a onClick={handleEdit} className="flex items-center gap-1">
                  <IconUserEdit className="h-4 w-4" />
                  Edit
                </a>
              </li>
              <li className=" hover:text-blue-500 cursor-pointer">
                <a onClick={handleLogout} className="flex items-center gap-1">
                  <IconLogout className="h-4 w-4" />
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;

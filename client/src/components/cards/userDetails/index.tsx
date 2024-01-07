import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../@types/redux";
import avatar from "../../../services/avatar";
import OnlineStatus from "../../dataDisplay/onlineStatus";

const UserDetailsCard: FC = () => {
  const { isLoggedIn, username, displayName, avatarSeed } = useSelector(
    (state: RootState) => state.user
  );

  //Return if not logged in
  if (!isLoggedIn) return null;

  //Get avatar img by seed
  const svg = useMemo(() => avatar.getSvgBySeed(avatarSeed || ""), [avatarSeed]);

  return (
    <div className="flex p-6 gap-2 border-b border-neutral-300">
      <img src={svg} alt="" className="h-20 w-20 rounded-sm" />
      <div>
        {/*TODO: Switch to onlineStatus from socket connection*/}
        <OnlineStatus status={true} />
        <h2 className="text-4xl font-light">{displayName}</h2>
        <h3 className="text-sm font italic text-blue-600">@{username}</h3>
      </div>
    </div>
  );
};

export default UserDetailsCard;

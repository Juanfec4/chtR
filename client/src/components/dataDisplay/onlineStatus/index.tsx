import { FC } from "react";
import { OnlineStatusProps } from "../../../@types/props";

const OnlineStatus: FC<OnlineStatusProps> = ({ status }) => {
  if (status === true) {
    return (
      <span className="flex items-center gap-1">
        <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full"></div>
        <p className="text-xs">Connected</p>
      </span>
    );
  }
  if (status === false) {
    return (
      <span className="flex items-center gap-1">
        <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full"></div>
        <p className="text-xs">Disconnected</p>
      </span>
    );
  }
};
export default OnlineStatus;

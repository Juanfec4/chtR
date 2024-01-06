import { FC } from "react";
import { ButtonProps } from "../../../@types/props";

const OutlineButton: FC<ButtonProps> = ({ text, clickFn, Icon }) => {
  return (
    <button
      onClick={clickFn}
      className=" border-blue-500 text-blue-500 border hover:bg-blue-500/10 active:bg-blue-800/20 transition duration-200 rounded-md flex items-center justify-center gap-1 w-36 h-12"
    >
      {Icon && <Icon className="w-5 h-5" data-testid="icon-element" />}
      {text}
    </button>
  );
};

export default OutlineButton;

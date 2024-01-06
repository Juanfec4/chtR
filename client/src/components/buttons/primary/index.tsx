import { FC } from "react";
import { ButtonProps } from "../../../@types/props";

const PrimaryButton: FC<ButtonProps> = ({ text, clickFn, Icon }) => {
  return (
    <button
      onClick={clickFn}
      className=" bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-400 disabled:bg-blue-300 disabled:text-blue-100 transition duration-200 rounded-md flex items-center justify-center gap-1 w-36 h-12"
    >
      {Icon && <Icon className="w-5 h-5" data-testid="icon-element" />}
      {text}
    </button>
  );
};

export default PrimaryButton;

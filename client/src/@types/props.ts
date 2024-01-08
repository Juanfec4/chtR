import { Icon } from "@tabler/icons-react";
import { ChangeEvent } from "react";
import { InputElementType } from "./enums";

//Buttons
export interface ButtonProps {
  Icon?: Icon;
  text: string;
  clickFn?: () => void;
}

//Inputs
export interface InputProps {
  value: string;
  changeFn: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  inputType: InputElementType;
}

//Misc
export interface OnlineStatusProps {
  status: boolean;
}

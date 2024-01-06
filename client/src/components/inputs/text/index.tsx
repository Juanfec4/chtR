import { FC } from "react";
import { InputProps } from "../../../@types/props";

const TextInput: FC<InputProps> = ({
  inputType,
  value,
  changeFn,
  id,
  placeholder,
  name,
  label,
}) => {
  return (
    <div className="flex flex-col my-2">
      {label && (
        <label htmlFor={id} className="text-sm mb-1 capitalize font-semibold">
          {label}
        </label>
      )}
      <input
        className="bg-transparent border border-stone-400 rounded-md outline-none transition duration-200 placeholder:text-stone-500 max-w-80 shadow-sm h-12 px-3"
        type={inputType}
        value={value}
        onChange={changeFn}
        id={id}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
};
export default TextInput;

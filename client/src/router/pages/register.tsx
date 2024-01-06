import { FC } from "react";
import RegisterForm from "../../components/forms/register";

import mountainImage from "../../assets/images/mountain.jpg";

const RegisterPage: FC = () => {
  return (
    <div className=" flex flex-col justify-center items-center h-full">
      <h1 className="text-5xl font-semibold mb-8 text-neutral-50">Register</h1>
      <div className="flex rounded-md overflow-hidden shadow-md bg-neutral-50 max-w-[800px] md:h-[500px]">
        <div className="w-1/2 hidden md:flex">
          <img src={mountainImage} className=" object-cover" />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};
export default RegisterPage;

import { FC } from "react";

import mountainImage from "../../assets/images/mountain.jpg";
import LoginForm from "../../components/forms/login";

const LoginPage: FC = () => {
  return (
    <div className=" flex flex-col justify-center items-center h-full">
      <h1 className="text-5xl font-semibold mb-8 text-neutral-50">Login</h1>
      <div className="flex rounded-md overflow-hidden shadow-md bg-neutral-50 max-w-[800px] md:h-[600px]">
        <div className="w-1/2 hidden md:flex">
          <img src={mountainImage} className=" object-cover" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
export default LoginPage;

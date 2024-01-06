import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { InputElementType } from "../../../@types/enums";
import api from "../../../services/api";
import PrimaryButton from "../../buttons/primary";
import TextInput from "../../inputs/text";

const LoginForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  //Handle submit
  const handleLogin = async () => {
    //Validate data

    if (!username || !password) {
      setFormError("Missing fields!");
      return;
    }
    try {
      let response = await api.login(username, password);
      console.log(response.data.authToken);
    } catch (e: any) {
      setFormError(e.response.data);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="p-6 grow flex flex-col justify-center min-w-96 md:min-w-0"
    >
      <TextInput
        inputType={InputElementType.text}
        placeholder="username"
        label="Username"
        value={username}
        id="username"
        name="username"
        changeFn={(e) => setUsername(e.target.value)}
      />
      <TextInput
        inputType={InputElementType.password}
        placeholder="password"
        label="Password"
        value={password}
        id="password"
        name="password"
        changeFn={(e) => setPassword(e.target.value)}
      />
      <p className="h-6 text-red-500 text-sm">{formError}</p>
      <PrimaryButton text="Login " clickFn={handleLogin} />
      <p className="text-sm italic mt-2">
        Need an account?{" "}
        <Link to={"/auth/register"} className="text-blue-600 underline ">
          register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;

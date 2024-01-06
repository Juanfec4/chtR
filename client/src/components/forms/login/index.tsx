import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputElementType } from "../../../@types/enums";
import useCookies from "../../../hooks/useCookies";
import api from "../../../services/api";
import PrimaryButton from "../../buttons/primary";
import TextInput from "../../inputs/text";

const LoginForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const navigator = useNavigate();
  const { saveCookie } = useCookies();

  //Handle submit
  const handleLogin = async () => {
    //Validate data
    if (!username || !password) {
      setFormError("Missing fields!");
      return;
    }

    //Submit data to API
    try {
      let response = await api.login(username, password);
      //Save token to cookies
      saveCookie("authToken", response.data.authToken);

      //Reset State
      setUsername("");
      setPassword("");
      setFormError("");

      //Redirect to app
      navigator("/app");
    } catch (e: any) {
      setFormError(e.response.data);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="p-6 grow flex flex-col justify-center min-w-96 md:min-w-0 max-w-96"
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
      <p className="min-h-6 text-red-500 text-sm mb-1">{formError}</p>
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

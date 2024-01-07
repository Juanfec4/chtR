import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InputElementType } from "../../../@types/enums";
import api from "../../../services/api";
import avatar from "../../../services/avatar";
import PrimaryButton from "../../buttons/primary";
import TextInput from "../../inputs/text";
const RegisterForm: FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [formError, setFormError] = useState("");

  const navigator = useNavigate();

  //Handle submit
  const handleRegister = async () => {
    //Validate data
    if (!name || !username || !password || !passwordConfirmation) {
      setFormError("Missing fields!");
      return;
    }

    if (password !== passwordConfirmation) {
      setFormError("Passwords must match!");
      return;
    }

    //Generate random avatar seed
    const seed = avatar.generateRandomSeed();

    try {
      //Send data to API
      await api.register(username, name, password, seed);

      //Reset state
      setName("");
      setUsername("");
      setPassword("");
      setPasswordConfirmation("");
      setFormError("");

      //Redirect to login
      navigator("/auth/login");
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
        placeholder="name"
        label="Display name"
        value={name}
        id="displayName"
        name="displayName"
        changeFn={(e) => setName(e.target.value)}
      />
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
      <TextInput
        inputType={InputElementType.password}
        placeholder="confirm password"
        label="Password confirmation"
        value={passwordConfirmation}
        id="passwordConfirmation"
        name="passwordConfirmation"
        changeFn={(e) => setPasswordConfirmation(e.target.value)}
      />
      <p className="min-h-6 text-red-500 text-sm mb-1">{formError}</p>
      <PrimaryButton text="Register " clickFn={handleRegister} />
      <p className="text-sm italic mt-2">
        Already have an account?{" "}
        <Link to={"/auth/login"} className="text-blue-600 underline ">
          login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;

import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { FC, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InputElementType } from "../../@types/enums";
import { RootState } from "../../@types/redux";
import OutlineButton from "../../components/buttons/outline";
import PrimaryButton from "../../components/buttons/primary";
import ProfileSection from "../../components/containers/profileSection";
import AvatarSelector from "../../components/inputs/avatarSelector";
import TextInput from "../../components/inputs/text";
import useCookies from "../../hooks/useCookies";
import { changeAvatarSeed, changeDisplayName, changeUserToken } from "../../redux/slices/userSlice";
import api from "../../services/api";
import avatar from "../../services/avatar";
import jwt from "../../services/jwt";

const UserEditPage: FC = () => {
  const { username, displayName, avatarSeed } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const navigator = useNavigate();
  const { clearAllCookies, saveCookie } = useCookies();

  //Changes
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newSeed, setNewSeed] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Get avatar img by seed
  const svg = useMemo(() => avatar.getSvgBySeed(avatarSeed || ""), [avatarSeed]);

  //Handle submit changes
  const handleSubmit = async () => {
    try {
      //Patch resource on API
      let response = await api.updateUser(newDisplayName, newSeed);
      const payload = (await jwt.decodeToken(response.data.newAuthToken)) as any;
      const expirationDate = jwt.getExpirationDate(payload);

      //Save token to cookies
      clearAllCookies();
      saveCookie("authToken", response.data.newAuthToken, expirationDate);
      //Update redux store
      dispatch(changeUserToken({ newToken: response.data.newAuthToken }));
      dispatch(changeAvatarSeed({ newSeed }));
      dispatch(changeDisplayName({ newDisplayName }));
      //Redirect to web-app
      navigator("/web-app");
    } catch (error: any) {
      setErrorMessage(error.response.data);
    }
  };

  return (
    <div className="p-6">
      <IconArrowNarrowLeft
        className="text-neutral-500 hover:text-blue-500 transition duration-200 cursor-pointer"
        onClick={() => navigator("/web-app")}
      />
      <ProfileSection title="Profile Details">
        <div className="max-w-max py-6 flex gap-2">
          <img src={svg} className="h-24 w-24 rounded-md" />
          <div>
            <span className="flex gap-2 text-xl text-neutral-500">
              <h3 className="font-bold">Display name:</h3>
              <p>{displayName}</p>
            </span>
            <span className="flex gap-2 text-xl text-neutral-500">
              <h3 className="font-bold">Username:</h3>
              <p>@{username}</p>
            </span>
          </div>
        </div>
      </ProfileSection>
      <ProfileSection title="Edit Profile">
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput
            name="displayName"
            id="displayName"
            value={newDisplayName}
            changeFn={(e) => setNewDisplayName(e.target.value)}
            placeholder="Ex. Jane Doe"
            label="New Display Name"
            inputType={InputElementType.text}
          />
          <AvatarSelector
            selected={newSeed}
            changeFn={(selection) => setNewSeed(selection)}
            currentSeed={avatarSeed}
          />
          <p className="min-h-6 text-red-500 text-sm mb-1">{errorMessage}</p>
          <div className="flex gap-2">
            <PrimaryButton text="Apply" clickFn={handleSubmit} />
            <OutlineButton text="Cancel" clickFn={() => navigator("/web-app")} />
          </div>
        </form>
      </ProfileSection>
    </div>
  );
};
export default UserEditPage;

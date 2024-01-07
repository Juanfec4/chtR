import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import useCookies from "../../hooks/useCookies";
import { login } from "../../redux/slices/userSlice";
import jwt from "../../services/jwt";

const App: FC = () => {
  const dispatch = useDispatch();
  const { getCookie } = useCookies();

  useEffect(() => {
    //Dispatch load token action
    let authToken = getCookie("authToken");
    //Check if user is not logged in on state
    if (authToken) {
      //Decode token
      let { username, id, name } = jwt.decodeToken(authToken) as any;
      //Check if it has valid details
      if (username && id && name) {
        //Update redux state
        dispatch(login({ username, displayName: name, userId: id, userToken: authToken }));
      }
    }
  }, []);

  return (
    <div id="app">
      <Outlet />
    </div>
  );
};
export default App;

import { FC } from "react";
import { Outlet } from "react-router-dom";

const App: FC = () => {
  //Dispatch load token action

  //Route to login if no cookie present

  //Route to web app if cookie present
  return (
    <div id="app">
      <Outlet />
    </div>
  );
};
export default App;

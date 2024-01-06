import { FC } from "react";
import { Outlet } from "react-router-dom";

const App: FC = () => {
  return (
    <div id="app">
      <Outlet />
    </div>
  );
};
export default App;

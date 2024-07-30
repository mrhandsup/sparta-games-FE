import { Outlet } from "react-router-dom";

const NonAuthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default NonAuthLayout;

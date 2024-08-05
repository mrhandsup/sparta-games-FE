import { Outlet } from "react-router-dom";
import Header from "../Header";

const Layout = () => {
  return (
    <div className="mx-auto max-w-[1440px] border border-solid border-black">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;

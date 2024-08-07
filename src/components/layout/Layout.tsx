import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

const Layout = () => {
  return (
    <div className="flex flex-col mx-auto max-w-[1440px] h-screen">
      <Header />
      <Outlet />
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

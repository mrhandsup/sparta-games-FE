import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

const Layout = () => {
  return (
    <div className="flex flex-col mx-auto max-w-[1440px] h-screen">
      <div className="sticky top-0 z-20">
        <Header />
      </div>
      <Outlet />
      <div className="mt-auto w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

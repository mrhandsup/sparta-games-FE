import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

const Layout = () => {
  return (
    <div className="relative mx-auto max-w-[1440px] min-h-screen">
      <Header />
      <Outlet />
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

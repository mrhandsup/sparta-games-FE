import { Outlet, useLocation } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import { useEffect } from "react";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col mx-auto max-w-[1440px] h-full font-Pretendard">
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

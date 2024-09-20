import { Outlet, useLocation } from "react-router-dom";

import Header from "../Header";
import { useEffect } from "react";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative flex flex-col mx-auto max-w-[1440px] min-w-[1440px] h-full font-Pretendard">
      <div className="sticky top-0 z-20">
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;

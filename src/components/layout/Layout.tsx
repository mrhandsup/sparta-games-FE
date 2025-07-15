import { Outlet, useLocation } from "react-router-dom";

import Header from "../Header";
import { useEffect } from "react";

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="sticky top-0 z-20 bg-gray-800 flex align-middle justify-center ">
        <Header />
      </div>
      <div
        className={`${
          pathname === "/game-upload" ? "max-w-[1180px]" : "min-w-[1440px]"
        } relative flex flex-col mx-auto  h-full font-Pretendard`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;

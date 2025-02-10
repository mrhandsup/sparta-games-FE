import { Outlet, useLocation } from "react-router-dom";

import Header from "../Header";
import { useEffect } from "react";

const HomeLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <div className="sticky top-0 z-20 bg-gray-800 flex align-middle justify-center ">
        <Header />
      </div>
      <div className="relative flex flex-col mx-auto  min-w-[1440px] h-full font-Pretendard">
        <Outlet />
      </div>
    </>
  );
};

export default HomeLayout;

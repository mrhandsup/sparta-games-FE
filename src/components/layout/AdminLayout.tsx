import { Outlet } from "react-router-dom";

import { useEffect } from "react";

const AdminLayout = () => {
  const isAdmin = sessionStorage.getItem("isAdmin");
  useEffect(() => {
    if (!isAdmin) {
      alert("관리자만 접근 가능합니다.");
      window.location.href = "/";
    }
  }, [isAdmin]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;

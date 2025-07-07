import { Outlet, useNavigate } from "react-router-dom";
import { userStore } from "../../share/store/userStore";
import { useEffect } from "react";

const AuthLayout = () => {
  const userData = userStore((state) => state.userData);
  const setUser = userStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        setUser(token);
      } else {
        navigate("/");
        window.alert("해당 페이지는 로그인 후 접근 가능합니다.");
      }
    }
  }, [userData, navigate, setUser]);

  return <Outlet />;
};

export default AuthLayout;

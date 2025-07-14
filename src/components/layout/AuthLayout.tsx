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
      }
    }
  }, [userData, navigate, setUser]);

  return <Outlet />;
};

export default AuthLayout;

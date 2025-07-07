import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "./share/Router";
import dino from "./assets/dino.svg";

import "./App.css";
import { userStore } from "./share/store/userStore";
import { useEffect } from "react";
import SpartaButton from "./spartaDesignSystem/SpartaButton";

const queryClient = new QueryClient();

function App() {
  const { userData, setUser } = userStore();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      userStore.getState().setUser(accessToken);
    }
  }, []);

  // 로그인 정보가 없을 때, sessionStorage에 저장된 accessToken을 이용하여 로그인 처리
  useEffect(() => {
    if (userData) return;
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) return;
    setUser(accessToken);
  }, [userData]);

  function isMobileWeb() {
    const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }

  const is_mobile_user_first_time = localStorage.getItem("is_mobile_user_first_time");

  const onClickOkDino = () => {
    localStorage.setItem("is_mobile_user_first_time", "true");
    window.location.reload();
  };

  if (isMobileWeb() && !is_mobile_user_first_time) {
    return (
      <div className="relative min-w-fit min-h-full bg-gray-700 flex flex-col items-center justify-center px-10">
        <img src={dino} alt="publ" className="p-10" />
        <SpartaButton onClick={onClickOkDino} content="스파르타 게임즈 접속" type="filled" />
      </div>
    );
  }

  return (
    <div className="relative min-w-fit min-h-full bg-gray-700">
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;

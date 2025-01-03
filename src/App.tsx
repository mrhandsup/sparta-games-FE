import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "./share/Router";
import Footer from "./components/Footer";

import "./App.css";
import { userStore } from "./share/store/userStore";
import { useEffect } from "react";

function App() {
  const queryClient = new QueryClient();

  const { userData, setUser } = userStore();

  // 로그인 정보가 없을 때, sessionStorage에 저장된 accessToken을 이용하여 로그인 처리
  useEffect(() => {
    if (userData) return;
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) return;
    setUser(accessToken);
  }, [userData]);

  return (
    <div className="relative min-w-fit min-h-full bg-gray-700">
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
      <div className="absolute -bottom-48 mt-auto w-full bg-gray-700">
        <Footer />
      </div>
    </div>
  );
}

export default App;

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import useLoginModalStore from "../share/store/modalStore";

import { getUserInfo } from "../api/login";

const useHome = () => {
  const { openLoginModal } = useLoginModalStore();

  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async (code: string) => {
      try {
        const res = await getUserInfo(code);
        console.log(res);
      } catch (error) {
        alert("소셜로그인에 실패하였습니다.");
      }
    };
    if (code) {
      console.log(code);
      fetch(code);
    }
  }, [code, navigate]);

  return { openLoginModal };
};

export default useHome;

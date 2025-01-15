import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { discordLogin, googleLogin, kakaoLogin, naverLogin } from "../api/login";
import loading from "../assets/common/loading.gif";
import { userStore } from "../share/store/userStore";

const Redirect = () => {
  const { service } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const navigate = useNavigate();
  const { setUser } = userStore();

  const switchFetchApiByService = (service: string) => {
    switch (service) {
      case "kakao":
        return kakaoLogin(code!);
      case "naver":
        return naverLogin(code!);
      case "discord":
        return discordLogin(code!);
      case "google":
        return googleLogin(code!);
      default:
        return;
    }
  };

  const { data, isError } = useQuery<any>({
    queryKey: ["loginData", code],
    queryFn: () => {
      return switchFetchApiByService(service!);
    },
    enabled: !!code && !!service,
  });

  useEffect(() => {
    if (isError) {
      window.alert("로그인에 실패했습니다. 다시 시도해주세요.");
      navigate("/");
      return;
    }
    if (!data) return;
    if (data?.data?.message?.includes("회원가입")) {
      //회원가입 페이지로 이동
      navigate(`/signup?email=${data.data?.email}&login_type=${data.data?.login_type}`);
      // window.alert("회원가입 페이지로 이동");
    } else {
      sessionStorage.setItem("accessToken", data.data?.access);
      sessionStorage.setItem("refreshToken", data.data?.refresh);
      //메인 페이지로 이동
      setUser(data?.data.access);
      navigate("/");
    }
  }, [data, isError]);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3 bg-white">
      {/* <CircularProgress size="3rem" /> */}
      <img src={loading} className="w-[200px] h-30" />
      <div className="font-DungGeunMo  text-heading-28 mt-5">소셜로그인을 진행중입니다... </div>
      <div className="font-DungGeunMo text-heading-28">잠시만 기다려주세요! </div>
    </div>
  );
};

export default Redirect;

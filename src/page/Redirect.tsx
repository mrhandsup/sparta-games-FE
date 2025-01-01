import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { discordLogin, googleLogin, kakaoLogin, naverLogin } from "../api/login";
import loading from "../assets/common/loading.gif";

const Redirect = () => {
  const { service } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const navigate = useNavigate();

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
      navigate("/");
    }
  }, [data, isError]);

  return (
    <div className="flex justify-center items-center h-screen">
      <img src={loading} className="w-20 h-20" />
    </div>
  );
};

export default Redirect;

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { discordLogin, googleLogin, kakaoLogin, naverLogin } from "../api/login";
import loading from "../assets/common/loading.gif";
import { userStore } from "../share/store/userStore";
import axios from "axios";
import useModalToggles from "../hook/useModalToggles";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../spartaDesignSystem/SpartaReactionModal";

const Redirect = () => {
  const NO_ACTION_MODAL_ID = "noActionModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);

  const { service } = useParams();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const navigate = useNavigate();
  const { setUser } = userStore();

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    isClientError: {
      title: "로그인 실패",
      content: "기존에 이메일 로그인 방식으로 가입했습니다.",
      btn1: {
        text: "확인했습니다.",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          navigate("/");
        },
      },
      type: "error",
    },

    deactivatedUserError: {
      title: "로그인 실패",
      content: "해당 유저는 탈퇴 처리된 유저입니다.",
      btn1: {
        text: "확인했습니다.",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          navigate("/");
        },
      },
      type: "error",
    },

    isServerError: {
      title: "로그인 실패",
      content: "서버 오류가 발생했습니다. 나중에 다시 시도해주세요.",
      btn1: {
        text: "확인했습니다.",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          navigate("/");
        },
      },

      type: "error",
    },
  };

  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.isClientError,
  );

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

  const { data, error, isError } = useQuery<any>({
    queryKey: ["loginData", code],
    queryFn: () => {
      return switchFetchApiByService(service!);
    },
    enabled: !!code && !!service,
    retry: false,
  });

  useEffect(() => {
    if (isError && axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        setNoActionModalData(noActionData.isClientError);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

        return;
      } else if (error.response?.status === 401) {
        setNoActionModalData(noActionData.deactivatedUserError);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

        return;
      } else if (error.response?.status === 500) {
        setNoActionModalData(noActionData.isServerError);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

        return;
      }
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
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-3 bg-white">
        {/* <CircularProgress size="3rem" /> */}
        <img src={loading} className="w-[200px] h-30" />
        <div className="font-DungGeunMo  text-heading-28 mt-5">소셜로그인을 진행중입니다... </div>
        <div className="font-DungGeunMo text-heading-28">잠시만 기다려주세요! </div>
      </div>

      {noActionModalData && (
        <SpartaReactionModal
          isOpen={modalToggles[NO_ACTION_MODAL_ID]}
          onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
          modalId={NO_ACTION_MODAL_ID}
          title={noActionModalData.title || ""}
          content={noActionModalData.content || ""}
          btn1={{
            text: noActionModalData?.btn1?.text || "",
            onClick: noActionModalData?.btn1?.onClick || (() => {}),
          }}
          type={noActionModalData.type}
        />
      )}
    </>
  );
};

export default Redirect;

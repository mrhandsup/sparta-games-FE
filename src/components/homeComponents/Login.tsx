import SocialLoginBtn from "../modal/login/SocialLoginBtn";
import googleIcon from "../../assets/common/googleIcon.svg";
import discordIcon from "../../assets/common/discordIcon.svg";
import kakaoIcon from "../../assets/common/kakaoIcon.svg";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";
import { useForm } from "react-hook-form";
import { TUserInformationInputForm } from "../../types";
import { login } from "../../api/login";
import { userStore } from "../../share/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";
import useModalToggles from "../../hook/useModalToggles";
import closeBtn from "../../../src/assets/common/closeBtn.svg";

type Props = {
  onClose: () => void;
};

function Login({ onClose }: Props) {
  // 로그인 폼
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<Partial<TUserInformationInputForm>>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const NO_ACTION_MODAL_ID = "noActionModal";

  const { setUser } = userStore();

  const navigate = useNavigate();

  const location = useLocation();
  const isTeambuilding = location.pathname.includes("team-building");

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    loginfail: {
      title: "잠시만요!",
      content: "아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "error",
    },
  };
  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.loginfail,
  );

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    onSuccess: async (response) => {
      const { access, refresh } = response.data.data;
      sessionStorage.setItem("accessToken", access);
      sessionStorage.setItem("refreshToken", refresh);
      const userDataReturn = await setUser(access);

      if (userDataReturn?.data.is_staff) {
        sessionStorage.setItem("isAdmin", "true");
        window.location.href = "/admin/dashboard";
      } else {
        onClose();
        window.location.href = isTeambuilding ? "/community/team-building" : "/";
      }
    },
    onError: () => {
      setNoActionModalData(noActionData.loginfail);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    },
  });

  const onSubmit = (data: Partial<TUserInformationInputForm>) => {
    loginMutation.mutate({
      email: data.email || "",
      password: data.password || "",
    });
  };

  const [isLocalLogin, setIsLocalLogin] = useState(false);

  const redirectPath = window.location.pathname + window.location.search;

  return (
    <>
      <div className="w-[350px]">
        {!isLocalLogin && (
          <>
            <div className="relative">
              <h2 className="text-center font-bold text-heading-24 text-custom-red font-DungGeunMo text-primary-500">
                간편로그인
              </h2>
              <div className="absolute right-0 bottom-0">
                <img onClick={onClose} className="w-7 h-7 cursor-pointer" src={closeBtn} alt="닫기" />
              </div>
            </div>
            <div className="text-white text-center mt-5">쉽고 빠르게</div>
            <div className="text-white text-center mb-5 mt-1">스파르타 게임즈를 즐겨보세요!</div>
            {/* 간편로그인 버튼 그룹 */}

            <div className=" flex flex-col items-center gap-[12px] mt-4 justify-center ">
              <SocialLoginBtn
                loginUrl={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${
                  import.meta.env.VITE_GOOGLE_CLIENT_ID
                }&redirect_uri=${
                  import.meta.env.VITE_GOOGLE_CALLBACK_URL
                }&response_type=code&scope=email+profile&access_type=offline`}
                icon={googleIcon}
                altText="구글 간편로그인"
                bgColor="bg-white"
                redirectPath={redirectPath}
              />
              <SocialLoginBtn
                loginUrl={`https://discord.com/api/oauth2/authorize?client_id=${
                  import.meta.env.VITE_DISCORD_CLIENT_ID
                }&redirect_uri=${import.meta.env.VITE_DISCORD_CALLBACK_URL}&response_type=code&scope=identify+email`}
                icon={discordIcon}
                altText="디스코드 간편로그인"
                bgColor="bg-[#5662F6]"
                textColor="text-white"
                redirectPath={redirectPath}
              />
              {/* <SocialLoginBtn
                loginUrl={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
                  import.meta.env.VITE_NAVER_CLIENT_ID
                }&state=${import.meta.env.VITE_NAVER_STATE}&redirect_uri=${
                  import.meta.env.VITE_NAVER_CALLBACK_URL
                }&state=check_random_string`}
                icon={naverIcon}
                altText="네이버 간편로그인"
                bgColor="bg-[#03C75A]"
                textColor="text-white"
              /> */}
              <SocialLoginBtn
                loginUrl={`https://kauth.kakao.com/oauth/authorize?client_id=${
                  import.meta.env.VITE_KAKAO_CLIENT_ID
                }&redirect_uri=${import.meta.env.VITE_KAKAO_CALLBACK_URL}&response_type=code`}
                icon={kakaoIcon}
                altText="카카오 간편로그인"
                bgColor="bg-[#FEE500]"
                redirectPath={redirectPath}
              />
              <div
                onClick={() => setIsLocalLogin(!isLocalLogin)}
                className={`h-[48px] flex items-center justify-center px-[12px] rounded-full shadow-[0_1px_2px_0_rgba(0,0,0,0.25)] bg-gray-300 w-full gap-3 cursor-pointer`}
              >
                <div className="text-title-16">이메일 로그인</div>
              </div>
            </div>
          </>
        )}
        {isLocalLogin && (
          <>
            <div className="relative">
              <h2 className="text-center font-bold text-heading-24 text-custom-red font-DungGeunMo text-primary-500 mb-7">
                이메일 로그인
              </h2>
              <div className="absolute right-0 bottom-0">
                <img onClick={onClose} className="w-7 h-7 cursor-pointer" src={closeBtn} alt="닫기" />
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
              <div className="flex flex-col gap-[12px] mb-4">
                <SpartaTextField
                  label="이메일"
                  type="medium"
                  register={register("email", { required: true })}
                  inputProps={{
                    placeholder: "spartagames@sparta.com",
                  }}
                  subLabel={{
                    default: "이메일을 입력해주세요",
                    error: "",
                    pass: "",
                  }}
                />

                <SpartaTextField
                  label="비밀번호"
                  type="medium"
                  register={register("password", { required: true })}
                  inputProps={{
                    placeholder: "*****",
                  }}
                  subLabel={{
                    default: "비밀번호를 입력해주세요",
                    error: "",
                    pass: "",
                  }}
                  passwordType
                />
              </div>
              <div
                className="text-gray-200 text-center text underline underline-offset-1 mb-1 cursor-pointer"
                onClick={() => (window.location.href = "/reset")}
              >
                비밀번호를 잊어버리셨나요?
              </div>
              <SpartaButton
                content={loginMutation.isPending ? "로그인 중..." : "로그인"}
                type="filled"
                colorType="primary"
                size="medium"
                disabled={!isValid || loginMutation.isPending}
              />
              <SpartaButton
                content="회원가입"
                onClick={() => {
                  navigate(`/signup`);
                  onClose();
                }}
                type="filled"
                colorType="grey"
                size="medium"
              />
            </form>
          </>
        )}
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
          btn2={
            noActionModalData?.btn2 && {
              text: noActionModalData?.btn2?.text || "",
              onClick: noActionModalData?.btn2?.onClick || (() => {}),
            }
          }
          type={noActionModalData.type}
        />
      )}
    </>
  );
}

export default Login;

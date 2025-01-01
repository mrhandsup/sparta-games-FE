import SocialLoginBtn from "../modal/login/SocialLoginBtn";
import googleIcon from "../../assets/common/googleIcon.svg";
import discordIcon from "../../assets/common/discordIcon.svg";
import naverIcon from "../../assets/common/naverIcon.svg";
import kakaoIcon from "../../assets/common/kakaoIcon.svg";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";
import { useForm } from "react-hook-form";
import { TUser, TUserInformationInputForm } from "../../types";
import { login } from "../../api/login";
import { userStore } from "../../share/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { getUserData } from "../../api/user";

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

  const { setUser } = userStore();

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => login(email, password),
    onSuccess: async (data) => {
      sessionStorage.setItem("accessToken", data?.data.access);
      sessionStorage.setItem("refreshToken", data?.data.refresh);
      const userDataReturn = await setUser(data?.data.access);

      if (userDataReturn?.is_staff) {
        sessionStorage.setItem("isAdmin", "true");
        window.location.href = "/admin/dashboard";
      } else {
        onClose();
      }
    },
    onError: () => {
      window.alert("로그인에 실패했습니다");
    },
  });

  const onSubmit = (data: Partial<TUserInformationInputForm>) => {
    loginMutation.mutate({
      email: data.email || "",
      password: data.password || "",
    });
  };

  return (
    <>
      <div className="w-[350px]">
        <h2 className="text-center font-bold text-heading-24 text-custom-red font-DungGeunMo text-primary-500">
          간편로그인
        </h2>
        <div className=" flex items-center gap-[12px] mt-4 justify-center pb-7 mb-7 border-b-[1px] border-solid border-gray-100">
          <SocialLoginBtn
            loginUrl={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${
              import.meta.env.VITE_GOOGLE_CLIENT_ID
            }&redirect_uri=${
              import.meta.env.VITE_GOOGLE_CALLBACK_URL
            }&response_type=code&scope=email+profile&access_type=offline`}
            icon={googleIcon}
            altText="구글 아이콘"
            bgColor="bg-white"
          />
          <SocialLoginBtn
            loginUrl={`https://discord.com/api/oauth2/authorize?client_id=${
              import.meta.env.VITE_DISCORD_CLIENT_ID
            }&redirect_uri=${import.meta.env.VITE_DISCORD_CALLBACK_URL}&response_type=code&scope=identify+email`}
            icon={discordIcon}
            altText="디스코드 아이콘"
            bgColor="bg-[#5662F6]"
          />
          <SocialLoginBtn
            loginUrl={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
              import.meta.env.VITE_NAVER_CLIENT_ID
            }&state=${import.meta.env.VITE_NAVER_STATE}&redirect_uri=${
              import.meta.env.VITE_NAVER_CALLBACK_URL
            }&state=check_random_string`}
            icon={naverIcon}
            altText="네이버 아이콘"
            bgColor="bg-[#03C75A]"
          />
          <SocialLoginBtn
            loginUrl={`https://kauth.kakao.com/oauth/authorize?client_id=${
              import.meta.env.VITE_KAKAO_CLIENT_ID
            }&redirect_uri=${import.meta.env.VITE_KAKAO_CALLBACK_URL}&response_type=code`}
            icon={kakaoIcon}
            altText="카카오 아이콘"
            bgColor="bg-[#FEE500]"
          />
        </div>
        <h2 className="text-center font-bold text-heading-24 text-custom-red font-DungGeunMo text-primary-500 mb-7">
          이메일 로그인
        </h2>
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
              error: "올바른 이메일 형식이 아닙니다",
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
              error: "8~32자의 영문 대소문자, 숫자를 포함해야 합니다",
              pass: "사용 가능한 비밀번호입니다",
            }}
            passwordType
          />
        </div>
        <SpartaButton content="회원가입" onClick={() => {}} type="filled" colorType="grey" size="medium" />
        <SpartaButton
          content={loginMutation.isPending ? "로그인 중..." : "로그인"}
          type="filled"
          colorType="primary"
          size="medium"
          disabled={!isValid || loginMutation.isPending}
        />
      </form>
    </>
  );
}

export default Login;

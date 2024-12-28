import SocialLoginBtn from "../modal/login/SocialLoginBtn";
import googleIcon from "../../assets/common/googleIcon.svg";
import discordIcon from "../../assets/common/discordIcon.svg";
import naverIcon from "../../assets/common/naverIcon.svg";
import kakaoIcon from "../../assets/common/kakaoIcon.svg";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";
import { useForm } from "react-hook-form";
import { TUserInformationInputForm } from "../../types";
import { login } from "../../api/login";
import { userStore } from "../../share/store/userStore";

type Props = {
  onClose: () => void;
};

function Login({ onClose }: Props) {
  // 로그인 폼
  const {
    register,
    formState: { isValid },
    setValue,
    getValues,
  } = useForm<Partial<TUserInformationInputForm>>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser } = userStore();

  // 로그인 요청
  const fetchLogin = async () => {
    if (!isValid) return;

    const email = getValues("email") || "";
    const password = getValues("password") || "";
    const loginData = await login(email, password);
    if (!loginData) return;
    sessionStorage.setItem("accessToken", loginData?.data.access);
    sessionStorage.setItem("refreshToken", loginData?.data.refresh);
    setUser(loginData?.data.access);
    onClose();
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
            }&redirect_uri=${import.meta.env.VITE_GOOGLE_CALLBACK_URL}&response_type=code&scope=email+profile`}
            icon={googleIcon}
            altText="구글 아이콘"
            bgColor="bg-white"
          />
          <SocialLoginBtn loginUrl="/" icon={discordIcon} altText="디스코드 아이콘" bgColor="bg-[#5662F6]" />
          <SocialLoginBtn
            loginUrl={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
              import.meta.env.VITE_GOOGLE_CLIENT_ID
            }&state=false&redirect_uri=${import.meta.env.VITE_NAVER_CALLBACK_URL}`}
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-[28px] mb-8"
      >
        <div className="flex flex-col gap-[12px]">
          <SpartaTextField
            label="이메일"
            type="medium"
            register={register("email", {
              required: true,
            })}
            inputProps={{
              placeholder: "spartagames@sparta.com",
            }}
            onClear={() => setValue("email", "")}
            subLabel={{
              default: "이메일을 입력해주세요",
              error: "올바른 이메일 형식이 아닙니다",
              pass: "",
            }}
          />

          <SpartaTextField
            label="비밀번호"
            type="medium"
            register={register("password", {
              required: true,
            })}
            inputProps={{
              placeholder: "*****",
            }}
            onClear={() => setValue("password", "")}
            subLabel={{
              default: "비밀번호를 입력해주세요",
              error: "8~32자의 영문 대소문자, 숫자를 포함해야 합니다",
              pass: "사용 가능한 비밀번호입니다",
            }}
            passwordType
          />
        </div>
      </form>
      <SpartaButton content="회원가입" onClick={() => {}} type={"filled"} colorType="grey" size="medium" />
      <div className="h-2" />
      <SpartaButton
        content="로그인"
        onClick={() => fetchLogin()}
        type={"filled"}
        colorType={"primary"}
        size="medium"
        disabled={!isValid}
      />
    </>
  );
}

export default Login;

import { useNavigate, useSearchParams } from "react-router-dom";
import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import heroImage from "../assets/homeImage/heroImage.svg";

import { FormProvider, useForm } from "react-hook-form";
import { TUserInformationInputForm } from "../types";
import Account from "../components/signUpComponents/Account";
import Profile from "../components/signUpComponents/Profile";
import SpartaButton from "../spartaDesignSystem/SpartaButton";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/login";
import { userStore } from "../share/store/userStore";
import useModalToggles from "../hook/useModalToggles";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../spartaDesignSystem/SpartaReactionModal";
import { useState } from "react";
import { AxiosError } from "axios";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const login_type = searchParams.get("login_type");

  const NO_ACTION_MODAL_ID = "noActionModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);
  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>({});

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    completeSignUp: {
      title: "회원가입을 환영합니다!",
      content:
        "다양한 개발자들의 게임을 즐길 수 있는<br/> 스파르타 게임즈에 오신것을 환영합니다!<br/> 댓글쓰기 및 게임업로드 기능이 활성화 되었습니다. <br/>다양한 게임을 즐겨보세요!",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          navigate("/");
        },
      },
    },
  };
  const signupForm = useForm<Partial<TUserInformationInputForm>>({
    mode: "onChange",
    defaultValues: {
      email: email || "",
      login_type: login_type ? login_type : "DEFAULT",
      password: "",
      password_check: "",
      nickname: "",
      game_category: "",
      code: "",
      is_maker: false,
    },
  });

  const game_category = signupForm.watch("game_category");

  const navigate = useNavigate();
  const { setUser } = userStore();

  const signUpMutation = useMutation({
    mutationFn: (data: Partial<TUserInformationInputForm>) => signUp(data),
    onSuccess: async (data) => {
      sessionStorage.setItem("accessToken", data?.data.data.access);
      sessionStorage.setItem("refreshToken", data?.data.data.refresh);
      setUser(data?.data.data.access);

      setNoActionModalData(noActionData.completeSignUp);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    },
    onError: (error: AxiosError) => {
      if (error.response && error.response?.status === 400) {
        setNoActionModalData({
          title: "로그인 실패",
          content: (error.response?.data as { message?: string })?.message,
          btn1: {
            text: "확인했습니다.",
            onClick: () => {
              onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
            },
          },
          type: "error",
        });
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();

        return;
      }
    },
  });

  const onSubmit = (data: Partial<TUserInformationInputForm>) => {
    // "FPS,Action"
    const game_category = data.game_category?.toString();
    signUpMutation.mutate({ ...data, game_category });
  };

  return (
    <div className="py-14 px-28 flex flex-col gap-14 justify-center items-center">
      <div className="flex items-center gap-3">
        <img src={pixelMeteor} />
        <p className="font-DungGeunMo text-heading-32 text-white font-[400]">스파르타 게임즈의 아이디를 생성합니다.</p>
      </div>
      <div className="flex justify-center align-top gap-10 w-full">
        <div className="flex flex-col p-[24px] bg-gray-800 rounded-2xl w-[48%] h-fit">
          <img src={heroImage} />
          <p className="text-white pt-[24px] leading-6 text-center  ">
            스파르타 게임즈는 게임을 사랑하는 사람들을 위한 공간입니다. <br />
            유저들에게는 다양한 게임을 즐기고, 평가할 수 있는
            <br /> 개발자들에게는 자신이 만든 게임을 선보이고,
            <br /> 같이 게임을 만들어 갈 동료를 구할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-col p-[40px] bg-gray-800 rounded-2xl w-[48%] gap-4">
          <FormProvider {...signupForm}>
            {email ? (
              <>
                <p className="text-primary-400 font-DungGeunMo text-heading-24 font-[400]">계정 정보</p>
                <p className="text-white text-body-18 font-DungGeunMo font-[400] text-center py-14">
                  간편로그인은 계정정보가 필요없습니다.
                </p>
              </>
            ) : (
              <Account />
            )}
            <Profile />
            <SpartaButton
              type="filled"
              size="medium"
              colorType="primary"
              onClick={signupForm.handleSubmit(onSubmit)}
              disabled={!signupForm.formState.isValid || !game_category || game_category.length === 0}
              content="회원가입"
            />
          </FormProvider>
        </div>
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
    </div>
  );
};

export default SignUp;

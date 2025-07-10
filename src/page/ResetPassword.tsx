import React, { useEffect, useState } from "react";
import pixelMeteor from "../assets/homeImage/pixelMeteor.svg";
import heroImage from "../assets/homeImage/heroImage.svg";
import { useForm } from "react-hook-form";
import SpartaButton from "../spartaDesignSystem/SpartaButton";
import useModalToggles from "../hook/useModalToggles";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../spartaDesignSystem/SpartaReactionModal";
import SpartaTextField from "../spartaDesignSystem/SpartaTextField";
import { postEmailVerify, postSendEmailCode } from "../api/login";
import { convertToMMSS } from "../util/convertToMMSS";
import { resetPassword, resetPasswordVerify } from "../api/user";

type Props = {};

const ResetPassword = (props: Props) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      email_code: null,
      password: "",
      password_check: "",
    },
  });

  const email = watch("email");
  const emailCode = watch("email_code") ?? 0;
  const password = watch("password");
  const password_check = watch("password_check");

  const NO_ACTION_MODAL_ID = "noReactionModal";

  const { modalToggles, modalRefs, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    emailNotExists: {
      title: "이메일이 존재하지 않습니다",
      content: "입력하신 이메일이 존재하지 않습니다. 다시 한번 확인해주세요.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "error",
    },
    emailVerify: {
      title: "인증번호 전송 완료",
      content:
        "플레이어님을 환영합니다 :)</br>작성해주신 이메일로 인증번호가 전송되었습니다.</br>스팸메일함로 전송되는 경우도 있으니 꼭 메일함을 확인해주시고</br>올바른 인증번호를 입력해주세요. ",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "primary",
    },
    successVerify: {
      title: "이메일 인증 완료",
      content: "이메일 인증이 완료되었습니다. 비밀번호 변경 진행이 가능합니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "primary",
    },
    changePasswordComplete: {
      title: "비밀번호 변경 완료",
      content: "비밀번호 변경이 완료되었습니다. 변경된 비밀번호로 로그인해주세요.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          window.location.href = "/";
        },
      },
      type: "primary",
    },
  };

  // 단순 모달 데이터
  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.emailVerify,
  );

  const [count, setCount] = useState(0);
  const [isEmailVerifying, setIsEmailVerifying] = useState(false);
  const [isVerifySuccess, setIsVerifySuccess] = useState(false);

  // 이메일 유효성 검사 규칙
  const emailValidation = {
    required: "이메일을 입력해주세요",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "올바른 이메일 형식이 아닙니다",
    },
  };

  // 비밀번호 유효성 검사 규칙
  const passwordValidation = {
    required: "비밀번호를 입력해주세요",
    minLength: {
      value: 8,
      message: "비밀번호는 최소 8자 이상이어야 합니다",
    },
    maxLength: {
      value: 32,
      message: "비밀번호는 최대 32자까지 가능합니다",
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]).{8,32}$/,
      message: "8~32자의 영문 소문자, 숫자, 특수문자를 포함해야 합니다",
    },
  };

  // 비밀번호 확인 유효성 검사 규칙
  const passwordCheckValidation = {
    required: "비밀번호를 다시 입력해주세요",
    validate: (value: string) => value === password || "비밀번호가 일치하지 않습니다",
  };

  // 이메일 인증번호 유효성 검사 규칙
  const emailCodeValidation = {
    required: "인증번호를 입력해주세요",

    pattern: {
      value: /^[0-9]{6}$/,
      message: "올바른 인증번호 형식이 아닙니다",
    },
  };

  const onClickSendEmailCode = async () => {
    const res = await postSendEmailCode(email, false);

    if (res?.status === 200) {
      setCount(300);
      setIsEmailVerifying(true);
      setNoActionModalData(noActionData.emailVerify);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    } else if (res?.status === 400) {
      setIsEmailVerifying(false);
      setNoActionModalData(noActionData.emailNotExists);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    }
  };

  const onClickEmailValidation = async () => {
    const res = await resetPasswordVerify(email, emailCode);

    if (res?.status === 200) {
      setIsVerifySuccess(true);

      setNoActionModalData(noActionData.successVerify);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    } else if (res?.status === 400) {
      setNoActionModalData({
        title: "이메일 인증 실패",
        content: res.data.message,
        btn1: {
          text: "확인했습니다",
          onClick: () => {
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          },
        },
        type: "error",
      });

      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    }
  };

  const onClickResetPassword = async () => {
    const res = await resetPassword(email, emailCode, password, password_check);

    if (res?.status === 202) {
      setNoActionModalData(noActionData.changePasswordComplete);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    } else if (res?.status === 400) {
      setNoActionModalData({
        title: "비밀번호 변경 실패",
        content: res.data.message,
        btn1: {
          text: "확인했습니다",
          onClick: () => {
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          },
        },
        type: "error",
      });

      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    }
  };

  useEffect(() => {
    if (password_check) {
      trigger("password_check");
    }
  }, [password, trigger, password_check]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((count) => count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  });

  return (
    <div className="py-14 px-28 flex flex-col gap-14 justify-center items-center">
      <div className="flex items-center gap-3">
        <img src={pixelMeteor} />
        <p className="font-DungGeunMo text-heading-32 text-white">스파르타 게임즈의 비밀번호를 재설정합니다.</p>
      </div>
      <div className="flex justify-center align-top gap-10 w-full">
        <div className="flex flex-col p-12 bg-gray-800 rounded-2xl w-[48%] h-fit">
          <img src={heroImage} />
          <p className="text-white pt-8 leading-6 text-center font-DungGeunMo ">
            스파르타 게임즈는 게임을 사랑하는 사람들을 위한 공간입니다. <br />
            유저들에게는 다양한 게임을 즐기고, 평가할 수 있는
            <br /> 개발자들에게는 자신이 만든 게임을 선보이고,
            <br /> 같이 게임을 만들어 갈 동료를 구할 수 있습니다.
          </p>
        </div>
        <div className="flex flex-col p-12 bg-gray-800 rounded-2xl w-[48%] gap-4">
          {/* 계정 인증 */}
          {!isVerifySuccess && (
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <p className="text-primary-400 font-DungGeunMo text-heading-24">계정 인증</p>
                <SpartaTextField
                  label="이메일"
                  type="medium"
                  register={register("email", emailValidation)}
                  inputProps={{
                    placeholder: "spartagames@sparta.com",
                  }}
                  subLabel={{
                    default: "이메일을 입력해주세요",
                    error: errors.email?.message as string,
                    pass: email && !errors.email ? "사용 가능한 이메일입니다" : "",
                  }}
                  error={!!errors.email}
                  pass={!!email && !errors.email}
                  btnContent={
                    <SpartaButton
                      content={"인증하기"}
                      size="medium"
                      type={isVerifySuccess ? "filled" : "standard"}
                      colorType="primary"
                      disabled={!email || !!errors.email}
                      onClick={onClickSendEmailCode}
                    />
                  }
                />
                <SpartaTextField
                  label="인증번호 입력"
                  type="medium"
                  register={register("email_code", emailCodeValidation)}
                  inputProps={{
                    placeholder: isEmailVerifying ? convertToMMSS(count) : "이메일 입력 후 인증하기 버튼을 눌러주세요.",
                    disabled: isEmailVerifying ? false : true,
                  }}
                  subLabel={{
                    default: "이메일로 전송된 인증번호를 입력하세요",
                    error: errors.email_code?.message as string,
                    pass: "",
                  }}
                  error={!!errors.email_code}
                  btnContent={
                    <SpartaButton
                      content={`${isVerifySuccess ? "확인완료" : "확인"}`}
                      type="filled"
                      size="medium"
                      colorType="primary"
                      disabled={!!errors.email_code || isVerifySuccess || emailCode === null}
                      onClick={onClickEmailValidation}
                    />
                  }
                />
              </div>
            </div>
          )}
          {/* 비밀번호 재설정 */}
          {isVerifySuccess && (
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col gap-4">
                <p className="text-primary-400 font-DungGeunMo text-heading-24">비밀번호 재설정</p>
                <SpartaTextField
                  label="비밀번호"
                  type="medium"
                  register={register("password", passwordValidation)}
                  inputProps={{
                    placeholder: "*****",
                  }}
                  subLabel={{
                    default: "비밀번호를 입력해주세요",
                    error: errors.password?.message as string,
                    pass: password && !errors.password ? "사용 가능한 비밀번호입니다" : "",
                  }}
                  passwordType
                  error={!!errors.password}
                  pass={!!password && !errors.password}
                />
                <SpartaTextField
                  label="비밀번호 확인"
                  type="medium"
                  register={register("password_check", passwordCheckValidation)}
                  inputProps={{
                    placeholder: "*****",
                  }}
                  subLabel={{
                    default: "비밀번호를 다시 입력해주세요",
                    error: errors.password_check?.message as string,
                    pass: watch("password_check") && !errors.password_check ? "비밀번호가 일치합니다" : "",
                  }}
                  passwordType
                  error={!!errors.password_check}
                  pass={watch("password_check") && !errors.password_check ? true : undefined}
                />
              </div>
              <SpartaButton
                type="filled"
                size="medium"
                colorType="primary"
                onClick={onClickResetPassword}
                content="비밀번호 재설정하기"
                disabled={!isValid}
              />
            </div>
          )}
        </div>
      </div>
      {/* 단순 모달 */}
      {noActionData && (
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
    </div>
  );
};

export default ResetPassword;

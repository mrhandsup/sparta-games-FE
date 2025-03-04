import { useEffect, useState } from "react";
import useModalToggles from "../../hook/useModalToggles";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import SpartaReactionModal, { TSpartaReactionModalProps } from "../../spartaDesignSystem/SpartaReactionModal";
import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";
import { useFormContext } from "react-hook-form";
import { postEmailVerify, postSendEmailCode } from "../../api/login";
import { convertToMMSS } from "../../util/convertToMMSS";

type Props = {};

const Account = (props: Props) => {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext();

  const [isEmailVerifying, setIsEmailVerifying] = useState(false);
  const [isVerifySuccess, setIsVerifySuccess] = useState(false);
  const [count, setCount] = useState(0);

  const email = watch("email");
  const emailCode = watch("email_code");
  const password = watch("password");
  const password_check = watch("password_check");

  const NO_ACTION_MODAL_ID = "noReactionModal";
  const CHANGE_PASSWORD_MODAL_ID = "changePasswordModal";

  const { modalToggles, modalRefs, onClickModalToggleHandlers } = useModalToggles([
    NO_ACTION_MODAL_ID,
    CHANGE_PASSWORD_MODAL_ID,
  ]);

  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
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

    duplicateEmail: {
      title: "인증번호 전송 실패",
      content: "이미 가입한 이메일입니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "error",
    },

    successVerify: {
      title: "이메일 인증 완료",
      content: "이메일 인증이 완료되었습니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "primary",
    },
  };

  // 단순 모달 데이터
  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.emailVerify,
  );

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
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/,
      message: "8~32자의 영문 대소문자, 숫자를 포함해야 합니다",
    },
  };

  // 비밀번호 확인 유효성 검사 규칙
  const passwordCheckValidation = {
    required: "비밀번호를 다시 입력해주세요",
    validate: (value: string) => value === password || "비밀번호가 일치하지 않습니다",
  };

  const emailCodeValidation = {
    required: "인증번호를 입력해주세요",

    pattern: {
      value: /^[0-9]{6}$/,
      message: "올바른 인증번호 형식이 아닙니다",
    },
  };

  const onClickSendEmailCode = async () => {
    setCount(300);
    setIsEmailVerifying(true);
    const res = await postSendEmailCode(email, true);

    if (res?.status === 200) {
      setNoActionModalData(noActionData.emailVerify);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    } else if (res?.status === 400) {
      setIsEmailVerifying(false);

      setNoActionModalData(noActionData.duplicateEmail);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    }
  };

  const onClickEmailValidation = async (code: number) => {
    const res = await postEmailVerify(email, code);

    if (res?.status === 200) {
      setIsVerifySuccess(true);

      setNoActionModalData(noActionData.successVerify);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    } else if (res?.status === 400) {
      setNoActionModalData({
        title: "이메일 인증 실패",
        content: res.data.error,
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
    <>
      <p className="text-primary-400 font-DungGeunMo text-[24px]">계정 정보</p>
      <SpartaTextField
        label="이메일"
        type="medium"
        register={register("email", emailValidation)}
        inputProps={{
          placeholder: "spartagames@sparta.com",
          disabled: isEmailVerifying ? true : false,
        }}
        subLabel={{
          default: isVerifySuccess ? "" : "이메일을 입력해주세요",
          error: errors.email?.message as string,
          pass: email && !errors.email ? "사용 가능한 이메일입니다" : "",
        }}
        error={isVerifySuccess ? false : !!errors.email}
        pass={isVerifySuccess ? false : email && !errors.email}
        btnContent={
          <SpartaButton
            content={`${isVerifySuccess ? "확인완료" : isEmailVerifying ? "재전송" : "인증하기"}`}
            type={isVerifySuccess ? "filled" : "standard"}
            size="medium"
            colorType="primary"
            disabled={!email || !!errors.email || isVerifySuccess}
            onClick={onClickSendEmailCode}
          />
        }
      />

      {isEmailVerifying && (
        <SpartaTextField
          label="인증번호 입력"
          type="medium"
          register={register("email_code", emailCodeValidation)}
          inputProps={{
            placeholder: convertToMMSS(count),
            disabled: isVerifySuccess ? true : false,
          }}
          subLabel={{
            default: isVerifySuccess ? "" : "이메일로 전송된 인증번호를 입력하세요",
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
              disabled={!!errors.email_code || isVerifySuccess || emailCode.length === 0}
              onClick={() => onClickEmailValidation(emailCode)}
            />
          }
        />
      )}
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
        pass={password && !errors.password}
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
        pass={watch("password_check") && !errors.password_check}
      />

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
      <div className="h-[28px]" />
    </>
  );
};

export default Account;

import React from "react";
import { TUserInformationInputForm } from "../../../types";
import { useForm } from "react-hook-form";
import { userStore } from "../../../share/store/userStore";
import SpartaButton from "../../../spartaDesignSystem/SpartaButton";
import SpartaTextField from "../../../spartaDesignSystem/SpartaTextField";
import useModalToggles from "../../../hook/useModalToggles";

type Props = {};

const AccountModal = (props: Props) => {
  const { userData } = userStore();

  const signupForm = useForm<Partial<TUserInformationInputForm>>({
    mode: "onChange",
    defaultValues: {
      email: userData?.email,
      password: "",
      new_password: "",
      new_password_check: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = signupForm;

  const password = watch("password");
  const new_password = watch("new_password");
  const new_password_check = watch("new_password_check");

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
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      message: "8~32자의 영문 대소문자, 숫자를 포함해야 합니다",
    },
  };

  // 비밀번호 확인 유효성 검사 규칙
  const passwordCheckValidation = {
    required: "비밀번호를 다시 입력해주세요",
    validate: (value: string) => value === new_password || "비밀번호가 일치하지 않습니다",
  };
  const NO_ACTION_MODAL_ID = "noReactionModal";
  const { modalToggles, modalRefs, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);

  return (
    <>
      <p className="text-primary-400 font-DungGeunMo text-heading-24">계정 정보</p>
      <SpartaTextField
        label="이메일"
        type="medium"
        register={register("email")}
        inputProps={{
          placeholder: "spartagames@sparta.com",
        }}
        btnContent={
          <SpartaButton
            content="인증하기"
            size="medium"
            colorType="primary"
            onClick={() => onClickModalToggleHandlers[NO_ACTION_MODAL_ID]()}
          />
        }
      />

      {/* TODO */}
      {/* <SpartaTextField
    label="인증번호 입력"
    type="medium"
    register={register("email_code", emailCodeValidation)}
    inputProps={{
      placeholder: "인증번호",
    }}
    subLabel={{
      default: "이메일로 전송된 인증번호를 입력하세요",
      error: errors.email_code?.message as string,
      pass: "",
    }}
    error={!!errors.email_code}
  /> */}
      <SpartaTextField
        label="기존 비밀번호"
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
        pass={(password && !errors.password) as boolean}
      />
      <SpartaTextField
        label="세 비밀번호"
        type="medium"
        register={register("new_password", passwordValidation)}
        inputProps={{
          placeholder: "*****",
        }}
        subLabel={{
          default: "비밀번호를 다시 입력해주세요",
          error: errors.new_password?.message as string,
          pass: watch("password_check") && !errors.new_password ? "사용 가능한 비밀번호입니다" : "",
        }}
        passwordType
        error={!!errors.new_password}
        pass={(watch("new_password") && !errors.new_password) as boolean}
      />
      <SpartaTextField
        label="새 비밀번호 확인"
        type="medium"
        register={register("new_password_check", passwordCheckValidation)}
        inputProps={{
          placeholder: "*****",
        }}
        subLabel={{
          default: "비밀번호를 다시 입력해주세요",
          error: errors.new_password_check?.message as string,
          pass: new_password_check && !errors.new_password_check ? "비밀번호가 일치합니다" : "",
        }}
        passwordType
        error={!!errors.password_check}
        pass={(new_password_check && !errors.new_password_check) as boolean}
      />
    </>
  );
};

export default AccountModal;

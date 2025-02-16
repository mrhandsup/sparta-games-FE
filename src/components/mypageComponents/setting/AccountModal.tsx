import React, { useEffect } from "react";
import { TUserInformationInputForm } from "../../../types";
import { useForm } from "react-hook-form";
import { userStore } from "../../../share/store/userStore";
import SpartaButton from "../../../spartaDesignSystem/SpartaButton";
import SpartaTextField from "../../../spartaDesignSystem/SpartaTextField";

import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../../api/user";
import useModalToggles from "../../../hook/useModalToggles";
import SpartaReactionModal from "../../../spartaDesignSystem/SpartaReactionModal";

type Props = {
  onSuccess: () => void;
};

const AccountModal = ({ onSuccess }: Props) => {
  const { userData } = userStore();
  const NO_ACTION_MODAL_ID = "noActionModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([NO_ACTION_MODAL_ID]);

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
    trigger,
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
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,32}$/,
      message: "8~32자의 영문 대소문자, 숫자를 포함해야 합니다",
    },
  };

  // 비밀번호 확인 유효성 검사 규칙
  const passwordCheckValidation = {
    required: "비밀번호를 다시 입력해주세요",
    validate: (value: string | undefined) => value === new_password || "비밀번호가 일치하지 않습니다",
  };

  const [errorContent, setErrorContent] = React.useState<string>("");

  // 비밀번호 변경 mutation
  const passwordMutation = useMutation({
    mutationFn: ({
      userId,
      password,
      new_password,
      new_password_check,
    }: {
      userId: number;
      password: string;
      new_password: string;
      new_password_check: string;
    }) => updatePassword(userId, password, new_password, new_password_check),
    onSuccess: () => {
      onSuccess();
    },
    onError: (error: any) => {
      console.error(error.response?.data.message);
      setErrorContent(error.response?.data.message);
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
    },
  });

  const onSubmit = async (data: Partial<TUserInformationInputForm>) => {
    if (!userData?.user_pk) return;

    passwordMutation.mutate({
      userId: userData.user_pk,
      password: data.password!,
      new_password: data.new_password!,
      new_password_check: data.new_password_check!,
    });
  };

  useEffect(() => {
    if (new_password_check) {
      trigger("new_password_check");
    }
  }, [new_password, trigger, new_password_check]);

  return (
    <div className="flex flex-col gap-3 min-w-[410px]">
      <SpartaTextField
        label="이메일"
        type="medium"
        register={register("email")}
        inputProps={{
          placeholder: "spartagames@sparta.com",
          disabled: true,
        }}
      />
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
        label="새 비밀번호"
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
        error={!!errors.new_password_check}
        pass={(new_password_check && !errors.new_password_check) as boolean}
      />
      <SpartaButton
        content="변경하기"
        size="medium"
        colorType="primary"
        type="filled"
        disabled={Object.keys(errors).length > 0 || !password || !new_password || !new_password_check}
        onClick={handleSubmit(onSubmit)}
      />
      <SpartaReactionModal
        isOpen={modalToggles[NO_ACTION_MODAL_ID]}
        onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
        modalId={NO_ACTION_MODAL_ID}
        title={"에러"}
        content={errorContent}
        btn1={{
          text: "확인",
          onClick: onClickModalToggleHandlers[NO_ACTION_MODAL_ID],
        }}
        type={"error"}
      />
    </div>
  );
};

export default AccountModal;

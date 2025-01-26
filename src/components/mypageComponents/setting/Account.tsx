import React from "react";
import log from "../../../assets/Log.svg";
import { useForm } from "react-hook-form";
import { TUserInformationInputForm } from "../../../types";
import { userStore } from "../../../share/store/userStore";
import { updatePassword } from "../../../api/user";
import { useMutation } from "@tanstack/react-query";

type TAccountProps = {};

const Account = (props: TAccountProps) => {
  //* Hooks
  const { userData } = userStore();
  const [isUpdate, setIsUpdate] = React.useState<boolean>(false);

  const { register, handleSubmit, watch, reset } = useForm<Partial<TUserInformationInputForm>>({
    mode: "onChange",
    defaultValues: {
      email: userData?.email,
      password: "",
    },
  });

  // 비밀번호 값 감시
  const password = watch("new_password");

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
      setIsUpdate(false);
      reset({ password: "", new_password: "", new_password_check: "" }); // 폼 초기화
      // TODO: 성공 토스트 메시지 표시
    },
    onError: (error) => {
      // TODO: 에러 토스트 메시지 표시
      console.error(error);
    },
  });

  const onSubmit = async (data: Partial<TUserInformationInputForm>) => {
    if (!isUpdate || !userData?.user_pk) return;

    passwordMutation.mutate({
      userId: userData.user_pk,
      password: data.password!,
      new_password: data.new_password!,
      new_password_check: data.new_password_check!,
    });
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsUpdate(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: 회원 탈퇴 모달에 붙이기
  };

  const socialLoginConfig = {
    GOOGLE: "구글",
    KAKAO: "카카오",
    NAVER: "네이버",
    DISCORD: "디스코드",
  };

  const socialName = socialLoginConfig[userData?.login_type as keyof typeof socialLoginConfig];

  return (
    <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4">
            <img src={log} alt="로고" />
            <p className="font-DungGeunMo text-heading-32 text-white">계정정보 수정</p>
          </div>
          {userData?.login_type == "DEFAULT" && (
            <button
              type="submit"
              disabled={passwordMutation.isPending || userData?.login_type !== "DEFAULT"}
              className={`${isUpdate ? "border-primary-500" : "border-gray-400"} border-2 w-[20%] h-10 rounded-md ${
                isUpdate ? "text-primary-500" : "text-gray-400"
              } font-bold hover:bg-gray-700 transition-colors ${
                passwordMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={!isUpdate ? handleEditClick : undefined}
            >
              {passwordMutation.isPending ? "처리중" : isUpdate ? "저장하기" : "수정하기"}
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-100">아이디</label>
            <input
              {...register("email")}
              disabled
              placeholder="spartagames@sparta.com"
              className={`py-3 px-4 bg-gray-700 border border-solid rounded-md w-[50%] text-gray-200`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-100">현재 비밀번호</label>
            <input
              {...register("password")}
              disabled
              type="password"
              placeholder={
                userData?.login_type !== "DEFAULT" ? `${socialName} 간편로그인으로 이용하고 계십니다.` : "Password"
              }
              className={`py-3 px-4 bg-gray-700 border border-solid rounded-md w-[50%] text-white border-gray-200`}
            />
          </div>
        </div>
      </form>
      <div className="flex w-full justify-end text-red-500 underline cursor-pointer" onClick={handleDeleteClick}>
        <p>회원탈퇴</p>
      </div>
    </div>
  );
};

export default Account;

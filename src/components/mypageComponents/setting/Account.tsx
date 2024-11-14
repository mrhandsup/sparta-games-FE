import React from "react";
import log from "../../../assets/Log.svg";
import { useForm } from "react-hook-form";
import { UserInformationInputForm } from "../../../types";
import { userStore } from "../../../share/store/userStore";
import { updateUserData } from "../../../api/user";

type TAccountProps = {};

const Account = (props: TAccountProps) => {
  //* Hooks
  const { userData, setUser } = userStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Partial<UserInformationInputForm>>({
    mode: "onChange", // 입력값이 변경될 때마다 유효성 검사
    defaultValues: {
      email: userData?.email,
      password: "",
      password_check: "",
    },
  });

  // 비밀번호 값 감시
  const password = watch("password");

  //* Function
  const onSubmit = async (data: Partial<UserInformationInputForm>) => {
    console.log(data);
    if (userData) {
      await updateUserData(userData?.user_pk, {
        email: data.email,
        password: data.password,
        password_check: data.password_check,
      }).then((res) => {
        setUser(sessionStorage.getItem("accessToken") as string);
      });
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl px-7 py-5 flex flex-col gap-4 justify-start items-start">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-4">
            <img src={log} alt="로고" />
            <p className="font-DungGeunMo text-heading-32 text-white">계정정보 수정</p>
          </div>
          <button
            type="submit"
            className="border-gray-400 border-2 w-[20%] h-10 rounded-md text-gray-400 font-bold hover:bg-gray-700 transition-colors"
          >
            수정하기
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-100">아이디</label>
            <input
              {...register("email", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "이메일 형식이 아닙니다.",
                },
              })}
              placeholder="spartagames@sparta.com"
              className={`py-3 px-4 bg-gray-700 border border-solid rounded-md w-[50%] text-white ${
                errors.email ? "border-red-500" : "border-white"
              }`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-sm text-right w-full">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-100">현재 비밀번호</label>
            <input
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이어야 합니다.",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: "비밀번호는 문자, 숫자, 특수문자를 포함해야 합니다.",
                },
              })}
              type="password"
              placeholder="Password"
              className={`py-3 px-4 bg-gray-700 border border-solid rounded-md w-[50%] text-white ${
                errors.password ? "border-red-500" : "border-white"
              }`}
            />
          </div>
          {errors.password && <p className="text-red-500 text-sm text-right w-full">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-gray-100">비밀번호 확인</label>
            <input
              {...register("password_check", {
                required: "비밀번호 확인은 필수 입력입니다.",
                validate: (value) => value === password || "비밀번호가 일치하지 않습니다.",
              })}
              type="password"
              placeholder="Password Check"
              className={`py-3 px-4 bg-gray-700 border border-solid rounded-md w-[50%] text-white ${
                errors.password_check ? "border-red-500" : "border-white"
              }`}
            />
          </div>
          {errors.password_check && (
            <p className="text-red-500 text-sm text-right w-full">{errors.password_check.message}</p>
          )}
        </div>
      </form>
      <div className="flex w-full justify-end text-gray-200 underline">
        <p>회원탈퇴 신청하기</p>
      </div>
    </div>
  );
};

export default Account;

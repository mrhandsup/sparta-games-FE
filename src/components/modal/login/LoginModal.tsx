import { useRef } from "react";
import googleIcon from "../../../assets/common/googleIcon.svg";
import discordIcon from "../../../assets/common/discordIcon.svg";
import naverIcon from "../../../assets/common/naverIcon.svg";
import kakaoIcon from "../../../assets/common/kakaoIcon.svg";
import SocialLoginBtn from "./SocialLoginBtn";
import useLoginModalStore from "../../../share/store/modalStore";

const LoginModal = () => {
  const { openLoginModal, closeModal } = useLoginModalStore();
  const modalOutside = useRef<HTMLDivElement>(null);

  const clickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalOutside.current === e.target) {
      closeModal();
    }
  };

  return (
    <>
      <div
        ref={modalOutside}
        onClick={clickOutside}
        className={`${openLoginModal ? "flex" : "none"} fixed top-0 left-0 w-full h-[100%] bg-black bg-opacity-80 z-50`}
      >
        <div className="h-[494px] w-[861px] bg-white fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-[20px] flex gap-10">
          <div className="w-[350px]">
            <h2 className="text-center font-bold text-xl text-custom-red">간편 로그인</h2>
            <div className="mt-[61px] flex flex-col gap-[8px]">
              <SocialLoginBtn
                loginUrl={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${
                  import.meta.env.VITE_CLIENT_ID
                }&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code&scope=email+profile`}
                icon={googleIcon}
                altText="구글 아이콘"
                bgColor="bg-white"
                textColor="opacity-55"
                loginSpan="Google"
              />
              <SocialLoginBtn
                loginUrl="/"
                icon={discordIcon}
                altText="디스코드 아이콘"
                bgColor="bg-[#5662F6]"
                textColor="text-white"
                loginSpan="Discord"
              />
              <SocialLoginBtn
                loginUrl="/"
                icon={naverIcon}
                altText="네이버 아이콘"
                bgColor="bg-[#03C75A]"
                textColor="text-white"
                loginSpan="Naver"
              />
              <SocialLoginBtn
                loginUrl="/"
                icon={kakaoIcon}
                altText="카카오 아이콘"
                bgColor="bg-[#FEE500]"
                textColor="text-black"
                loginSpan="Kakao"
              />
            </div>
          </div>

          <div className="w-[1px] bg-[#D1D1D1] h-[100%]"></div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              closeModal();
            }}
            className="w-[350px] flex flex-col gap-[28px]"
          >
            <h2 className="text-center font-bold text-xl text-custom-red">이메일 로그인</h2>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-col">
                <label className="mb-[4px] text-custom-red">아이디</label>
                <input
                  type="text"
                  className="border-[1px] border-[#9E9E9E] py-[12px] px-[16px] rounded-[8px] h-[48px]"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-[4px] text-custom-red">비밀번호</label>
                <input
                  type="password"
                  className="border-[1px] border-[#9E9E9E] py-[12px] px-[16px] rounded-[8px] h-[48px]"
                />
              </div>
              <h3 className="text-center underline text-custom-red cursor-pointer">아직 회원이 아니세요?</h3>
            </div>
            <button className="w-[100%] h-[52px] rounded-[12px] py-[16px] px-[20px] bg-custom-red text-white">
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginModal;

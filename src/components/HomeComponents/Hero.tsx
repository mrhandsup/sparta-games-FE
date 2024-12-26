import useLoginModalStore from "../../share/store/modalStore";

import heroImage from "../../assets/homeImage/heroImage.svg";
import { userStore } from "../../share/store/userStore";
import GameCardList from "./GameCardList";
import { useQuery } from "@tanstack/react-query";
import { getMyBookmarkList } from "../../api/game";
import { TGameData } from "../../types";
import useModalToggles from "../../hook/useModalToggles";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";
import SpartaReactionModal from "../../spartaDesignSystem/SpartaReactionModal";

const Hero = () => {
  const { openModal } = useLoginModalStore();

  const { userData } = userStore();

  const { data } = useQuery<TGameData[]>({
    queryKey: ["myBookmarkList"],
    queryFn: getMyBookmarkList,
  });

  const LOGIN_MODAL_ID = "loginModal";
  const LOG_OUT_MODAL_ID = "logOutModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([LOGIN_MODAL_ID, LOG_OUT_MODAL_ID]);

  return (
    <>
      {/* 로그인 전 */}
      {!userData && (
        <section className="flex items-center gap-[60px] w-full h-[475px] bg-gray-700 text-white">
          <img src={heroImage} />
          <div className="flex flex-col justify-center gap-4">
            <h2 className="font-DungGeunMo text-heading-40">★ Welcome to Sparta Games ★</h2>

            <div className="flex flex-col items-center text-body-18">
              <p>스파르타 게임즈는 게임을 사랑하는 사람들을 위한 공간입니다.</p>
              <p>유저들에게는 다양한 게임을 즐기고, 평가할 수 있는</p>
              <p>개발자들에게는 자신이 만든 게임을 선보이고,</p>
              <p>같이 게임을 만들어 갈 동료를 구할 수 있습니다.</p>
            </div>

            <div className="flex gap-6">
              <button
                className="w-64 h-12 rounded-lg bg-primary-500 text-primary-950"
                onClick={() => onClickModalToggleHandlers[LOGIN_MODAL_ID]()}
              >
                로그인
              </button>
              <button
                className="w-64 h-12 rounded-lg border border-solid border-primary-500 text-primary-500"
                onClick={() => onClickModalToggleHandlers[LOG_OUT_MODAL_ID]()}
              >
                회원가입
              </button>
            </div>
          </div>
        </section>
      )}
      {/* 로그인 후 && 북마크 게임 x */}
      {userData && data?.length == 0 && (
        <section className="flex flex-col items-center  w-full h-[475px]  text-white  justify-center relative gap-4 ">
          <div className="absolute bg-hero-image bg-cover bg-center opacity-20 justify-center w-full h-full"></div>
          <p className="font-DungGeunMo text-heading-28 text-primary-400 mb-24">[User Name]의 Game Pack</p>
          <p className="font-DungGeunMo text-heading-40 text-primary-400 mb-3">아직 북마크한 게임이 없습니다.</p>
          <p className="font-DungGeunMo text-heading-32">다양한 게임을 즐기고, 북마크 하여</p>
          <p className="font-DungGeunMo text-heading-32">나만의 게임팩을 만들어보세요!</p>
        </section>
      )}
      {/* 로그인 후 && 북마크 게임 o */}
      {userData && data?.length !== 0 && (
        <section className="flex flex-col items-center w-full h-[475px]  text-white  justify-center relative gap-4 pt-14 mb-10">
          <div className="absolute bg-hero-image bg-cover bg-center opacity-20 justify-center w-full h-full"></div>
          <p className="font-DungGeunMo text-heading-28 text-primary-400 mb-8">[User Name]의 Game Pack</p>
          <GameCardList data={data} maxNum={4} simple={true} />
        </section>
      )}
      <SpartaModal
        isOpen={modalToggles[LOGIN_MODAL_ID]}
        onClose={onClickModalToggleHandlers[LOGIN_MODAL_ID]}
        modalId={LOGIN_MODAL_ID}
        title="로그인"
        type="alert"
      >
        <div className="min-w-80 min-h-[100vh]">모달 내용</div>
      </SpartaModal>
      <SpartaReactionModal
        isOpen={modalToggles[LOG_OUT_MODAL_ID]}
        onClose={onClickModalToggleHandlers[LOG_OUT_MODAL_ID]}
        modalId={LOG_OUT_MODAL_ID}
        title="로그아웃"
        content="정말 로그아웃 하시겠습니까?"
        btn1={{
          text: "로그아웃",
          onClick: () => {
            console.log("로그아웃");
          },
        }}
      />
    </>
  );
};

export default Hero;

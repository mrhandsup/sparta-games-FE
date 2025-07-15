import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import { getUserGamePackList } from "../../api/user";

import { userStore } from "../../share/store/userStore";
import type { TGameDataResponse } from "../../types";

import Login from "./Login";
import MyGamePackCard from "./MyGamePackCard";
import useModalToggles from "../../hook/useModalToggles";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css/pagination";
import "./HeroSwiper.css";

import heroImage from "../../assets/homeImage/heroImage.svg";

const Hero = () => {
  const { userData } = userStore();

  const { data } = useQuery<TGameDataResponse>({
    queryKey: ["userGamePackList", userData],
    queryFn: () => getUserGamePackList(userData?.data.user_id || 0),
    enabled: !!userData?.data.user_id,
  });

  const gameData = data?.data ?? [];

  // 모달
  const LOGIN_MODAL_ID = "loginModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([LOGIN_MODAL_ID]);

  const swiperRef = useRef(null);

  return (
    <>
      {/* 로그인 전 */}
      {!userData && (
        <section className="flex items-center max-w-[1440px] h-[475px] bg-gray-800 mx-auto">
          <img src={heroImage} className="h-full object-contain" />

          <div className="flex flex-col items-center gap-4 w-[50%] ps-10 pr-[130px]">
            <h2 className="font-DungGeunMo text-[32px] text-primary-500">★ Welcome to Sparta Games ★</h2>

            <div className="flex flex-col items-center text-base my-5 text-white">
              <p>스파르타 게임즈는 게임을 사랑하는 사람들을 위한 공간입니다.</p>
              <p>유저들에게는 다양한 게임을 즐기고, 평가할 수 있는</p>
              <p>개발자들에게는 자신이 만든 게임을 선보이고,</p>
              <p>같이 게임을 만들어 갈 동료를 구할 수 있습니다.</p>
            </div>

            <div className="w-full flex justify-end">
              <SpartaButton
                content="로그인"
                type="filled"
                size="medium"
                colorType="primary"
                onClick={() => onClickModalToggleHandlers[LOGIN_MODAL_ID]()}
              />
            </div>
          </div>
        </section>
      )}
      {/* 로그인 후 && 북마크 게임 x */}
      {userData && data?.data?.length == 0 && (
        <section className="flex flex-col items-center  w-full h-[475px]  text-white  justify-center relative gap-4  max-w-[1440px] mx-auto">
          <div className="absolute bg-hero-image bg-cover bg-center opacity-20 justify-center w-full h-full"></div>
          <p className="font-DungGeunMo text-heading-28 text-primary-400 mb-24">[User Name]의 Game Pack</p>
          <p className="font-DungGeunMo text-heading-40 text-primary-400 mb-3">아직 북마크한 게임이 없습니다.</p>
          <p className="font-DungGeunMo text-heading-32">다양한 게임을 즐기고, 북마크 하여</p>
          <p className="font-DungGeunMo text-heading-32">나만의 게임팩을 만들어보세요!</p>
        </section>
      )}
      {/* 로그인 후 && 북마크 게임 o */}
      {userData && gameData && gameData?.length !== 0 && (
        <section className="flex flex-col items-center w-full h-[475px]  text-white justify-center gap-4 mb-10 bg-red-500  max-w-[1440px] mx-auto">
          <Swiper
            className="heroSwiper"
            ref={swiperRef}
            loop={gameData?.length > 1 ? true : false}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Autoplay, ...(gameData?.length > 1 ? [Pagination] : [])]}
          >
            {gameData?.map((data, index) => (
              <SwiperSlide key={index}>
                <MyGamePackCard item={data} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
      <SpartaModal
        isOpen={modalToggles[LOGIN_MODAL_ID]}
        onClose={onClickModalToggleHandlers[LOGIN_MODAL_ID]}
        modalId={LOGIN_MODAL_ID}
      >
        <Login onClose={onClickModalToggleHandlers[LOGIN_MODAL_ID]} />
      </SpartaModal>
    </>
  );
};

export default Hero;

import { userStore } from "../../share/store/userStore";
import useModalToggles from "../../hook/useModalToggles";
import SpartaModal from "../../spartaDesignSystem/SpartaModal";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import Login from "../homeComponents/Login";
import heroImage from "../../assets/homeImage/heroImage.svg";

const CommunityHero = () => {
  const { userData } = userStore();

  // 모달
  const LOGIN_MODAL_ID = "loginModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([LOGIN_MODAL_ID]);

  return (
    <>
      {/* 로그인 전 */}
      {!userData && (
        <section className="flex items-center gap-[60px] w-full h-[475px] bg-gray-800 max-w-[1440px] mx-auto">
          <img src={heroImage} />
          <div className="flex flex-col justify-center gap-4 items-center w-[50%] px-20">
            <h2 className="font-DungGeunMo text-heading-32 text-primary-500 font-normal">★ 팀 빌딩 커뮤니티 ★</h2>

            <div className="flex flex-col items-center text-body-18 my-5 text-white">
              <p>팀빌딩 커뮤니티에서는 참여할 프로젝트를 살펴보거나</p>
              <p>함께 게임을 만들 팀원을 구할 수 있습니다.</p>
              <p>로그인해 자신의 프로필을 등록하면 더 좋은 프로젝트를 만날 수 있을거에요!</p>
            </div>

            <div className="w-full">
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
      {userData && (
        <section className="flex flex-col items-center  w-full h-[475px]  text-white  justify-center relative gap-4  max-w-[1440px] mx-auto">
          <div className="absolute bg-hero-image bg-cover bg-center opacity-20 justify-center w-full h-full"></div>
          <p className="font-DungGeunMo text-heading-28 text-primary-400 mb-24">[User Name]의 Game Pack</p>
          <p className="font-DungGeunMo text-heading-40 text-primary-400 mb-3">아직 북마크한 게임이 없습니다.</p>
          <p className="font-DungGeunMo text-heading-32">다양한 게임을 즐기고, 북마크 하여</p>
          <p className="font-DungGeunMo text-heading-32">나만의 게임팩을 만들어보세요!</p>
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

export default CommunityHero;

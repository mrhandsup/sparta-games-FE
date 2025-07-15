import { userStore } from "../../../share/store/userStore";

import useModalToggles from "../../../hook/useModalToggles";
import SpartaModal from "../../../spartaDesignSystem/SpartaModal";
import SpartaButton from "../../../spartaDesignSystem/SpartaButton";
import Login from "../../homeComponents/Login";

import heroImage from "../../../assets/communityImage/heroImage.png";

const Hero = () => {
  const { userData } = userStore();

  // 모달
  const LOGIN_MODAL_ID = "loginModal";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([LOGIN_MODAL_ID]);

  return (
    <>
      {/* 로그인 전 */}
      {!userData && (
        <section className="flex items-center max-w-[1440px] h-[475px] bg-gray-800 mx-auto">
          <img src={heroImage} className="h-full object-contain" />

          <div className="flex flex-col items-center gap-4 w-[50%] ps-10 pr-[115px]">
            <h2 className="font-DungGeunMo text-heading-32 text-primary-500 font-normal">★ 팀 빌딩 커뮤니티 ★</h2>

            <div className="flex flex-col items-center text-base my-5 text-white">
              <p>팀빌딩 커뮤니티에서는 참여할 프로젝트를 살펴보거나</p>
              <p>함께 게임을 만들 팀원을 구할 수 있습니다.</p>
              <p>로그인해 자신의 프로필을 등록하면 더 좋은 프로젝트를 만날 수 있을거에요!</p>
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
      {/* 로그인 후 */}
      {userData && (
        <section className="flex items-center gap-[60px] w-full h-[475px] bg-gray-800 max-w-[1440px] mx-auto">
          <img src={heroImage} />
          <div className="flex flex-col justify-center gap-4 items-center w-[50%] ps-12">
            <h2 className="font-DungGeunMo text-heading-32 text-primary-500 font-normal">★ 팀 빌딩 커뮤니티 ★</h2>

            <div className="flex flex-col items-center text-body-18 text-center my-5 text-white">
              <p>
                팀빌딩 커뮤니티에서는 참여할 프로젝트를 살펴보거나
                <br />
                함께 게임을 만들 팀원을 구할 수 있습니다.
                <br />
                글을 등록해 팀원을 모집하거나 프로젝트를 구해보세요!
              </p>
            </div>
          </div>
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

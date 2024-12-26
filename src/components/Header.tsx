import { Link } from "react-router-dom";

import titleImage from "../assets/titleImage.svg";
import balloon from "../assets/headerImage/balloon.svg";
import CategoryModal from "./headerComponents/CategoryModal";

import { userStore } from "../share/store/userStore";
import useModalToggles from "../hook/useModalToggles";
import UserStatusPopover from "./headerComponents/UserStatusPopover";
import SpartaModal from "../spartaDesignSystem/SpartaModal";
import Login from "./HomeComponents/Login";
import SpartaReactionModal from "../spartaDesignSystem/SpartaReactionModal";

const Header = () => {
  const LOGIN_MODAL_ID = "loginModal";
  const LOG_OUT_MODAL_ID = "logOutModal";

  const { modalToggles, modalRefs, onClickModalToggleHandlers } = useModalToggles([
    "category",
    "userStatus",
    LOGIN_MODAL_ID,
    LOG_OUT_MODAL_ID,
  ]);
  const { userData, logout } = userStore();

  //임시 로그인 "example@example.com", "examplepasswordA1"

  return (
    <header className="flex justify-between items-center py-5 px-[30px] w-[100%] h-20 bg-gray-800 ">
      <section className="flex items-center gap-4">
        <img src="" alt="스파르타 게임 아이콘" className="w-12 h-12 rounded-full" />
        <Link to={"/"}>
          <h1>
            <img src={titleImage} />
          </h1>
        </Link>
      </section>
      <section className="flex items-center gap-10 text-heading-24 font-normal font-DungGeunMo text-white">
        <img src={balloon} alt="검색 아이콘" />
        {/* <img src={speaker} alt="알림 아이콘" /> */}
        <div className="relative">
          <p onClick={onClickModalToggleHandlers.category} className="cursor-pointer">
            카테고리
          </p>
          {modalToggles.category && (
            <CategoryModal
              modalRef={modalRefs.category}
              onClickModalToggleHandler={onClickModalToggleHandlers.category}
            />
          )}
        </div>
        <Link to={"/game-upload"}>
          <p>게임 업로드</p>
        </Link>
        {/* <Link to={"/my-page"}>
          <p>커뮤니티</p>
        </Link> */}
        <div onClick={onClickModalToggleHandlers.userStatus} className="cursor-pointer">
          {userData ? <p>마이페이지</p> : <p>로그인/회원가입</p>}
          {modalToggles.userStatus && (
            <UserStatusPopover
              isLogin={!!userData}
              modalRef={modalRefs.userStatus}
              onClickModalToggleHandler={onClickModalToggleHandlers.userStatus}
              loginHandler={() => onClickModalToggleHandlers[LOGIN_MODAL_ID]()}
              logoutHandler={() => onClickModalToggleHandlers[LOG_OUT_MODAL_ID]()}
            />
          )}
        </div>
      </section>
      <SpartaModal
        isOpen={modalToggles[LOGIN_MODAL_ID]}
        onClose={onClickModalToggleHandlers[LOGIN_MODAL_ID]}
        modalId={LOGIN_MODAL_ID}
      >
        <Login onClose={onClickModalToggleHandlers[LOGIN_MODAL_ID]} />
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
            logout();
            onClickModalToggleHandlers[LOG_OUT_MODAL_ID]();
          },
        }}
        btn2={{
          text: "취소",
          onClick: () => {
            console.log("취소");
          },
        }}
      />
    </header>
  );
};

export default Header;

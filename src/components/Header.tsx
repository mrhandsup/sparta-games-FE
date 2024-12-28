import { Link, useNavigate } from "react-router-dom";

import titleImage from "../assets/titleImage.svg";
import balloon from "../assets/headerImage/balloon.svg";
import CategoryModal from "./headerComponents/CategoryModal";

import { userStore } from "../share/store/userStore";
import useModalToggles from "../hook/useModalToggles";
import UserStatusPopover from "./headerComponents/UserStatusPopover";
import SpartaModal from "../spartaDesignSystem/SpartaModal";
import Login from "./HomeComponents/Login";
import SpartaReactionModal from "../spartaDesignSystem/SpartaReactionModal";
import type { TSpartaReactionModalProps } from "../spartaDesignSystem/SpartaReactionModal";
import { useState } from "react";
import Search from "./headerComponents/SearchModal";

const Header = () => {
  const LOGIN_MODAL_ID = "loginModal";
  const NO_ACTION_MODAL_ID = "noActionModal";
  const SEARCH_MODAL_ID = "searchModal";

  const { modalToggles, modalRefs, onClickModalToggleHandlers } = useModalToggles([
    "category",
    "userStatus",
    LOGIN_MODAL_ID,
    NO_ACTION_MODAL_ID,
    SEARCH_MODAL_ID,
  ]);
  const { userData, logout } = userStore();

  const navigate = useNavigate();
  const noActionData: { [key: string]: Partial<TSpartaReactionModalProps> } = {
    gameupload: {
      title: "잠시만요!",
      content: "게임 업로드는 회원들만 이용가능합니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "alert",
    },
    community: {
      title: "개발예정 기능",
      content: "커뮤니티 기능은 개발 예정입니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "error",
    },
    logout: {
      title: "로그아웃",
      content: "정말 로그아웃 하시겠습니까?",
      btn1: {
        text: "로그아웃",
        onClick: () => {
          logout();
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      btn2: {
        text: "취소",
        onClick: () => {
          console.log("취소");
        },
      },
    },
  };
  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.gameupload,
  );

  //임시 로그인 "example@example.com", "examplepasswordA1"

  return (
    <header className="flex justify-between items-center py-5 px-[30px] w-[100%] h-20 bg-gray-800 ">
      {/* 제목 */}
      <section className="flex items-center gap-4">
        <img src="" alt="스파르타 게임 아이콘" className="w-12 h-12 rounded-full" />
        <Link to={"/"}>
          <h1>
            <img src={titleImage} />
          </h1>
        </Link>
      </section>
      {/* 메뉴 */}
      <section className="flex items-center gap-10 text-heading-24 font-normal font-DungGeunMo text-white">
        {/* 검색 */}
        <img
          src={balloon}
          alt="검색 아이콘"
          onClick={() => onClickModalToggleHandlers[SEARCH_MODAL_ID]()}
          className="cursor-pointer"
        />
        {/* <img src={speaker} alt="알림 아이콘" /> */}
        {/* 카테고리 */}
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
        {/* 게임 업로드 */}
        <div
          onClick={() => {
            if (userData) {
              navigate("/game-upload");
            } else {
              setNoActionModalData(noActionData.gameupload);
              onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
            }
          }}
          className="cursor-pointer"
        >
          <p>게임 업로드</p>
        </div>
        {/* 커뮤니티 */}
        <div
          onClick={() => {
            setNoActionModalData(noActionData.community);
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
          }}
          className="cursor-pointer"
        >
          <p>커뮤니티</p>
        </div>
        {/* 유저 액션 */}
        <div onClick={onClickModalToggleHandlers.userStatus} className="cursor-pointer">
          {userData ? <p>마이페이지</p> : <p>로그인/회원가입</p>}
          {/* 유저액션 팝오버 */}
          {modalToggles.userStatus && (
            <UserStatusPopover
              isLogin={!!userData}
              modalRef={modalRefs.userStatus}
              onClickModalToggleHandler={onClickModalToggleHandlers.userStatus}
              loginHandler={() => onClickModalToggleHandlers[LOGIN_MODAL_ID]()}
              logoutHandler={() => {
                setNoActionModalData(noActionData.logout);
                onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
              }}
            />
          )}
        </div>
      </section>
      {/* 로그인 모달 */}
      <SpartaModal
        isOpen={modalToggles[LOGIN_MODAL_ID]}
        onClose={onClickModalToggleHandlers[LOGIN_MODAL_ID]}
        modalId={LOGIN_MODAL_ID}
      >
        <Login onClose={onClickModalToggleHandlers[LOGIN_MODAL_ID]} />
      </SpartaModal>
      {/* 단순 모달 */}
      {noActionModalData && (
        <SpartaReactionModal
          isOpen={modalToggles[NO_ACTION_MODAL_ID]}
          onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
          modalId={NO_ACTION_MODAL_ID}
          title={noActionModalData.title || ""}
          content={noActionModalData.content || ""}
          btn1={{
            text: noActionModalData?.btn1?.text || "",
            onClick: noActionModalData?.btn1?.onClick || (() => {}),
          }}
          btn2={
            noActionModalData?.btn2 && {
              text: noActionModalData?.btn2?.text || "",
              onClick: noActionModalData?.btn2?.onClick || (() => {}),
            }
          }
          type={noActionModalData.type}
        />
      )}
      {/* 검색 모달 */}
      <SpartaModal
        isOpen={modalToggles[SEARCH_MODAL_ID]}
        onClose={onClickModalToggleHandlers[SEARCH_MODAL_ID]}
        modalId={SEARCH_MODAL_ID}
        title="검색"
      >
        <Search onClose={onClickModalToggleHandlers[SEARCH_MODAL_ID]} />
      </SpartaModal>
    </header>
  );
};

export default Header;

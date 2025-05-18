import { Link, useNavigate } from "react-router-dom";

import titleImage from "../assets/titleImage.svg";
import logo from "../assets/common/logo.svg";
import balloon from "../assets/headerImage/balloon.svg";
import CategoryModal from "./headerComponents/CategoryModal";

import { userStore } from "../share/store/userStore";
import useModalToggles from "../hook/useModalToggles";
import UserStatusPopover from "./headerComponents/UserStatusPopover";
import SpartaModal from "../spartaDesignSystem/SpartaModal";
import Login from "./homeComponents/Login";
import SpartaReactionModal from "../spartaDesignSystem/SpartaReactionModal";
import type { TSpartaReactionModalProps } from "../spartaDesignSystem/SpartaReactionModal";
import { useState } from "react";
import Search from "./headerComponents/SearchModal";

const Header = () => {
  const LOGIN_MODAL_ID = "loginModal";
  const NO_ACTION_MODAL_ID = "noActionModal";
  const SEARCH_MODAL_ID = "searchModal";

  // 모달
  const { modalToggles, modalRefs, onClickModalToggleHandlers } = useModalToggles([
    "category",
    "userStatus",
    LOGIN_MODAL_ID,
    NO_ACTION_MODAL_ID,
    SEARCH_MODAL_ID,
  ]);

  // 유저 정보
  const { userData, logout } = userStore();

  const navigate = useNavigate();

  // 단순 모달 데이터 config
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
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
    },
  };

  // 단순 모달 데이터
  const [noActionModalData, setNoActionModalData] = useState<Partial<TSpartaReactionModalProps>>(
    noActionData.gameupload,
  );

  //임시 로그인 "example@example.com", "examplepasswordA1"

  // 비로그인, 일반유저 메뉴 config
  const generalUserMenu = [
    {
      text: "게임 업로드",
      onClick: () => {
        if (userData) {
          navigate("/game-upload");
        } else {
          setNoActionModalData(noActionData.gameupload);
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        }
      },
    },
    {
      text: "커뮤니티",
      onClick: () => {
        setNoActionModalData(noActionData.community);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
      },
    },
  ];

  // 어드민 메뉴 config
  const adminUserMenu = [
    {
      text: "대시 보드",
      onClick: () => {
        navigate("/admin/dashboard");
      },
    },
    {
      text: "게임 로그",
      onClick: () => {
        navigate("/admin/game-log");
      },
    },
    {
      text: "커뮤니티 로그",
      onClick: () => {
        setNoActionModalData(noActionData.community);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
      },
    },
    {
      text: "로그아웃",
      onClick: () => {
        setNoActionModalData(noActionData.logout);
        onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
      },
    },
  ];

  return (
    <header className="max-w-[1440px] flex justify-between items-center py-5 px-[30px] w-full h-20">
      {/* 제목 */}
      <section className="flex items-center gap-4">
        <img src={logo} alt="스파르타 게임 아이콘" className="w-12 h-12 rounded-full" />
        <Link to={userData && userData.data.is_staff ? "/admin/dashboard" : "/"}>
          <h1>
            <img src={titleImage} />
          </h1>
        </Link>
      </section>
      {/* 메뉴 */}
      <section className="flex items-center gap-10 text-heading-24 font-normal font-DungGeunMo text-white">
        {/* 검색 */}
        {!userData?.data.is_staff && (
          <img
            src={balloon}
            alt="검색 아이콘"
            onClick={() => onClickModalToggleHandlers[SEARCH_MODAL_ID]()}
            className="cursor-pointer hover:text-primary-500"
          />
        )}
        {/* 카테고리 */}
        {!userData?.data.is_staff && (
          <div className="relative">
            <p onClick={onClickModalToggleHandlers.category} className="cursor-pointer hover:text-primary-500">
              카테고리
            </p>
            {modalToggles.category && (
              <CategoryModal
                modalRef={modalRefs.category}
                onClickModalToggleHandler={onClickModalToggleHandlers.category}
              />
            )}
          </div>
        )}
        {/* 일반 유저 , 어드민 메뉴 */}
        {userData && userData.data.is_staff
          ? adminUserMenu.map((menu, index) => (
              <div key={index} onClick={menu.onClick} className="cursor-pointer hover:text-primary-500">
                <p>{menu.text}</p>
              </div>
            ))
          : generalUserMenu.map((menu, index) => (
              <div key={index} onClick={menu.onClick} className="cursor-pointer hover:text-primary-500">
                <p>{menu.text}</p>
              </div>
            ))}

        {/* 유저 액션 */}
        {!userData?.data.is_staff && (
          <div className="cursor-pointer relative" ref={modalRefs.userStatus}>
            {userData?.data ? (
              <p onClick={onClickModalToggleHandlers.userStatus} className="hover:text-primary-500">
                마이페이지
              </p>
            ) : (
              <p onClick={onClickModalToggleHandlers[LOGIN_MODAL_ID]} className="hover:text-primary-500">
                로그인/회원가입
              </p>
            )}
            {/* 유저액션 팝오버 */}
            {modalToggles.userStatus && (
              <UserStatusPopover
                isLogin={!!userData}
                userId={userData?.data.user_id}
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
        )}
      </section>
      {/* 로그인 모달 */}
      <SpartaModal
        isOpen={modalToggles[LOGIN_MODAL_ID]}
        onClose={onClickModalToggleHandlers[LOGIN_MODAL_ID]}
        closeOnClickOutside={false}
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

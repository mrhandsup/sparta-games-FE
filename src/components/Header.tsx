import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { userStore } from "../share/store/userStore";

import useModalToggles from "../hook/useModalToggles";
import UserStatusPopover from "./headerComponents/UserStatusPopover";
import SpartaModal from "../spartaDesignSystem/SpartaModal";
import Login from "./homeComponents/Login";
import SpartaReactionModal from "../spartaDesignSystem/SpartaReactionModal";
import Search from "./headerComponents/SearchModal";

import type { TSpartaReactionModalProps } from "../spartaDesignSystem/SpartaReactionModal";

import titleImage from "../assets/titleImage.svg";
import logo from "../assets/common/logo.svg";
import balloon from "../assets/headerImage/balloon.svg";
import notifyImage from "../assets/headerImage/notify.svg";
import CategoryModal from "./headerComponents/CategoryModal";
import gameUploadImage from "../assets/headerImage/gameUpload.svg";
import bookmarkImage from "../assets/gameDetail/bookmark.svg";

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
      content: "알림 기능은 개발 예정입니다.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "error",
    },

    bookmark: {
      title: "잠시만요!",
      content: "즐겨찾기 이동은 로그인 후에 이용해주세요.",
      btn1: {
        text: "확인했습니다",
        onClick: () => {
          onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
        },
      },
      type: "alert",
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
    <header className="max-w-[1180px] flex justify-between items-center w-full h-[60px]">
      {/* 제목 */}
      <section className="flex items-center gap-5 font-DungGeunMo text-lg text-white">
        <div className="flex items-center gap-2">
          <img src={logo} alt="메인 로고 아이콘" className="w-10 h-10 rounded-full" />
          <Link to={userData && userData.data.is_staff ? "/admin/dashboard" : "/"}>
            <h1>
              <img src={titleImage} alt="메인 로고 타이틀" className="w-52" />
            </h1>
          </Link>
        </div>

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

        <div
          onClick={() => {
            navigate("/community/team-building");
          }}
          className="cursor-pointer hover:text-primary-500"
        >
          <p>팀빌딩</p>
        </div>
      </section>
      {/* 메뉴 */}
      <section className="flex items-center gap-4 text-lg font-normal font-DungGeunMo text-white">
        {/* 일반 유저 , 어드민 메뉴 */}
        {userData && userData.data.is_staff ? (
          adminUserMenu.map((menu, index) => (
            <div key={index} onClick={menu.onClick} className="cursor-pointer hover:text-primary-500">
              <p>{menu.text}</p>
            </div>
          ))
        ) : (
          <div
            onClick={() => {
              if (userData) {
                navigate("/game-upload");
              } else {
                setNoActionModalData(noActionData.gameupload);
                onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
              }
            }}
            className="cursor-pointer hover:text-primary-500"
          >
            <div className="flex gap-2">
              <img className="w-6 h-6" src={gameUploadImage} alt="게임 업로드 이미지" />
              <p>게임 업로드</p>
            </div>
          </div>
        )}
        <span className="text-gray-400 text-xl">•</span>
        {/* 검색 */} {/* 유저 액션 */}
        {!userData?.data.is_staff && (
          <div className="flex gap-4">
            <img
              src={balloon}
              alt="검색 아이콘"
              onClick={() => onClickModalToggleHandlers[SEARCH_MODAL_ID]()}
              className="w-6 h-6 cursor-pointer hover:text-primary-500"
            />

            <img
              src={notifyImage}
              alt="알림 아이콘"
              onClick={() => {
                setNoActionModalData(noActionData.community);
                onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
              }}
              className="w-6 h-6 cursor-pointer hover:text-primary-500"
            />

            <img
              src={bookmarkImage}
              alt="즐겨찾기 아이콘"
              onClick={() => {
                if (userData) {
                  navigate(`/my-page/${userData?.data.user_id}?tab=log`);
                } else {
                  setNoActionModalData(noActionData.bookmark);
                  onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
                }
              }}
              className="w-6 h-6 cursor-pointer hover:text-primary-500"
            />

            <div className="cursor-pointer relative" ref={modalRefs.userStatus}>
              {userData?.data ? (
                <p onClick={onClickModalToggleHandlers.userStatus} className="text-primary-500 text-[20px]">
                  {userData.data.nickname}
                </p>
              ) : (
                <p onClick={onClickModalToggleHandlers[LOGIN_MODAL_ID]} className="hover:text-primary-500 text-[20px]">
                  로그인
                </p>
              )}
              {/* 유저액션 팝오버 */}
              {modalToggles.userStatus && (
                <UserStatusPopover
                  isLogin={!!userData}
                  userId={userData?.data.user_id}
                  onClickModalToggleHandler={onClickModalToggleHandlers.userStatus}
                  loginHandler={() => onClickModalToggleHandlers[LOGIN_MODAL_ID]()}
                  logoutHandler={() => {
                    setNoActionModalData(noActionData.logout);
                    onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
                  }}
                />
              )}
            </div>
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

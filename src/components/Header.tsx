import { Link } from "react-router-dom";

import titleImage from "../assets/titleImage.svg";
import balloon from "../assets/headerImage/balloon.svg";
import speaker from "../assets/headerImage/speaker.svg";
import CategoryModal from "./headerComponents/CategoryModal";

import useModalToggle from "../hook/useModalToggle";
import { userStore } from "../share/store/userStore";

const Header = () => {
  const { modalToggle, modalRef, onClickModalToggleHandler } = useModalToggle();
  const { userData } = userStore();

  return (
    <header className="flex justify-between items-center py-5 px-[30px] w-full h-20 bg-gray-800 font-DungGeunMo text-white">
      <section className="flex items-center gap-4">
        <img src="" alt="스파르타 게임 아이콘" className="w-12 h-12 rounded-full" />
        <Link to={"/"}>
          <h1>
            <img src={titleImage} />
          </h1>
        </Link>
      </section>
      <section className="flex items-center gap-10 text-heading-24 font-normal">
        <img src={balloon} alt="검색 아이콘" />
        <img src={speaker} alt="알림 아이콘" />
        <div className="relative">
          <p onClick={onClickModalToggleHandler} className="cursor-pointer">
            카테고리
          </p>
          {modalToggle && <CategoryModal modalRef={modalRef} onClickModalToggleHandler={onClickModalToggleHandler} />}
        </div>

        <Link to={"/game-upload"}>
          <p>게임 업로드</p>
        </Link>

        <Link to={"/community"}>
          <p>커뮤니티</p>
        </Link>
        {userData ? (
          <Link to={"/mypage"}>
            <p>마이페이지</p>
          </Link>
        ) : (
          <p>로그인/회원가입</p>
        )}
      </section>
    </header>
  );
};

export default Header;

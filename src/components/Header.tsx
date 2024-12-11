import { Link } from "react-router-dom";

import titleImage from "../assets/titleImage.svg";
import balloon from "../assets/headerImage/balloon.svg";
import speaker from "../assets/headerImage/speaker.svg";
import CategoryModal from "./headerComponents/CategoryModal";

import { userStore } from "../share/store/userStore";
import { login } from "../api/login";
import useModalToggles from "../hook/useModalToggles";
import UserStatusPopover from "./headerComponents/UserStatusPopover";

const Header = () => {
  const { modalToggles, modalRefs, onClickModalToggleHandlers } = useModalToggles(["category", "userStatus"]);
  const { userData, setUser } = userStore();

  //임시 로그인
  //TODO : 여기 지우고 로그인 페이지 만들어서 로그인 처리하기
  const fetchLogin = async () => {
    const logindata = await login("example@example.com", "examplepasswordA1");
    console.log(logindata);
    sessionStorage.setItem("accessToken", logindata?.data.access);
    sessionStorage.setItem("refreshToken", logindata?.data.refresh);
    setUser(logindata?.data.access);
  };

  console.log(modalToggles);

  return (
    <header className="flex justify-between items-center py-5 px-[30px] w-[100%] h-20 bg-gray-800 font-DungGeunMo text-white">
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
              isLogin={userData}
              modalRef={modalRefs.userStatus}
              onClickModalToggleHandler={onClickModalToggleHandlers.userStatus}
              loginHandler={fetchLogin}
            />
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;

import searchIcon from "../assets/common/search.svg";
import alert from "../assets/common/alert.svg";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-5 px-[30px] w-full h-20 bg-gray-800 text-white">
      <section className="flex items-center gap-4">
        <img src="" alt="스파르타 게임 아이콘" className="w-12 h-12 rounded-full" />
        <h1 className="text-heading-32 text-primary-500">Sparta Games</h1>
      </section>
      <section className="flex items-center gap-10">
        <img src={searchIcon} alt="검색 아이콘" />
        <img src={alert} alt="알림 아이콘" />
        <p>카테고리</p>
        <p>게임 업로드</p>
        <p>커뮤니티</p>
        <p>로그인/회원가입</p>
      </section>
    </header>
  );
};

export default Header;

import searchIcon from "../assets/common/search.svg";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-5 px-[30px] w-full h-20">
      <section className="flex items-center gap-4">
        <img
          src=""
          alt="스파르타 게임 아이콘"
          className="w-12 h-12 rounded-full"
        />
        <h1 className="text-5xl font-bold">Sparta Games</h1>
      </section>
      <section className="flex items-center gap-10">
        <form>
          <div className="flex p-1 border border-solid border-black rounded-lg">
            <input type="text" />
            <img src={searchIcon} alt="검색 아이콘" />
          </div>
        </form>
        <p>카테고리</p>
        <p>게임 업로드</p>
        <p>커뮤니티</p>
        <p>로그인/회원가입</p>
      </section>
    </header>
  );
};

export default Header;

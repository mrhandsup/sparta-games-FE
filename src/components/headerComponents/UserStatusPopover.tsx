import { Link } from "react-router-dom";

type props = {
  isLogin: boolean;
  userId?: number;
  onClickModalToggleHandler: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  loginHandler: () => void;
  logoutHandler?: () => void;
};

const UserStatusPopover = ({
  isLogin,
  userId,
  modalRef,
  onClickModalToggleHandler,
  loginHandler,
  logoutHandler,
}: props) => {
  return (
    <div
      ref={modalRef}
      onClick={onClickModalToggleHandler}
      className={`absolute top-20 ${
        isLogin ? "right-0" : "right-5"
      } flex gap-5 py-5 px-10 bg-gray-800 border border-solid border-primary-500 rounded-[20px] w-fit`}
    >
      {isLogin ? (
        <div className="flex flex-col items-center gap-6 w-fit">
          <Link to={`/my-page/${userId}`}>
            <p className="hover:text-primary-500 w-fit">마이페이지</p>
          </Link>
          <div onClick={logoutHandler}>
            <p className="hover:text-primary-500 w-fit">로그아웃</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <div onClick={loginHandler}>
            <p className="hover:text-primary-500">로그인</p>
          </div>
          <Link to={`/`}>
            <p className="hover:text-primary-500">회원가입</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserStatusPopover;

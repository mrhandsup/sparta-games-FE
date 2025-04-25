import { AiFillCaretRight } from "react-icons/ai";

import GameCard from "./GameCard";
import { Link, useNavigate } from "react-router-dom";
import { TGameData } from "../../types";

type TGameCardListProps = {
  /**
   * 게임 데이터
   */
  data?: TGameData[] | undefined;
  /**
   * 최대 표시할 게임 수
   */
  maxNum?: number;
  /**
   * 하위 컴포넌트
   */
  children?: React.ReactNode;
  /**
   * 간단한 카드
   */
  simple?: boolean;
  /**
   * 네비게이션 없음
   */
  noNavigation?: boolean;
  /**
   * 네비게이션 동작
   */
  navigateFn?: () => void;
  /**
   * 네비게이션 이동 경로
   */
  to?: string;
  /**
   * 컨테이너 클래스명
   */
  containerClassName?: string;
  /**
   * 가로로 표시
   */
  row?: boolean;
  /**
   * 데이터 없을 시 표시할 문구
   */
  emptyText?: string;
};

const GameCardList = ({
  data,
  children,
  maxNum = 4,
  simple,
  noNavigation,
  navigateFn,
  to,
  containerClassName,
  row,
  emptyText = "데이터가 없습니다.",
}: TGameCardListProps) => {
  const slicingData = data?.slice(0, maxNum);

  const baseClassName = "flex flex-col justify-evenly w-full h-[536px] item-center ";

  const navigate = useNavigate();

  return (
    <div className={containerClassName ? containerClassName : baseClassName}>
      {children && (
        <p
          className={`flex justify-between items-center mx-auto  ${
            !containerClassName ? "w-[1180px]" : "w-full"
          } h-12 text-5xl font-bold
          
          `}
        >
          {children}
          {!noNavigation && (
            <AiFillCaretRight
              className="w-8 h-8 text-white cursor-pointer"
              onClick={to ? () => navigate(to) : navigateFn ? navigateFn : undefined}
            />
          )}
        </p>
      )}

      <div className={`flex ${!containerClassName && "w-[1180px] h-[408px] mx-auto mt-2"} gap-4`}>
        {slicingData?.length != 0 && slicingData ? (
          slicingData.map((item) => (
            <Link to={`/game-detail?id=${item.id}`}>
              <GameCard item={item} simple={simple} row={row} />
            </Link>
          ))
        ) : (
          <div className="h-[208px] min-w-[880px] flex items-center justify-center mx-auto">
            <p className="text-white text-heading-20">{emptyText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCardList;

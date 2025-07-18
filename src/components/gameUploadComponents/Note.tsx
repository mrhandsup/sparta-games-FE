import { useState } from "react";
import CheckBox from "../common/CheckBox";
import { AiFillCaretUp } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";

type Props = {
  state: {
    1: boolean;
    2: boolean;
    3: boolean;
  };
  onClickHandler: (arg: 1 | 2 | 3) => void;
};

const Note = ({ onClickHandler, state }: Props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const allChecked = state[1] && state[2] && state[3];

  const toggleTerms = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="px]">
      <div
        className={`overflow-hidden transition-all duration-500 
          ${isExpanded && allChecked ? "max-h-0 opacity-0" : "max-h-[500px] opacity-100"}
         `}
      >
        <div className="flex flex-col gap-3 py-5 px-10 bg-[#171717] rounded-[20px]">
          {allChecked ? (
            <div className="flex justify-between">
              <p className="text-lg font-medium text-[#05F500]">약관을 전부 확인하셨습니다.</p>
              <div onClick={toggleTerms} className="flex items-center gap-2 cursor-pointer">
                <span className="text-gray-100">약관 접기</span>
                <AiFillCaretUp size={22} color={"#BFBFBF"} />
              </div>
            </div>
          ) : (
            <p className="text-lg font-bold text-[#FF5C5C]">게임 업로드 전, 아래 유의사항을 반드시 확인하여 주세요.</p>
          )}
          <ol className="text-title-18 text-white leading-[130%]">
            <li className="relative">
              1. Sparta Games에 오신걸 환영합니다
              <ol className="list-alpha ml-12 text-body-18">
                <li>Player에게는 다양한 인디게임을 체험하고, 경험할 수 있게 합니다.</li>
                <li>
                  Maker에게는 게임 소개할 수 있고, 자유로운 피드백을 받고, 게임업계의 사람들과 소통하며 본인의 실력을
                  디벨롭 할 수 있게 합니다.
                </li>
              </ol>
              <CheckBox check={state[1]} onClickHandler={() => onClickHandler(1)} />
            </li>
            <hr className="w-full h-[1px] bg-gray-500 my-2" />
            <li className="relative">
              2. 이러한 가치를 전달하기 위해, 아래와 지침을 통해 Player와 Maker에게 좋은 서비스를 제공하고자 합니다.
              <br />{" "}
              <span className="ms-5">
                지침을 준수하지 않은 경우, 서비스 관리자에 의해 게임이 삭제되거나 활동이 제한될 수 있습니다.
              </span>
              <ol className="list-alpha ml-12 text-body-18">
                <li>정상적인 게임 플레이가 어려울 정도로 미개발된 상태인 경우</li>
                <li>광과민성 발작을 일으킬 수 있는 지나친 이펙트 효과가 사용된 경우</li>
                <li>해당 게임과 관련 없는 태그가 사용된 경우</li>
                <li>실존하는 서비스 · 인물 · 브랜드 등의 가치를 훼손할 수 있는 컨텐츠를 업로드하는 경우</li>
                <li>현금성 도박 또는 사기가 포함되거나 유사한 컨텐츠를 업로드하는 경우</li>
                <li>오해의 소지가 있는 컨텐츠를 업로드 하는 경우</li>
              </ol>
              <CheckBox check={state[2]} onClickHandler={() => onClickHandler(2)} />
            </li>
            <hr className="w-full h-[1px] bg-gray-500 my-2" />
            <li className="relative">
              3. 게임은 검수 이후 홈페이지에 릴리즈 됩니다.
              <ol className="list-alpha ml-12 text-body-18">
                <li>최대 7일간의 검수과정이 걸릴 수 있습니다.</li>
                <li>
                  검수에 통과되었다 하더라도, 2번의 신고와 또는 실제 유저 플레이 이후 문제가 발견될 경우 별도의 조치가
                  진행될 수 있습니다.
                </li>
              </ol>
              <CheckBox check={state[3]} onClickHandler={() => onClickHandler(3)} />
            </li>
          </ol>
        </div>
      </div>

      {allChecked && isExpanded && (
        <div className="flex justify-between items-center mt-2 px-10 py-5 rounded-3xl bg-gray-800">
          <p className="text-lg font-medium text-primary-500">업로드 준비가 완료되었습니다.</p>
          <div onClick={toggleTerms} className="flex items-center gap-2 cursor-pointer">
            <span className="text-gray-100">약관 다시 확인하기</span>
            <AiFillCaretDown size={22} color={"#BFBFBF"} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Note;

import CheckBox from "../common/CheckBox";

type Props = {
  state: {
    1: boolean;
    2: boolean;
    3: boolean;
  };
  onClickHandler: (arg: 1 | 2 | 3) => void;
};

const Note = ({ onClickHandler, state }: Props) => {
  return (
    <section className="mx-[130px]">
      <div className="flex flex-col gap-3 py-5 px-10 bg-[#171717] rounded-[20px]">
        <p className="text-title-22 text-[#FF5C5C]">게임 업로드 전, 아래 유의사항을 반드시 확인하여 주세요.</p>
        <ol className="list-decimal text-title-18 text-white leading-[130%]">
          <li className="relative">
            Sparta Games에 오신걸 환영합니다
            <ol className="list-alpha ml-5 mr-9 text-body-18">
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
            이러한 가치를 전달하기 위해, 아래와 지침을 통해 Player와 Maker에게 좋은 서비스를 제공하고자 합니다.
            <br /> 지침을 준수하지 않은 경우, 서비스 관리자에 의해 게임이 삭제되거나 활동이 제한될 수 있습니다.
            <ol className="list-alpha ml-5 mr-9 text-body-18">
              <li>업로드 및 서비스 된 게임의 플레이가 어려울 정도로 미개발 상태인 경우</li>
              <li>광고성 발작을 일으킬 수 있는 지나친 이펙트 효과가 사용된 경우</li>
              <li>게임과 관련없는 태그가 사용된 경우</li>
              <li>실제 실존하는 서비스/인물/브랜드 등의 가치를 훼손할 수 있는 컨텐츠가 포함의 경우</li>
              <li>실제 현금성 도박 또는 사기와 비슷한 컨텐츠를 만드는 경우</li>
              <li>오해의 소지가 있는 컨텐츠를 업로드 하는 경우</li>
            </ol>
            <CheckBox check={state[2]} onClickHandler={() => onClickHandler(2)} />
          </li>
          <hr className="w-full h-[1px] bg-gray-500 my-2" />
          <li className="relative">
            게임은 검수 이후 홈페이지에 릴리즈 됩니다.
            <ol className="list-alpha ml-5 mr-9 text-body-18">
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
    </section>
  );
};

export default Note;

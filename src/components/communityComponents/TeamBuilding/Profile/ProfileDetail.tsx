import { useNavigate } from "react-router-dom";
import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";

import defaultProfile from "../../../../assets/common/defaultProfile.svg";
import portfolioImage from "../../../../assets/portfolioImage.png";
import linkImage from "../../../../assets/linkImage.png";
import githubImage from "../../../../assets/githubImage.png";
import notionImage from "../../../../assets/notionImage.png";

type Props = {
  user?: boolean;
};
export default function ProfileDetail({ user }: Props) {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-800 rounded-xl px-11 py-14 flex flex-col gap-4 w-full">
        {/* 내 팀빌팅 프로필이 없는 경우 */}
        {/* <div className="flex items-start">
        <p className="font-DungGeunMo text-heading-32 text-white font-normal">닉네임의 커리어 프로필</p>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center text-center gap-12">
          <p className="pt-16 font-DungGeunMo text-heading-20 text-gray-100 font-normal leading-6">
            작성된 커리어 프로필이 없습니다.
            <br />
            커리어 프로필을 등록하고
            <br />
            나에게 맞는 사이드 프로젝트를 만나보세요!
          </p>
          <SpartaButton
            content="커리어 프로필 등록하기"
            type="filled"
            width="w-full"
            onClick={() => {
              navigate("/team-building/profile-create");
            }}
          />
        </div>
      </div> */}

        {/* 내 팀필딩 프로필이 있는 경우 */}
        <div className="flex">
          <div className="flex items-center gap-6 w-[90%]">
            <img
              className="w-20 h-20 object-cover border border-solid border-gray-400 rounded-sm"
              src={defaultProfile}
              alt="프로필 이미지"
            />
            <p className="font-DungGeunMo text-heading-24 text-white font-normal">[닉네임]님의 팀빌딩 프로필</p>
          </div>
          <div className={`flex justify-end items-center ${user ? "block" : "hidden"}`}>
            <SpartaButton content="팀빌딩 프로필 수정" size="small" colorType="grey" width="w-[170px]" />
          </div>
        </div>

        <div className="flex flex-col gap-8 text-white text-base">
          {/* 상태 및 기본 정보 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center">
              <span className="w-44 font-bold">현재 구직상태</span>
              <span>취업준비생</span>
            </div>
            <div className="flex items-center">
              <span className="w-44 font-bold">구인 포지션</span>
              <span>UXUI</span>
            </div>
            <div className="flex items-center">
              <span className="w-44 font-bold">관심 게임개발장르</span>
              <div className="flex gap-2 font-DungGeunMo">
                <span className="bg-white px-2 py-1 rounded text-sm text-gray-700">RPG</span>
                <span className="bg-white px-2 py-1 rounded text-sm text-gray-700">Arcade</span>
                <span className="bg-white px-2 py-1 rounded text-sm text-gray-700">Survival</span>
              </div>
            </div>
            <div className="grid grid-cols-[176px_1fr]">
              <span className="font-bold">보유 기술스택</span>
              <span className="w-full line-clamp-2">
                Figma, Framer, 기타 등등 그래픽 툴 등을 다룰 수 있습니다. 최대 2줄까지 작성 가능 Figma, Framer, 기타
                등등 그래픽 툴 등을 다룰 수 있습니다. 최대 2줄까지 작성 가능Figma, Framer, 기타 등등 그래픽 툴 등을 다룰
                수 있습니다. 최대 2줄까지 작성 가능Figma, Framer, 기타 등등 그래픽 툴 등을 다룰 수 있습니다. 최대
                2줄까지 작성 가능 Figma, Framer, 기타 등등 그래픽 툴 등을 다룰 수 있습니다. 최대 2줄까지 작성 가능
              </span>
            </div>
            <div className="flex  items-start">
              <span className="w-44 font-bold">포트폴리오 및 링크</span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <img className="w-5 h-5" src={portfolioImage} alt="포트폴리오 링크" />
                  <a href="#" className="text-white underline">
                    https://discord.com/channels/1239427413876805642/1282689559552987188
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <img className="w-5 h-5" src={linkImage} alt="사용자 임의 링크" />
                  <a href="#" className="text-white underline">
                    https://discord.com/channels/1239427413876805642/1282689559552987188
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <img className="w-5 h-5" src={githubImage} alt="Github 링크" />
                  <a href="#" className="text-white underline">
                    https://discord.com/channels/1239427413876805642/1282689559552987188
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <img className="w-5 h-5" src={notionImage} alt="Notion 링크" />
                  <a href="#" className="text-white underline">
                    https://discord.com/channels/1239427413876805642/1282689559552987188
                  </a>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-700 my-3" />

          {/* 프로젝트 정보 */}
          <div className="flex">
            <div className="flex flex-col gap-3 basis-1/2 ">
              <div className="flex items-center">
                <span className="w-44 font-bold">프로젝트 참여목적</span>
                <span>포트폴리오</span>
              </div>
              <div className="flex items-center">
                <span className="w-44 font-bold">참여 가능한 방식</span>
                <span>온라인</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 basis-1/2">
              <div className="flex items-center">
                <span className="w-44 font-bold">프로젝트 참여목적</span>
                <span>포트폴리오</span>
              </div>
              <div className="flex items-center">
                <span className="w-44 font-bold">연락방법</span>
                <a href="#" className="w-[270px] whitespace-nowrap text-ellipsis overflow-hidden text-white underline">
                  https://discord.com/channels/120943094810934810948109248
                </a>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-700 my-3" />

          {/* 가이드 문구 */}
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-lg">핵심 내용을 간략하게 적어보세요.</h2>
            <p className="text-sm">
              나에 대해 자세히 적어주세요. <br /> 예시를 참고해 작성하면 좋은 프로젝트를 구할 수 있을거에요.
            </p>
            <div className="text-sm flex flex-col gap-1">
              <span>• 그동안 나의 경험과 강점 (다른 프로젝트를 해봤어요, 열정이 넘쳐요 등)</span>
              <span>• 해보고 싶은 게임분야 (FPS, RPG 등)</span>
              <span>• 프로젝트의 목표</span>
              <span>• 프로젝트에 참여할 수 있는 시간</span>
              <span>• 간단한 한마디</span>
            </div>
          </div>
        </div>
      </div>
      <p className={`mt-5 text-right text-error-default underline cursor-pointer ${user ? "block" : "hidden"}`}>
        커리어 프로필 삭제하기
      </p>
    </>
  );
}

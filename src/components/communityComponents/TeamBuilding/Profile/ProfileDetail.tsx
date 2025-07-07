import { useNavigate } from "react-router-dom";

import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";
import SpartaModal from "../../../../spartaDesignSystem/SpartaModal";

import useModalToggles from "../../../../hook/useModalToggles";

import DeleteCheck from "./DeleteCheck";

import { TTeamBuildProfileListItem, TUserData } from "../../../../types";

import defaultProfile from "../../../../assets/common/defaultProfile.svg";
import portfolioImage from "../../../../assets/portfolioImage.png";
import linkImage from "../../../../assets/linkImage.png";
import githubImage from "../../../../assets/githubImage.png";
import notionImage from "../../../../assets/notionImage.png";

type MyPageProps = {
  user: TUserData;
  isMyPage: boolean;
  profileData?: TTeamBuildProfileListItem;
};

type TeamBuildingProfileProps = {
  profileData?: TTeamBuildProfileListItem;
  user?: TUserData;
  isMyPage?: false;
};

type Props = MyPageProps | TeamBuildingProfileProps;

export default function ProfileDetail({ user, profileData, isMyPage }: Props) {
  const navigate = useNavigate();

  const GAME_DELETE_CHECK_ID = "gameDeleteCheckId";
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([GAME_DELETE_CHECK_ID]);

  const purpose =
    profileData?.purpose === "PORTFOLIO"
      ? "포트폴리오"
      : profileData?.purpose === "CONTEST"
      ? "공모전"
      : profileData?.purpose === "STUDY"
      ? "스터디"
      : "상용화";

  const duration =
    profileData?.duration === "3M"
      ? "3개월 이내"
      : profileData?.duration === "6M"
      ? "6개월 이내"
      : profileData?.duration === "1Y"
      ? "1년 이내"
      : "1년 이상";

  const meeting_type =
    profileData?.meeting_type === "OFFLINE"
      ? "오프라인"
      : profileData?.meeting_type === "ONLINE"
      ? "온라인"
      : "온라인/ 오프라인 둘 다 가능";

  return (
    <>
      <div className="bg-gray-800 rounded-xl px-11 py-14 flex flex-col gap-4 w-full">
        {/* 내 팀빌팅 프로필이 없는 경우 */}
        {!profileData && isMyPage && (
          <>
            <div className="flex items-start">
              <p className="font-DungGeunMo text-heading-32 text-white font-normal">{user?.nickname}의 커리어 프로필</p>
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
                  onClick={() => {
                    navigate("/community/team-building/profile/create");
                  }}
                />
              </div>
            </div>
          </>
        )}

        {/* 내 팀필딩 프로필이 있는 경우 */}
        {profileData && (
          <>
            <div className="flex">
              <div className="flex items-center gap-6 w-[90%]">
                <img
                  className="w-20 h-20 object-cover border border-solid border-gray-400 rounded-sm"
                  src={
                    profileData?.profile_image === null
                      ? defaultProfile
                      : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                      ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + (profileData?.profile_image || "")
                      : profileData?.profile_image || ""
                  }
                  alt="프로필 이미지"
                />
                <p className="font-DungGeunMo text-heading-24 text-white font-normal">
                  [{profileData?.author_data.nickname}]님의 팀빌딩 프로필
                </p>
              </div>

              <div className={`flex justify-end items-center ${isMyPage ? "block" : "hidden"}`}>
                <SpartaButton
                  content="팀빌딩 프로필 수정"
                  size="small"
                  colorType="grey"
                  customStyle="w-[170px]"
                  onClick={() => {
                    navigate(`/community/team-building/profile/edit/${user?.user_id}`, {
                      state: {
                        profileData,
                        isEditMode: true,
                      },
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-8 text-white text-base">
              {/* 상태 및 기본 정보 */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center">
                  <span className="w-44 font-bold">현재 구직상태</span>
                  <span>{profileData?.career}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-44 font-bold">구인 포지션</span>
                  <span>{profileData?.my_role}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-44 font-bold">관심 게임개발장르</span>
                  <div className="flex gap-2 font-DungGeunMo">
                    {profileData?.game_genre.length > 0 ? (
                      profileData?.game_genre.map((genre) => (
                        <span className="bg-white px-2 py-1 rounded text-sm text-gray-700">{genre}</span>
                      ))
                    ) : (
                      <span className="text-gray-400">관심 게임개발장르를 선택하지 않았습니다.</span>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-[176px_1fr]">
                  <span className="font-bold">보유 기술스택</span>
                  <span className="w-full line-clamp-2">{profileData?.tech_stack}</span>
                </div>
                <div className="flex  items-start">
                  <span className="w-44 font-bold">포트폴리오 및 링크</span>
                  <div className="flex flex-col gap-1">
                    {profileData?.portfolio[0].link !== "" ? (
                      profileData?.portfolio.map(({ link, type }: { link: string; type: string }, index: number) => (
                        <div key={index} className="flex items-center gap-1">
                          <img
                            className="w-5 h-5"
                            src={
                              type === "portfolio"
                                ? portfolioImage
                                : type === "link"
                                ? linkImage
                                : type === "github"
                                ? githubImage
                                : type === "notion"
                                ? notionImage
                                : ""
                            }
                            alt={`${type} 링크`}
                          />
                          <div className=" w-[650px] whitespace-nowrap text-ellipsis overflow-hidden">
                            <a
                              href={link.startsWith("http") ? link : `https://${link}`}
                              className="text-white underline "
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link}
                            </a>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="font-DungGeunMo text-gray-400">포트폴리오 및 링크를 입력하지 않았습니다.</span>
                    )}
                  </div>
                </div>
              </div>

              <hr className="border-t border-gray-700 my-3" />

              {/* 프로젝트 정보 */}
              <div className="flex">
                <div className="flex flex-col gap-3 basis-1/2 ">
                  <div className="flex items-center">
                    <span className="w-44 font-bold">프로젝트 참여목적</span>
                    <span>{purpose}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 font-bold">참여 가능한 방식</span>
                    <span>{meeting_type}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 basis-1/2">
                  <div className="flex items-center">
                    <span className="w-44 font-bold">참여 가능한 기간</span>
                    <span>{duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-44 font-bold">연락방법</span>
                    <a
                      href={
                        profileData?.contact.startsWith("http")
                          ? profileData?.contact
                          : `https://${profileData?.contact}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-[270px] whitespace-nowrap text-ellipsis overflow-hidden text-white underline"
                    >
                      {profileData?.contact}
                    </a>
                  </div>
                </div>
              </div>

              <hr className="border-t border-gray-700 my-3" />

              {/* 가이드 문구 */}
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-lg">{profileData?.title}</h2>
                <div
                  className="text-sm flex flex-col gap-1"
                  dangerouslySetInnerHTML={{ __html: profileData?.content }}
                ></div>
              </div>
            </div>
          </>
        )}
      </div>

      <p
        onClick={() => onClickModalToggleHandlers[GAME_DELETE_CHECK_ID]()}
        className={`mt-5 text-right text-error-default underline cursor-pointer ${
          isMyPage && profileData ? "block" : "hidden"
        }`}
      >
        팀빌딩 프로필 삭제하기
      </p>

      <SpartaModal
        isOpen={modalToggles[GAME_DELETE_CHECK_ID]}
        onClose={onClickModalToggleHandlers[GAME_DELETE_CHECK_ID]}
        modalId={GAME_DELETE_CHECK_ID}
        closeOnClickOutside={false}
      >
        <DeleteCheck onClose={onClickModalToggleHandlers[GAME_DELETE_CHECK_ID]} />
      </SpartaModal>
    </>
  );
}

import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteTeamBuildProfile, getTeamBuildProfileByUserId } from "../../../../api/teambuilding";

import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";
import SpartaModal from "../../../../spartaDesignSystem/SpartaModal";

import useModalToggles from "../../../../hook/useModalToggles";

import { TTeamBuildPostResponse, TTeamBuildProfileUserResponse, TUserData } from "../../../../types";

import defaultProfile from "../../../../assets/common/defaultProfile.svg";
import portfolioImage from "../../../../assets/portfolioImage.png";
import linkImage from "../../../../assets/linkImage.png";
import githubImage from "../../../../assets/githubImage.png";
import notionImage from "../../../../assets/notionImage.png";
import { getUserTeambuildPosts } from "../../../../api/user";
import RenderPosts from "../RenderPosts";

import { AiFillCaretRight } from "react-icons/ai";
import TeamBuildLogModal from "../TeamBuildLogModal";
import SpartaReactionModal from "../../../../spartaDesignSystem/SpartaReactionModal";
import { userStore } from "../../../../share/store/userStore";
import SpartaPhraseCheckModal from "../../../../spartaDesignSystem/SpartaPhraseCheckModal";

type MyPageProps = {
  user: TUserData;
  isMyPage: boolean;
};

type TeamBuildingProfileProps = {
  user?: TUserData;
  isMyPage?: boolean | null;
};

type Props = MyPageProps | TeamBuildingProfileProps;

export default function ProfileDetail({ user, isMyPage }: Props) {
  const GAME_DELETE_CHECK_ID = "gameDeleteCheckId";
  const TEAM_BUILD_LOG_MODAL = "teamBuildLogModal";
  const PROFILE_DELETE_SUCCESS_ID = "profileDelteSuccessModal";
  const NO_ACTION_MODAL_ID = "noActionModal";

  const { id } = useParams();

  const navigate = useNavigate();

  const { userData } = userStore();

  const queryClient = useQueryClient();

  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([
    GAME_DELETE_CHECK_ID,
    PROFILE_DELETE_SUCCESS_ID,
    TEAM_BUILD_LOG_MODAL,
    NO_ACTION_MODAL_ID,
  ]);

  const { data: userTeamBuildPostResponse } = useQuery<TTeamBuildPostResponse>({
    queryKey: ["userteamBuildingPost", Number(id)],
    queryFn: () => getUserTeambuildPosts(Number(id)),
  });

  const { data: teamBuildprofileResponse } = useQuery<TTeamBuildProfileUserResponse>({
    queryKey: ["teamBuildProfile", Number(id)],
    queryFn: () => getTeamBuildProfileByUserId(Number(id)),
    retry: 1,
  });

  const profileData = teamBuildprofileResponse?.data;
  const userTeamBuildPost = userTeamBuildPostResponse?.data.teambuild_posts;
  const userTeamBuildPostCount = userTeamBuildPostResponse?.pagination.count;

  const onClickProfileDelete = async () => {
    const res = await deleteTeamBuildProfile(userData?.data.user_id);

    if (res?.status === "success") {
      onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
      queryClient.removeQueries({ queryKey: ["teamBuildProfile", userData?.data.user_id] });
    }
  };

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

  const carrer =
    profileData?.career === "STUDENT" ? "대학생" : profileData?.career === "JOBSEEKER" ? "취준생" : "현직자";

  return (
    <>
      <div className="flex flex-col gap-6 w-full p-11 mb-8 bg-gray-800 rounded-xl">
        <div className={`${userTeamBuildPostCount === 0 ? "hidden" : "flex"} items-center justify-between`}>
          <p className="font-DungGeunMo text-heading-24 text-white font-normal">
            {profileData?.author_data.nickname}님의 팀빌딩 게시글
          </p>

          {userTeamBuildPostCount && userTeamBuildPostCount > 3 && (
            <AiFillCaretRight
              className="w-8 h-8 text-white cursor-pointer"
              onClick={() => {
                onClickModalToggleHandlers[TEAM_BUILD_LOG_MODAL]();
              }}
            />
          )}
        </div>

        <div className="grid grid-cols-3 gap-5">
          <RenderPosts
            posts={userTeamBuildPost}
            searchPosts={undefined}
            searchKeyword=""
            userData={undefined}
            noPostsMessage="아직 등록된 팀빌딩 모집글이 없습니다."
            noSearchResultsMessage="검색 결과가 없습니다."
            cardType="teamBuild"
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-11 flex flex-col gap-6 w-full">
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
                  className="w-20 h-20 object-cotain border border-solid border-gray-400 rounded-sm"
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
                  {profileData?.author_data.nickname}님의 팀빌딩 프로필
                </p>
              </div>

              <div className={`flex justify-end items-center ${isMyPage ? "block" : "hidden"}`}>
                <SpartaButton
                  content="팀빌딩 프로필 수정"
                  size="small"
                  colorType="grey"
                  customStyle="w-[170px] rounded-sm"
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
                  <span>{carrer}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-44 font-bold">구인 포지션</span>
                  <span>{profileData?.my_role}</span>
                </div>
                <div className={`${profileData?.game_genre.length === 0 ? "hidden" : "flex"} items-center`}>
                  <span className="w-44 font-bold">관심 게임개발장르</span>
                  <div className="flex gap-2 font-DungGeunMo">
                    {profileData?.game_genre.length > 0 &&
                      profileData?.game_genre.map((genre) => (
                        <span className="bg-white px-2 rounded text-sm text-gray-700 font-semibold">{genre}</span>
                      ))}
                  </div>
                </div>
                <div className="grid grid-cols-[176px_1fr]">
                  <span className="font-bold">보유 기술스택</span>
                  <span className="w-full line-clamp-2">{profileData?.tech_stack}</span>
                </div>
                <div className={`${profileData?.portfolio[0].link === "" ? "hidden" : "flex"} items-start`}>
                  <span className="w-44 font-bold">포트폴리오 및 링크</span>
                  <div className="flex flex-col gap-1">
                    {profileData?.portfolio[0].link !== "" &&
                      profileData?.portfolio.map(({ link, type }: { link: string; type: string }, index: number) => (
                        <div key={index} className={`${link === "" ? "hidden" : "block"} flex items-center gap-1`}>
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
                      ))}
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

              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-2xl">{profileData?.title}</h2>
                <div
                  className="text-base flex flex-col gap-1"
                  dangerouslySetInnerHTML={{ __html: profileData?.content }}
                ></div>
              </div>
            </div>
          </>
        )}
      </div>

      <p
        onClick={() => onClickModalToggleHandlers[GAME_DELETE_CHECK_ID]()}
        className={`mt-4 text-right text-error-default underline cursor-pointer text-lg ${
          isMyPage && profileData ? "block" : "hidden"
        }`}
      >
        커리어 프로필 삭제하기
      </p>

      <SpartaPhraseCheckModal
        isOpen={modalToggles[GAME_DELETE_CHECK_ID]}
        modalId={GAME_DELETE_CHECK_ID}
        onClose={onClickModalToggleHandlers[GAME_DELETE_CHECK_ID]}
        onClickEvent={onClickProfileDelete}
        modalPurpose="profileDelete"
      >
        <ul className="list-disc pl-5 leading-6 text-white">
          <li>일부만 수정하고 싶으신 경우, 수정 기능을 이용해주세요!</li>
          <li>
            수정을 하시기 위해서는 <b className="text-error-default ">‘프로필을 삭제하겠습니다’</b>를 입력해주세요!
          </li>
        </ul>
      </SpartaPhraseCheckModal>

      <SpartaModal
        modalId={TEAM_BUILD_LOG_MODAL}
        isOpen={modalToggles[TEAM_BUILD_LOG_MODAL]}
        onClose={onClickModalToggleHandlers[TEAM_BUILD_LOG_MODAL]}
        closeOnClickOutside
        type="primary"
      >
        <TeamBuildLogModal userTeamBuildPost={userTeamBuildPost} isMyPage={isMyPage} />
      </SpartaModal>

      <SpartaReactionModal
        isOpen={modalToggles[NO_ACTION_MODAL_ID]}
        onClose={onClickModalToggleHandlers[NO_ACTION_MODAL_ID]}
        modalId={NO_ACTION_MODAL_ID}
        title="팀빌딩 프로필 삭제 완료"
        content="팀빌딩 프로필을 성공적으로 삭제했습니다."
        btn1={{
          text: "확인했습니다.",
          onClick: () => {
            onClickModalToggleHandlers[NO_ACTION_MODAL_ID]();
            onClickModalToggleHandlers[GAME_DELETE_CHECK_ID]();
          },
        }}
        type={"error"}
      />
    </>
  );
}

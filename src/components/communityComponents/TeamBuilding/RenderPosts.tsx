import { TTeamBuildPostListItem, TTeamBuildProfileListItem, TUserData } from "../../../types";
import CardList from "./CardList";

type TabContentProps = {
  posts: TTeamBuildPostListItem[] | TTeamBuildProfileListItem[] | undefined;
  searchPosts: TTeamBuildPostListItem[] | TTeamBuildProfileListItem[] | undefined;
  searchKeyword: string;
  userData: TUserData | undefined;
  noPostsMessage: string;
  noSearchResultsMessage: string;
  cardType: "teamBuild" | "profile";
};

export default function RenderPosts({
  posts,
  searchPosts,
  searchKeyword,
  userData,
  noPostsMessage,
  noSearchResultsMessage,
  cardType,
}: TabContentProps) {
  if (posts?.length === 0) {
    return <div className="col-span-4 text-center text-white text-2xl font-DungGeunMo">{noPostsMessage}</div>;
  }

  if (searchPosts?.length === 0) {
    return <div className="col-span-4 text-center text-white text-2xl font-DungGeunMo">{noSearchResultsMessage}</div>;
  }

  return searchKeyword !== ""
    ? searchPosts?.map((post) =>
        cardType === "teamBuild" ? (
          <CardList key={post.id} postType="teamBuild" post={post as TTeamBuildPostListItem} />
        ) : (
          <CardList key={post.id} postType="profile" post={post as TTeamBuildProfileListItem} userData={userData} />
        ),
      )
    : posts?.map((post) =>
        cardType === "teamBuild" ? (
          <CardList key={post.id} postType="teamBuild" post={post as TTeamBuildPostListItem} />
        ) : (
          <CardList key={post.id} postType="profile" post={post as TTeamBuildProfileListItem} userData={userData} />
        ),
      );
}

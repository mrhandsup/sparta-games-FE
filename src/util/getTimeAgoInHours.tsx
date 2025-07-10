export const getTimeAgoInHours = (isoString: string): string => {
  const createdAt = new Date(isoString);
  const now = new Date();

  const diffMs = now.getTime() - createdAt.getTime();

  const safeDiffMs = Math.max(0, diffMs); // 서버 시간(UTC)과 클라이언트 시간(KST)간의 시간대 차이로 인해 diffMs가 음수가 되는 경우 강제로 0 처리

  const diffHours = Math.floor(safeDiffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMinutes = Math.floor(safeDiffMs / (1000 * 60));
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}일 전`;
  }
};

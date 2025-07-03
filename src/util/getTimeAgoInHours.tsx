export const getTimeAgoInHours = (isoString: Date): string => {
  const createdAt = new Date(isoString);
  const now = new Date();

  const diffMs = now.getTime() - createdAt.getTime(); // 밀리초 차이
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // 시간 차이

  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return `${diffMinutes}분 전`;
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}일 전`;
  }
};

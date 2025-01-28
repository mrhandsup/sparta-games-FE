export const formatDate = (date: string | undefined) => {
  if (!date) {
    return undefined;
  }

  const newDate = new Date(date);

  // 날짜 마지막에 '.' 제거
  const formattedDate = newDate.toLocaleDateString("ko-KR").replace(/\.$/, "");
  // 24시간제 형식 적용
  const formattedTime = newDate.toLocaleTimeString("ko-KR", { hour12: false });

  return `${formattedDate} ${formattedTime}`;
};

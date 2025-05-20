export function formatToKST(utcDateString: string): string {
  // UTC 문자열을 Date 객체로 변환
  const date: Date = new Date(utcDateString);

  // 각 컴포넌트를 2자리 숫자로 패딩
  const year: number = date.getFullYear();
  const month: string = String(date.getMonth() + 1).padStart(2, "0");
  const day: string = String(date.getDate()).padStart(2, "0");
  const hours: string = String(date.getHours()).padStart(2, "0");
  const minutes: string = String(date.getMinutes()).padStart(2, "0");
  const seconds: string = String(date.getSeconds()).padStart(2, "0");

  // yyyy-mm-dd hh:mm:ss 형식으로 반환
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

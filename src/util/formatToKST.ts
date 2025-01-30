export function formatToKST(utcDateString: string): string {
  // UTC 문자열을 Date 객체로 변환
  const date: Date = new Date(utcDateString);

  // UTC를 KST로 변환 (UTC + 9시간)
  const kstDate: Date = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  // 각 컴포넌트를 2자리 숫자로 패딩
  const year: number = kstDate.getFullYear();
  const month: string = String(kstDate.getMonth() + 1).padStart(2, "0");
  const day: string = String(kstDate.getDate()).padStart(2, "0");
  const hours: string = String(kstDate.getHours()).padStart(2, "0");
  const minutes: string = String(kstDate.getMinutes()).padStart(2, "0");
  const seconds: string = String(kstDate.getSeconds()).padStart(2, "0");

  // yyyy-mm-dd hh:mm:ss 형식으로 반환
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default function removeHTMLTags(html: string) {
  // 1. &nbsp;를 공백으로 변환
  const withoutNbsp = html.replace(/&nbsp;/g, " ");

  // 2. HTML 태그 제거
  const cleanText = withoutNbsp.replace(/<\/?[^>]+(>|$)/g, "");

  return cleanText;
}

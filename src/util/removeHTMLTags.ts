export default function removeHTMLTags(html: string) {
  // 정규 표현식을 사용하여 모든 HTML 태그 제거
  const newHtml = html.replace(/<\/?[^>]+(>|$)/g, "");
  return newHtml;
}

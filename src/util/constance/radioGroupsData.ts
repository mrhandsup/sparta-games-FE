const radioGroupsData = {
  purpose: {
    label: "프로젝트 목적",
    options: [
      { label: "포트폴리오", value: "PORTFOLIO" },
      { label: "공모전", value: "CONTEST" },
      { label: "스터디", value: "STUDY" },
      { label: "상용화", value: "COMMERCIAL" },
    ],
  },
  duration: {
    label: "프로젝트 기간",
    options: [
      { label: "3개월 이내", value: "3M" },
      { label: "6개월 이내", value: "6M" },
      { label: "1년 이내", value: "1Y" },
      { label: "1년 이상", value: "GT1Y" },
    ],
  },
  meeting_type: {
    label: "진행방식",
    options: [
      { label: "온라인", value: "ONLINE" },
      { label: "오프라인", value: "OFFLINE" },
      { label: "둘 다 가능", value: "BOTH" },
    ],
  },

  career: {
    label: "현재 상태",
    options: [
      { label: "취준생", value: "취준생" },
      { label: "대학생", value: "대학생" },
      { label: "현직자", value: "현직자" },
    ],
  },
};

export default radioGroupsData;

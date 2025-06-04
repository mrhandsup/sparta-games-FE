const radioGroupsData = {
  projectPurpose: {
    label: "프로젝트 목적",
    options: [
      { label: "포트폴리오", value: "portfolio" },
      { label: "공모전", value: "contest" },
      { label: "스터디", value: "study" },
      { label: "상용화", value: "commercial" },
    ],
    defaultValue: "portfolio",
  },
  projectPeriod: {
    label: "프로젝트 기간",
    options: [
      { label: "3개월 이내", value: "3months" },
      { label: "6개월 이내", value: "6months" },
      { label: "1년 이내", value: "1year" },
      { label: "1년 이상", value: "moreThan1year" },
    ],
    defaultValue: "3months",
  },
  projectMethod: {
    label: "진행방식",
    options: [
      { label: "온라인", value: "online" },
      { label: "오프라인", value: "offline" },
      { label: "둘 다 가능", value: "both" },
    ],
    defaultValue: "online",
  },
};

export default radioGroupsData;

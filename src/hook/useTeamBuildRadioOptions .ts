import { useQueries } from "@tanstack/react-query";
import { getTeamBuildDurationList, getTeamBuildMeetingTypeList, getTeamBuildPurposeList } from "../api/teambuilding";

export const useTeamBuildRadioOptions = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["purposeList"],
        queryFn: getTeamBuildPurposeList,
      },
      {
        queryKey: ["durationList"],
        queryFn: getTeamBuildDurationList,
      },
      {
        queryKey: ["meetingTypeList"],
        queryFn: getTeamBuildMeetingTypeList,
      },
    ],
  });

  const [purpose, duration, meetingType] = results.map((r) => r.data?.data || []);

  return {
    radioGroupsData: {
      purpose: { label: "프로젝트 목적", options: purpose },
      duration: { label: "프로젝트 기간", options: duration },
      meeting_type: { label: "진행 방식", options: meetingType },
      career: {
        label: "현재 상태",
        options: [
          { label: "취준생", value: "취준생" },
          { label: "대학생", value: "대학생" },
          { label: "현직자", value: "현직자" },
        ],
      },
    },
  };
};

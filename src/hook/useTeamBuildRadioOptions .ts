import { useQueries } from "@tanstack/react-query";
import {
  getTeamBuildCareerList,
  getTeamBuildDurationList,
  getTeamBuildMeetingTypeList,
  getTeamBuildPurposeList,
} from "../api/teambuilding";

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
      {
        queryKey: ["careerList"],
        queryFn: getTeamBuildCareerList,
      },
    ],
  });

  const [purpose, duration, meetingType, career] = results.map((result) => result.data?.data || []);

  return {
    radioGroupsData: {
      purpose: { label: "프로젝트 목적", options: purpose },
      duration: { label: "프로젝트 기간", options: duration },
      meeting_type: { label: "진행 방식", options: meetingType },
      career: { label: "현재 상태", options: career },
    },
  };
};

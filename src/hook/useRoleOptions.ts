import { useQuery } from "@tanstack/react-query";
import { getTeamBuildRoleList } from "../api/teambuilding";

type selectConfig = {
  label: string;
  value: string | boolean;
  [key: string]: any;
};

export const useRoleOptions = () => {
  const { data } = useQuery({
    queryKey: ["roleList"],
    queryFn: getTeamBuildRoleList,
  });

  const roleOptions: selectConfig[] = (data?.data || []).map((role: string) => ({
    label: role,
    value: role,
  }));

  return { roleOptions };
};

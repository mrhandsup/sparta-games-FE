import { useForm } from "react-hook-form";

import CommunityProjectTitle from "../../../common/CommunityProjectTitle";
import RecruitFormBasicInfo from "./RecruitFormBasicInfo";
import RecruitFormDescription from "./RecruitFormDescription";
import SpartaButton from "../../../../spartaDesignSystem/SpartaButton";

import type { TProjectRecruitForm } from "../../../../types";

import recruitImage from "../../../../assets/gameDetail/ReviewEdit.svg";

export default function RecruitForm() {
  const { register, watch, handleSubmit, control, setValue, formState, trigger } = useForm<TProjectRecruitForm>({
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    console.log("제출된 데이터:", data);
  };

  return (
    <div className="mx-auto mt-16">
      <CommunityProjectTitle img={recruitImage} title={"프로젝트를 같이 만들 팀원을 구해요"} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[1180px] mx-auto">
          <RecruitFormBasicInfo
            control={control}
            watch={watch}
            setValue={setValue}
            register={register}
            trigger={trigger}
          />
          <RecruitFormDescription register={register} watch={watch} setValue={setValue} />
          <SpartaButton disabled={!formState.isValid} content="글 등록하기" type="filled" />
        </div>
      </form>
    </div>
  );
}

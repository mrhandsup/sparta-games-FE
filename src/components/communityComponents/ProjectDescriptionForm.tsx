import { useEffect } from "react";
import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";

import { TProjectRecruitForm } from "../../types";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  watch: UseFormWatch<TProjectRecruitForm>;
  setValue: UseFormSetValue<TProjectRecruitForm>;
  register: UseFormRegister<TProjectRecruitForm>;
};
export default function ProjectDescriptionForm({ register, watch, setValue }: Props) {
  const editorContent = watch("content");

  useEffect(() => {
    register("content", {
      required: "프로젝트 내용을 입력해주세요.",
    });
  }, [register]);

  const handleEditorChange = (content: string) => {
    // react-quill 내용 작성 중, 내용 모두 지울 경우 생기는 <p></br></p> 태그 제거하여 빈 문자열로 설정
    const plainText = content.replace(/<(.|\n)*?>/g, "").trim();

    // 내용이 없을 경우 빈 문자열로 설정해서 isValid가 false가 되도록 함
    const cleanedContent = plainText === "" ? "" : content;

    setValue("content", cleanedContent, { shouldValidate: true });
  };

  return (
    <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
      <p className="font-DungGeunMo text-xl text-primary-400">상세내용 작성</p>

      <div className="mt-5">
        <SpartaTextField
          label="글 제목"
          type="small"
          register={register("title", { required: "프로젝트 제목을 입력해주세요." })}
          inputProps={{
            placeholder: "핵심 내용을 간략하게 적어보세요.",
          }}
        />
      </div>

      <div className="flex flex-col gap-[10px] my-5 formContent">
        <div className="flex items-end gap-2 font-semibold text-gray-100">프로젝트 소개</div>

        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={handleEditorChange}
          modules={{
            toolbar: [
              [{ header: [1, 2] }],
              [{ size: ["small", false, "large", "huge"] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ color: [] }, { background: [] }],
              ["image"],
            ],
          }}
          placeholder="프로젝트에 대해 자세히 적어주세요.&#10;예시를 참고해 작성한다면 좋은 팀원을 구할 수 있을거에요.&#10;&#10;예시)&#10;• 프로젝트의 게임 분야 (FPS, RPG 등)&#10;• 프로젝트를 시작하게 된 배경&#10;• 프로젝트의 목표&#10;• 프로젝트에 할애할 수 있는 시간&#10;• 그동안 나의 경험과 강점 (다른 프로젝트를 해봤어요, 열정이 넘쳐요 등)&#10;• 우리 팀의 분위기와 강점 (이미 합류한 팀원이 있다면 적어주세요.)&#10;• 프로젝트 관련 주의사항"
          className="text-white"
        />
      </div>
    </div>
  );
}

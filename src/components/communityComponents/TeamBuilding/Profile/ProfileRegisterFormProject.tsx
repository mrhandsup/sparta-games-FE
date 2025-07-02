import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";

import SpartaRadioGroup from "../../../../spartaDesignSystem/SpartaRadioGroup";
import SpartaTextField from "../../../../spartaDesignSystem/SpartaTextField";

import { TProfileRegisterForm } from "../../../../types";
import { EDITOR_FORMATS } from "../../../../constant/constant";
import { useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill";

type Props = {
  register: UseFormRegister<TProfileRegisterForm>;
  control: Control<TProfileRegisterForm>;
  watch: UseFormWatch<TProfileRegisterForm>;
  setValue: UseFormSetValue<TProfileRegisterForm>;
};
export default function ProfileRegisterFormProject({ register, control, watch, setValue }: Props) {
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    register("content", {
      required: "프로젝트 내용을 입력해주세요.",
    });
  }, [register]);

  const editorContent = watch("content");

  const handleEditorChange = (editorState: string) => {
    // react-quill 내용 작성 중, 내용 모두 지울 경우 생기는 <p></br></p> 태그 제거하여 빈 문자열로 설정
    const plainText = editorState.replace(/<(.|\n)*?>/g, "").trim();

    // 내용이 없을 경우 빈 문자열로 설정해서 isValid가 false가 되도록 함
    const cleanedContent = plainText === "" ? "" : editorState;

    setValue("content", cleanedContent, { shouldValidate: true });
  };

  const onClickUploadImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file: any = input.files ? input.files[0] : null;

      if (!file) return;

      console.log("file", file)!;

      /*TODO: 이미지 업로드 API 연동*/
    };
  };

  const modules = useMemo(() => {
    return {
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
          ["image"],
          [{ align: [] }, { color: [] }, { background: [] }],
        ],
        handlers: {
          image: onClickUploadImage,
        },
        ImageResize: {
          modules: ["Resize"],
        },
      },
    };
  }, []);

  return (
    <>
      <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
        <p className="font-DungGeunMo text-xl text-primary-400 mb-4">프로젝트 정보 작성</p>

        <div className="flex gap-10">
          <div className="flex flex-col gap-5">
            <SpartaRadioGroup
              groupsToShow={["purpose", "availablePeriod"]}
              control={control}
              watch={watch}
              setValue={setValue}
            />
          </div>

          <div className="flex flex-col gap-5 basis-1/2">
            <SpartaRadioGroup groupsToShow={["meeting_type"]} control={control} watch={watch} setValue={setValue} />

            <SpartaTextField
              label="연락방법"
              type="small"
              register={register("contact", { required: "연락방법을 입력해주세요." })}
              inputProps={{
                placeholder: "디스코드, 카카오톡 등 링크를 입력해주세요.",
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
        <p className="font-DungGeunMo text-xl text-primary-400">자기소개 작성</p>

        <div className="mt-5">
          <SpartaTextField
            label="글 제목"
            type="small"
            register={register("title", { required: "프로젝트 제목을 입력해주세요." })}
            inputProps={{
              placeholder: "나에 대해 간단히 소개해보세요.",
            }}
          />
        </div>

        <div className="flex flex-col gap-[10px] my-5 formContent">
          <div className="flex items-end gap-2 font-semibold text-gray-50">자기소개</div>

          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={editorContent}
            modules={modules}
            formats={EDITOR_FORMATS}
            onChange={handleEditorChange}
            placeholder="나에 대해 자세히 적어주세요.&#10;예시를 참고해 작성한다면 좋은 프로젝트를 구할 수 있을거에요.&#10;&#10;예시)&#10;• 그동안 나의 경험과 강점 (다른 프로젝트를 해봤어요, 열정이 넘쳐요 등)&#10;• 해보고 싶은 게임분야 (FPS, RPG 등)&#10;• 프로젝트의 목표&#10;• 프로젝트에 참여할 수 있는 시간&#10;• 프로젝트에 대한 마음가짐 한마디"
            className="text-white"
          />
        </div>
      </div>
    </>
  );
}

import { useEffect, useMemo, useRef } from "react";
import { useFormContext } from "react-hook-form";

import SpartaRadioGroup from "../../../../spartaDesignSystem/SpartaRadioGroup";
import SpartaTextField from "../../../../spartaDesignSystem/SpartaTextField";

import { TProfileRegisterForm } from "../../../../types";

import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import { ImageDrop } from "quill-image-drop-module";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import "react-quill/dist/quill.snow.css";
import "quill-image-uploader/dist/quill.imageUploader.min.css";

import uploadImageFileToS3 from "../../../../util/uploadImageToS3";
import base64ToFile from "../../../../util/base64ToFile";
import { EDITOR_FORMATS } from "../../../../constant/constant";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

export default function ProfileRegisterFormProject() {
  const { register, control, setValue, watch, formState } = useFormContext<TProfileRegisterForm>();

  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    register("content", {
      required: "프로젝트 내용을 입력해주세요.",
    });
  }, [register]);

  const editorContent = watch("content");

  // 에디터 텍스트 입력, 이미지 드래그앤 드롭하는 경우
  const handleEditorChange = async (editorState: string) => {
    //이미지 드래그앤 드롭 없이 텍스트만 입력한 경우
    if (!editorState.includes("data:image")) {
      const isEmptyContent = editorState.trim() === "<p><br></p>";
      const cleanedContent = isEmptyContent ? "" : editorState;
      setValue("content", cleanedContent, { shouldValidate: true });

      return;
    }

    // 이미지 드래그앤 드롭한 경우
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = editorState;

    const images = tempContainer.querySelectorAll("img");

    for (const img of images) {
      const src = img.getAttribute("src") || "";

      if (src.startsWith("data:image")) {
        const file = base64ToFile(src, "pasted-image.png");

        try {
          const url = await uploadImageFileToS3(file);
          img.setAttribute("src", url); // base64 → S3 URL로 교체
        } catch (e) {
          console.error("이미지 업로드 실패", e);
        }
      }
    }

    const updatedHtml = tempContainer.innerHTML;

    // 에디터 내용 입력후 모두 지웠을 때 <p><br></p>로 남는 경우 빈 문자열로 세팅
    const isEmptyContent = tempContainer.innerHTML.trim() === "<p><br></p>";
    const cleanedContent = isEmptyContent ? "" : updatedHtml;

    setValue("content", cleanedContent, { shouldValidate: true });
  };

  // 에디터 내 이미지 업로드 버튼을 클릭하여 이미지 업로드하는 경우
  const onClickUploadImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (!file) return;

      try {
        const url = await uploadImageFileToS3(file);

        // 업로드된 이미지 URL 에디터에 삽입
        if (!quillRef.current) return;

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection() || { index: editor.getLength() };

        editor.insertEmbed(range.index, "image", url);
        editor.setSelection(range.index + 1, 0);

        const updatedContent = editor.root.innerHTML;

        setValue("content", updatedContent, { shouldValidate: true });
      } catch (error) {
        console.error("이미지 업로드 실패", error);
      }
    };
  };

  // 이미지를 복사, 붙여넣기 한 경우
  const handlePasteImage = async (e: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardItems = e.clipboardData.items;

    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.indexOf("image") !== -1) {
        const file = item.getAsFile();

        if (file && quillRef.current) {
          e.preventDefault(); // 브라우저가 이미지를 자동으로 base64형태로 변환하는 작업 방지

          const editor = quillRef.current.getEditor();
          const url = await uploadImageFileToS3(file);
          const range = editor.getSelection() || { index: editor.getLength() };

          editor.insertEmbed(range.index, "image", url);
          editor.setSelection(range.index + 1, 0);
        }
      }
    }
  };

  const modules = useMemo(() => {
    return {
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
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
      imageDrop: true,
    };
  }, []);

  return (
    <>
      <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
        <p className="font-DungGeunMo text-xl text-primary-400 mb-4">프로젝트 정보 작성</p>

        <div className="flex gap-10">
          <div className="flex flex-col gap-5">
            <SpartaRadioGroup
              groupsToShow={["purpose", "duration"]}
              control={control}
              watch={watch}
              setValue={setValue}
              labelOverrides={{ duration: "참여 가능 기간" }}
            />
          </div>

          <div className="flex flex-col gap-5 basis-1/2">
            <SpartaRadioGroup groupsToShow={["meeting_type"]} control={control} watch={watch} setValue={setValue} />

            <SpartaTextField
              label="연락방법"
              type="small"
              register={register("contact", {
                required: "연락방법을 입력해주세요.",
                pattern: {
                  value: /^(https?:\/\/)?([\w-])+\.([a-zA-Z]{2,63})([/\w.-]*)*\/?$/,
                  message: "올바른 링크를 입력해주세요.",
                },
                maxLength: {
                  value: 50,
                  message: "최대 50자까지 입력 가능합니다.",
                },
              })}
              inputProps={{
                placeholder: "디스코드, 카카오톡 등 링크를 입력해주세요.",
                maxLength: 50,
              }}
              subLabel={{
                default: "",
                error: formState.errors.contact?.message as string,
                pass: "",
              }}
              error={!!formState.errors.contact}
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
            register={register("title", {
              required: "프로젝트 제목을 입력해주세요.",
              maxLength: {
                value: 100,
                message: "최대 100자까지 입력 가능합니다.",
              },
            })}
            inputProps={{
              placeholder: "나에 대해 간단히 소개해보세요.",
              maxLength: 100,
            }}
            subLabel={{
              default: "",
              error: formState.errors.title?.message as string,
              pass: "",
            }}
            error={!!formState.errors.title}
          />
        </div>

        <div className="flex flex-col gap-[10px] my-5 formContent">
          <div className="flex items-end gap-2 font-semibold text-gray-50">자기소개</div>

          <div onPaste={handlePasteImage}>
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
      </div>
    </>
  );
}

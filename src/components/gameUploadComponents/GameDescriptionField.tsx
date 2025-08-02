import { useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import { TGameUploadInput } from "../../types";
import "react-quill/dist/quill.snow.css";

const GameDescriptionField = () => {
  const { watch, setValue } = useFormContext<TGameUploadInput>();

  const editorContent = watch("content");

  const handleEditorChange = (editorState: string) => {
    const tempContainer = document.createElement("div");
    tempContainer.innerHTML = editorState;

    const isEmptyContent = tempContainer.innerHTML.trim() === "<p><br></p>";
    const cleanedContent = isEmptyContent ? "" : editorState;

    setValue("content", cleanedContent, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-2 mb-8 formContent">
      <div className="flex items-center gap-2 text-base font-semibold text-white">
        게임설명 <p className="text-body-14 text-primary-500">*필수</p>
      </div>

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
          ],
        }}
        placeholder="이렇게 입력해보세요!&#10;• 간단한 게임 스토리&#10;• 개발자의 한마디&#10;• 팀원들의 정보&#10;• 업데이트 계획"
        className="text-white"
      />
    </div>
  );
};

export default GameDescriptionField;

import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import ReactQuill from "react-quill";
import { TGameUploadInput } from "../../types";
import "react-quill/dist/quill.snow.css";

type Props = {
  watch: UseFormWatch<TGameUploadInput>;
  setValue: UseFormSetValue<TGameUploadInput>;
};
const GameDescriptionField = ({ watch, setValue }: Props) => {
  const editorContent = watch("content");

  const handleEditorChange = (editorState: string) => {
    // react-quill 내용 작성 중, 내용 모두 지울 경우 생기는 <p></br></p> 태그 제거
    const plainText = editorState.replace(/<(.|\n)*?>/g, "").trim();

    // 내용이 없을 경우 빈 문자열로 설정해서 isValid가 false가 되도록 함s
    const cleanedContent = plainText === "" ? "" : editorState;

    setValue("content", cleanedContent, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col gap-[10px] mb-8 formContent">
      <div className="flex items-end gap-2 text-heading-20 text-white">
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

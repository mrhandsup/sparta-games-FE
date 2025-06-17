import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";
import { useFormContext } from "react-hook-form";
import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";
import { GAME_CATEGORY, USER_TECH } from "../../constant/constant";

const Profile = () => {
  const {
    register,
    watch,
    formState: { errors },
    control,
  } = useFormContext();

  const nickname = watch("nickname");

  // 닉네임 유효성 검사 규칙(4자 이상 10자 이하의 영숫자 조합 문자열 영어 필수 숫자 필수)
  const nicknameValidation = {
    required: "닉네임을 입력해주세요",
    minLength: {
      value: 4,
      message: "닉네임은 4자 이상이어야 합니다",
    },
    maxLength: {
      value: 10,
      message: "닉네임은 10자 이하여야 합니다",
    },
    pattern: {
      value: /^[a-zA-Z0-9가-힣]*$/,
      message: "닉네임은 10자 이하 영/한/숫자만 사용 가능합니다.",
    },
  };

  return (
    <>
      <p className="text-primary-400 font-DungGeunMo text-[24px]">프로필 정보</p>
      <SpartaTextField
        label="닉네임"
        type="medium"
        register={register("nickname", nicknameValidation)}
        subLabel={{
          default: "4자 이상 10자 이하 영/한/숫자 사용 가능합니다.",
          error: errors.nickname?.message as string,
          pass: nickname && !errors.nickname ? "사용 가능한 닉네임입니다" : "",
        }}
        inputProps={{
          placeholder: "닉네임을 입력해주세요",
          className: "text-white placeholder-white",
        }}
        pass={nickname && !errors.nickname}
        error={!!errors.nickname}
      />
      <SpartaChipSelect
        label="추천받을 게임분야"
        options={GAME_CATEGORY}
        control={control}
        name="game_category"
        subLabel={{
          default: "추천받을 게임분야를 3개까지 선택할 수 있어요",
          error: "태그를 하나 이상 선택해주세요",
          pass: "태그가 선택되었습니다",
        }}
        multiple
        maxCount={3}
        placeHolderText="게임분야를 선택해주세요"
      />
    </>
  );
};

export default Profile;

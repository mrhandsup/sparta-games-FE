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
      value: 12,
      message: "닉네임은 12자 이하여야 합니다",
    },
    pattern: {
      value: /^[a-zA-Z0-9가-힣]*$/,
      message: "닉네임은 12자 이하 영/한/숫자만 사용 가능합니다.",
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
          default: "4~10자 이하 영/한/숫자 사용 가능합니다.",
          error: errors.nickname?.message as string,
          pass: nickname && !errors.nickname ? "사용 가능한 닉네임입니다" : "",
        }}
        inputProps={{
          placeholder: "닉네임을 입력해주세요",
        }}
        pass={nickname && !errors.nickname}
        error={!!errors.nickname}
      />
      <SpartaChipSelect
        label="관심 게임 분야"
        options={GAME_CATEGORY}
        control={control}
        name="game_category"
        subLabel={{
          default: "관심있는 게임 분야를 선택해주세요",
          error: "태그를 하나 이상 선택해주세요",
          pass: "태그가 선택되었습니다",
        }}
        multiple
        maxCount={3}
      />
      <SpartaChipSelect
        label="관심 기술 분야"
        options={USER_TECH}
        control={control}
        name="user_tech"
        subLabel={{
          default: "관심있는 기술 분야를 선택해주세요.",
          error: "태그를 하나 이상 선택해주세요",
          pass: "태그가 선택되었습니다",
        }}
      />
    </>
  );
};

export default Profile;

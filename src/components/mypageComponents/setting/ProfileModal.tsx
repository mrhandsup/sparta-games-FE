import { useForm } from "react-hook-form";
import { GAME_CATEGORY, USER_TECH } from "../../../constant/constant";
import SpartaChipSelect from "../../../spartaDesignSystem/SpartaChipSelect";
import SpartaTextField from "../../../spartaDesignSystem/SpartaTextField";
import SpartaButton from "../../../spartaDesignSystem/SpartaButton";
import { userStore } from "../../../share/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { updateUserData } from "../../../api/user";
import { TUserInformationInputForm } from "../../../types";

interface ProfileFormData {
  nickname: string;
  user_tech: string;
  game_category: string[];
}

type Props = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

const ProfileModal = ({ onSuccess, onError }: Props) => {
  const { userData, setUser } = userStore();

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      nickname: userData?.nickname || "",
      user_tech: userData?.user_tech || "",
      game_category: userData?.game_category || [],
    },
  });

  const nickname = watch("nickname");
  const user_tech = watch("user_tech");
  const game_category = watch("game_category");

  const profileMutation = useMutation({
    mutationFn: async (formData: ProfileFormData) => {
      if (!userData?.user_pk) throw new Error("사용자 ID가 없습니다.");

      const updateData: Partial<TUserInformationInputForm> = {
        nickname: formData.nickname,
        user_tech: formData.user_tech,
        game_category: formData.game_category.join(","),
        is_maker: userData.is_maker,
      };

      return updateUserData(userData.user_pk, updateData);
    },
    onSuccess: () => {
      const token = sessionStorage.getItem("accessToken");
      if (token) {
        setUser(token);
        onSuccess?.();
      }
    },
    onError: (error: any) => {
      onError?.(error.response.data.error_message);
    },
  });

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
      value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,10}$/,
      message: "닉네임은 영숫자 조합 문자열이어야 합니다",
    },
  };

  const onSubmit = handleSubmit((data) => {
    profileMutation.mutate(data);
  });

  const isFormValid =
    nickname && !errors.nickname && user_tech && user_tech.length > 0 && game_category && game_category.length > 0;

  return (
    <div className="flex flex-col gap-4 min-w-[500px]">
      <SpartaTextField
        label="닉네임"
        type="medium"
        register={register("nickname", nicknameValidation)}
        subLabel={{
          default: "4~10자 이하의 영숫자 조합 문자열을 입력해주세요.",
          error: errors.nickname?.message as string,
          pass: nickname && !errors.nickname ? "사용 가능한 닉네임입니다" : "",
        }}
        inputProps={{
          placeholder: "닉네임을 입력해주세요",
        }}
        pass={!!nickname && !errors.nickname}
        error={!!errors.nickname}
      />
      <SpartaChipSelect
        label="관심 게임 분야"
        options={GAME_CATEGORY}
        control={control}
        name="game_category"
        pass={game_category && game_category.length > 0}
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
        pass={!!user_tech && user_tech.length > 0}
        name="user_tech"
        subLabel={{
          default: "관심있는 기술 분야를 선택해주세요.",
          error: "태그를 하나 이상 선택해주세요",
          pass: "태그가 선택되었습니다",
        }}
      />
      <SpartaButton
        content="변경하기"
        size="medium"
        colorType="primary"
        disabled={!isFormValid || profileMutation.isPending}
        onClick={onSubmit}
      />
    </div>
  );
};

export default ProfileModal;

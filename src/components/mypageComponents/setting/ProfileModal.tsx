import { useForm } from "react-hook-form";
import { GAME_CATEGORY } from "../../../constant/constant";
import SpartaChipSelect from "../../../spartaDesignSystem/SpartaChipSelect";
import SpartaTextField from "../../../spartaDesignSystem/SpartaTextField";
import SpartaButton from "../../../spartaDesignSystem/SpartaButton";
import { userStore } from "../../../share/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { updateUserData } from "../../../api/user";
import { TUserInformationInputForm } from "../../../types";

interface ProfileFormData {
  nickname: string;
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
      nickname: userData?.data.nickname || "",
      game_category: userData?.data.game_category || [],
    },
  });

  const nickname = watch("nickname");
  const game_category = watch("game_category");

  const profileMutation = useMutation({
    mutationFn: async (formData: ProfileFormData) => {
      if (!userData?.data.user_id) throw new Error("사용자 ID가 없습니다.");

      const updateData: Partial<TUserInformationInputForm> = {
        nickname: formData.nickname,
        game_category: formData.game_category.join(","),
      };

      return updateUserData(userData.data.user_id, updateData);
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
      value: 12,
      message: "닉네임은 12자 이하여야 합니다",
    },
    pattern: {
      value: /^[a-zA-Z0-9가-힣]*$/,
      message: "닉네임은 12자 이하 영/한/숫자만 사용 가능합니다.",
    },
  };

  const onSubmit = handleSubmit((data) => {
    profileMutation.mutate(data);
  });

  const isFormValid = nickname && !errors.nickname && game_category && game_category.length > 0;

  return (
    <div className="flex flex-col gap-3 min-w-[500px]">
      <SpartaTextField
        label="닉네임"
        type="medium"
        register={register("nickname", nicknameValidation)}
        subLabel={{
          default: "영/한 관계없이 10글자 내외로 입력해주세요",
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
        label="추천받을 게임분야"
        options={GAME_CATEGORY}
        control={control}
        name="game_category"
        pass={game_category && game_category.length > 0}
        subLabel={{
          default: "관심있는 게임 분야를 선택해주세요",
          error: "태그를 하나 이상 선택해주세요",
          pass: "추천받을 게임분야를 3개까지 선택할 수 있어요",
        }}
        multiple
        maxCount={3}
      />

      <SpartaButton
        content="변경하기"
        size="medium"
        colorType="primary"
        type="filled"
        disabled={!isFormValid || profileMutation.isPending}
        onClick={onSubmit}
      />
    </div>
  );
};

export default ProfileModal;

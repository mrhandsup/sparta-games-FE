import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FormControl, MenuItem, OutlinedInput, Select, styled } from "@mui/material";

import SpartaChipSelect from "../../../../spartaDesignSystem/SpartaChipSelect";
import SpartaRadioGroup from "../../../../spartaDesignSystem/SpartaRadioGroup";
import SpartaTextField from "../../../../spartaDesignSystem/SpartaTextField";

import { GAME_CATEGORY, ROLE_CHOICES } from "../../../../constant/constant";
import { TProfileRegisterForm, TTeamBuildProfileListItem } from "../../../../types";

import profileImageUpload from "../../../../assets/communityImage/profileImageUpload.png";
import addBtn from "../../../../assets/common/plus_gray.svg";
import removeBtn from "../../../../assets/common/deleteIcon_trash.png";
import defaultProfile from "../../../../assets/common/defaultProfile.svg";

type Props = {
  profileData: TTeamBuildProfileListItem;
  isEditMode: boolean;
};
export default function PorfileRegisterFormBasic({ profileData, isEditMode }: Props) {
  const { register, control, setValue, watch, formState } = useFormContext<TProfileRegisterForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "portfolio",
  });

  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [borderActiveStates, setBorderActiveStates] = useState<boolean[]>([]);

  useEffect(() => {
    setBorderActiveStates((prev) => {
      const diff = fields.length - prev.length;

      if (diff > 0) {
        // 새로 추가된 Select 박스의 기본 테두리 색으로 변경하고 기존 Select 박스의 변경된 테두리 색은 유지
        return [...prev, ...Array(diff).fill(false)];
      }

      return prev.slice(0, fields.length); // 필드가 삭제된 경우 이전 상태와 길이 맞춤
    });
  }, [fields.length]);

  useEffect(() => {
    const profileImage = watch("profile_image")?.[0];

    if (profileImage instanceof File) {
      const previewUrl = URL.createObjectURL(profileImage);
      setProfilePreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    } else if (isEditMode && profileData?.profile_image) {
      const imageUrl =
        import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
          ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + profileData.profile_image
          : profileData.profile_image;
      setProfilePreview(imageUrl);
    } else {
      setProfilePreview(defaultProfile);
    }
  }, [watch]);

  const toggleBorderActive = (index: number) => {
    setBorderActiveStates((prev) => {
      const newStates = [...prev];
      newStates[index] = true;
      return newStates;
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
    }
  };

  const onClickAddLink = () => {
    append({ link: "", type: "portfolio" });
  };

  const onClickRemoveLink = (index: number) => {
    remove(index);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 40 * 4.5,
        backgroundColor: "#1A1A1A",
        color: "#FFF",
      },
    },
  };

  const CustomMenuItem = styled(MenuItem)({
    color: "#FFF",
    fontSize: "14px",
    backgroundColor: "#1A1A1A",
    "&:hover": {
      backgroundColor: "#333333",
    },
  });

  console.log("profileData", profileData);

  return (
    <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
      <p className="font-DungGeunMo text-xl text-primary-400 mb-4">기본 프로필 정보 작성</p>

      <div className="flex gap-10 w-full">
        <div className="flex flex-col basis-1/2 gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-gray-50 text">프로필 이미지</span>

            <div className="flex items-end gap-2">
              <div className="border border-solid border-gray-400 rounded-sm">
                <img
                  className=" w-28 h-28 object-cover"
                  src={
                    profilePreview ||
                    (profileData?.profile_image === null
                      ? defaultProfile
                      : import.meta.env.VITE_DEPLOYMENT_MODE === "dev"
                      ? import.meta.env.VITE_PROXY_HOST.replace(/\/$/, "") + profileData?.profile_image
                      : profileData?.profile_image)
                  }
                  alt="프로필 이미지"
                />
              </div>
              <label htmlFor="profile-image" className="cursor-pointer">
                <img className="w-7 h-7" src={profileImageUpload} alt="프로필 이미지 업로드" />
              </label>

              <input
                id="profile-image"
                type="file"
                accept="image/*"
                {...register("profile_image", {
                  onChange: (e) => {
                    handleImageChange(e);
                  },
                })}
                className="hidden"
              />
            </div>
          </div>

          <SpartaRadioGroup groupsToShow={["career"]} control={control} watch={watch} setValue={setValue} />

          <div className="flex flex-col gap-4 basis-full">
            <SpartaChipSelect
              label="나의 포지션"
              options={ROLE_CHOICES}
              control={control}
              rules={{ required: "나의 포지션을 선택해주세요." }}
              name="my_role"
              placeHolderText="나의 포지션을 선택해주세요."
            />
          </div>
        </div>

        <div className="flex flex-col gap-5 basis-1/2">
          <SpartaTextField
            label="기술 스택 또는 툴"
            type="small"
            register={register("tech_stack", {
              required: "기술 스택 또는 툴을 입력해주세요.",
              maxLength: {
                value: 100,
                message: "최대 100자까지 입력 가능합니다.",
              },
            })}
            inputProps={{
              placeholder: "Unity, Unreal, Adobe 등",
              maxLength: 100,
            }}
            subLabel={{
              default: "",
              error: formState.errors.tech_stack?.message as string,
              pass: "",
            }}
            error={!!formState.errors.tech_stack}
          />

          <SpartaChipSelect
            label="관심 게임개발장르"
            subLabel={{ default: "*선택", error: "", pass: "" }}
            options={GAME_CATEGORY}
            control={control}
            name="game_genre"
            placeHolderText="관심 게임개발장르를 선택해주세요."
            multiple
          />

          <div className="flex flex-col">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2">
                <div className="basis-[70%]">
                  <Controller
                    name={`portfolio.${index}.link`}
                    control={control}
                    defaultValue={field.link}
                    render={({ field }) => (
                      <SpartaTextField
                        label={index === 0 ? "포트폴리오 및 기타 링크" : ""}
                        subLabel={{ default: index === 0 ? "*선택" : "", error: "", pass: "" }}
                        type="small"
                        inputProps={{
                          ...field,
                          placeholder: "https://",
                        }}
                      />
                    )}
                  />
                </div>

                <div className="basis-[30%]">
                  <div className="flex gap-2">
                    <Controller
                      name={`portfolio.${index}.type`}
                      control={control}
                      defaultValue={field.type}
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <Select
                            {...field}
                            onClick={() => {
                              if (field.value === "portfolio" && !borderActiveStates[index]) {
                                toggleBorderActive(index);
                              }
                            }}
                            MenuProps={MenuProps}
                            input={<OutlinedInput />}
                            displayEmpty
                            sx={{
                              backgroundColor: "#1A1A1A",
                              color: "#FFF",
                              fontSize: "14px",
                              padding: "2px",
                              borderRadius: "6px",
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: borderActiveStates[index] ? "#fff" : "#737373",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: borderActiveStates[index] ? "#fff" : "#737373",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: borderActiveStates[index] ? "#fff" : "#737373",
                              },
                              "& .MuiSelect-icon": {
                                color: "#E5E5E5",
                              },
                              "& .MuiInputBase-input": {
                                padding: "10px 14px",
                              },
                            }}
                          >
                            <CustomMenuItem value="portfolio">포트폴리오</CustomMenuItem>
                            <CustomMenuItem value="link">Link</CustomMenuItem>
                            <CustomMenuItem value="github">GitHub</CustomMenuItem>
                            <CustomMenuItem value="notion">Notion</CustomMenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                    {index !== 0 && (
                      <button type="button" onClick={() => onClickRemoveLink(index)}>
                        <img src={removeBtn} alt="삭제" className="w-9 h-9" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div onClick={onClickAddLink} className="inline-flex items-center gap-1 text-white cursor-pointer">
            <img className="w-6 h-6" src={addBtn} alt="링크 추가하기" />
            <span>추가하기</span>
          </div>
        </div>
      </div>
    </div>
  );
}

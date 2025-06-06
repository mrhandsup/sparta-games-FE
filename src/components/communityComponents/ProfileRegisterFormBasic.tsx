import { FormControl, MenuItem, OutlinedInput, Select, styled } from "@mui/material";
import { GAME_CATEGORY, ROLE_CHOICES } from "../../constant/constant";
import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";
import SpartaRadioGroup from "../../spartaDesignSystem/SpartaRadioGroup";
import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";

import profileImageUpload from "../../assets/communityImage/profileImageUpload.png";
import addBtn from "../../assets/common/Plus_gray.svg";
import removeBtn from "../../assets/common/deleteIcon_trash.png";
import defaultImage from "../../assets/common/defaultProfile.svg";
import { useState } from "react";
import { Control, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { TProfileRegisterForm } from "../../types";

type Props = {
  register: UseFormRegister<TProfileRegisterForm>;
  control: Control<TProfileRegisterForm>;
  watch: UseFormWatch<TProfileRegisterForm>;
  setValue: UseFormSetValue<TProfileRegisterForm>;
};

export default function PorfileRegisterFormBasic({ register, control, watch, setValue }: Props) {
  const [profilePreview, setProfilePreview] = useState(defaultImage);
  const [linkItems, setLinkItems] = useState([{ link: "", type: "portfolio", isBorderActive: false }]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePreview(previewUrl);
    }
  };

  const onClickAddLink = () => {
    setLinkItems([...linkItems, { link: "", type: "portfolio", isBorderActive: false }]);
  };

  const onClickRemoveLink = (indexToRemove) => {
    const updatedItems = linkItems.filter((_, i) => i !== indexToRemove);
    setLinkItems(updatedItems);
  };

  const onChangeType = (index) => (e) => {
    const newLinkItems = [...linkItems];
    if (!newLinkItems[index].isBorderActive) {
      newLinkItems[index].isBorderActive = true;
    }

    newLinkItems[index].type = e.target.value;
    setLinkItems(newLinkItems);
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

  return (
    <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
      <p className="font-DungGeunMo text-xl text-primary-400">기본 프로필 정보 작성</p>

      <div className="flex gap-10 w-full">
        <div className="flex flex-col basis-1/2 gap-6">
          <span className="text-gray-50 text-sm mb-2">프로필 이미지</span>

          <div className="flex items-end gap-2">
            <div className="border border-solid border-gray-400 rounded-sm">
              <img className=" w-20 h-20 object-cover" src={profilePreview} alt="프로필 이미지" />
            </div>
            <label htmlFor="profile-image" className="cursor-pointer">
              <img className="w-7 h-7" src={profileImageUpload} alt="프로필 이미지 업로드" />
            </label>

            <input
              id="profile-image"
              type="file"
              accept="image/*"
              {...register("profileImage", {
                required: "프로필 이미지 업로드 해주세요.",
                onChange: (e) => {
                  handleImageChange(e);
                },
              })}
              className="hidden"
            />
          </div>

          <div className="flex flex-col gap-4">
            <SpartaRadioGroup groupsToShow={["jobStatus"]} control={control} watch={watch} setValue={setValue} />
          </div>

          <div className="flex gap-10 mt-5">
            <div className="flex flex-col gap-4 basis-full">
              <SpartaChipSelect
                label="나의 포지션"
                options={ROLE_CHOICES}
                control={control}
                rules={{ required: "나의 포지션을 선택해주세요." }}
                name="position"
                placeHolderText="나의 포지션을 선택해주세요."
              />
            </div>
          </div>
        </div>

        <div className="basis-1/2">
          <div className="mb-6">
            <SpartaTextField
              label="기술 스택 또는 툴"
              type="small"
              register={register("tech", { required: "연락방법을 입력해주세요." })}
              inputProps={{
                placeholder: "Unity, Unreal, Adobe 등",
              }}
            />
          </div>
          <div className="mb-6">
            <SpartaChipSelect
              label="관심 게임개발장르"
              options={GAME_CATEGORY}
              control={control}
              rules={{ required: "관심 게임개발장르를 선택해주세요." }}
              name="favoriteGenre"
              placeHolderText="관심 게임개발장르를 선택해주세요."
            />
          </div>
          <div className="mb-4">
            {linkItems.map((item, index) => (
              <div className="flex items-end gap-2">
                <div className="basis-[70%]">
                  <SpartaTextField
                    label={index === 0 ? "포트폴리오 및 기타 링크" : ""}
                    type="small"
                    register={register(`link.${index}`, { required: "연락방법을 입력해주세요." })}
                    inputProps={{
                      placeholder: "https://",
                    }}
                  />
                </div>
                <div className="basis-[30%]">
                  <div className="flex gap-2">
                    <FormControl fullWidth>
                      <Select
                        value={item.type}
                        onChange={onChangeType(index)}
                        onClick={() => {
                          if (item.type === "portfolio" && !item.isBorderActive) {
                            const newLinkItems = [...linkItems];
                            newLinkItems[index].isBorderActive = true;
                            setLinkItems(newLinkItems);
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
                            borderColor: item.isBorderActive ? "#fff" : "#737373",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: item.isBorderActive ? "#fff" : "#737373",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: item.isBorderActive ? "#fff" : "#737373",
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

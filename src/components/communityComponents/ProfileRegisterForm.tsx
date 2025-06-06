import CommunityProjectTitle from "../common/CommunityProjectTitle";
import recruitImage from "../../assets/gameDetail/ReviewEdit.svg";
import SpartaRadioGroup from "../../spartaDesignSystem/SpartaRadioGroup";
import { useForm } from "react-hook-form";
import SpartaChipSelect from "../../spartaDesignSystem/SpartaChipSelect";
import { GAME_CATEGORY, LINK_CHOICES, ROLE_CHOICES } from "../../constant/constant";
import SpartaTextField from "../../spartaDesignSystem/SpartaTextField";
import SpartaButton from "../../spartaDesignSystem/SpartaButton";
import defaultImage from "../../assets/common/defaultProfile.svg";
import profileImageUpload from "../../assets/communityImage/profileImageUpload.png";
import { TProfileRegisterForm } from "../../types";
import { FormControl, MenuItem, OutlinedInput, Select, styled } from "@mui/material";
import { useState } from "react";
import addBtn from "../../assets/common/Plus_gray.svg";

export default function ProfileRegisterForm() {
  const { register, watch, handleSubmit, control, setValue, formState, trigger } = useForm<TProfileRegisterForm>({
    mode: "onChange",
  });

  const [selectedType, setSelectedType] = useState("portfolio");
  const [isInitial, setIsInitial] = useState(true);

  const handleChange = (e) => {
    setSelectedType(e.target.value);
    if (isInitial) setIsInitial(false); // 첫 변경 시점에 초기 상태 해제
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
    <div className="mx-auto mt-16">
      <div className="flex justify-center items-center mb-10">
        <div className="flex items-center justify-center w-8 h-8 border border-solid border-gray-400 text-gray-400 rounded-full cursor-pointer">
          <span className="font-DungGeunMo text-xl">1</span>
        </div>

        <div className="h-0.5 w-6 bg-gray-500"></div>

        <div className="flex items-center justify-center w-8 h-8 border border-solid border-green-500 text-green-500 rounded-full cursor-pointer">
          <span className="font-DungGeunMo text-xl">2</span>
        </div>
      </div>

      <CommunityProjectTitle img={recruitImage} title={"프로필을 등록하고 프로젝트를 시작해보세요"} />

      <form>
        <div className="w-[1180px] mx-auto">
          <div className="w-full mt-10 mb-6 p-9 bg-gray-800 rounded-xl">
            <p className="font-DungGeunMo text-xl text-primary-400">기본 프로필 정보 작성</p>

            <div className="flex gap-10 w-full">
              <div className="flex flex-col basis-1/2 gap-6">
                <span className="text-gray-50 text-sm mb-2">프로필 이미지</span>

                <div className="flex items-end gap-2">
                  <div className="p-2 border border-solid border-gray-400 rounded-sm">
                    <img className="w-20 h-20" src={defaultImage} alt="프로필 이미지" />
                  </div>
                  <label htmlFor="profile-image" className="cursor-pointer">
                    <img className="w-7 h-7" src={profileImageUpload} alt="프로필 이미지 업로드" />
                  </label>
                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    {...register("profileImage", { required: "프로필 이미지 업로드 해주세요." })}
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

              <div className="flex flex-col basis-1/2 gap-6">
                <SpartaTextField
                  label="기술 스택 또는 툴"
                  type="small"
                  register={register("tech", { required: "연락방법을 입력해주세요." })}
                  inputProps={{
                    placeholder: "Unity, Unreal, Adobe 등",
                  }}
                />

                <SpartaChipSelect
                  label="관심 게임개발장르"
                  options={GAME_CATEGORY}
                  control={control}
                  rules={{ required: "관심 게임개발장르를 선택해주세요." }}
                  name="position"
                  placeHolderText="관심 게임개발장르를 선택해주세요."
                />

                <div className="flex items-end gap-2">
                  <div className="basis-[70%]">
                    <SpartaTextField
                      label="포트폴리오 및 기타 링크"
                      type="small"
                      register={register("link", { required: "연락방법을 입력해주세요." })}
                      inputProps={{
                        placeholder: "https://",
                      }}
                    />
                  </div>
                  <div className="basis-[30%]">
                    <div className="basis-[30%] flex flex-col justify-end">
                      <FormControl fullWidth>
                        <Select
                          value={selectedType}
                          onChange={handleChange}
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
                              borderColor: isInitial ? "#737373" : "#fff",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: isInitial ? "#737373" : "#fff",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: isInitial ? "#737373" : "#fff",
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
                          <CustomMenuItem value="github">GITHUB</CustomMenuItem>
                          <CustomMenuItem value="notion">NOTION</CustomMenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-white cursor-pointer">
                  <img className="w-6 h-6" src={addBtn} alt="링크 추가하기" />
                  <span>추가하기</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

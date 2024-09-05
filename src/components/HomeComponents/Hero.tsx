import useLoginModalStore from "../../share/store/modalStore";

import heroImage from "../../assets/homeImage/heroImage.svg";
const Hero = () => {
  const { openModal } = useLoginModalStore();

  return (
    <section className="flex items-center gap-[60px] w-full h-[475px] bg-gray-700 text-white">
      {/* 아래 div크기로 이미지가 들어감 */}
      <img src={heroImage} />
      <div className="flex flex-col justify-center gap-4">
        <h2 className="font-DungGeunMo text-heading-40">★ Welcome to Sparta Games ★</h2>

        <div className="flex flex-col items-center text-body-18">
          <p>스파르타 게임즈는 게임을 사랑하는 사람들을 위한 공간입니다.</p>
          <p>유저들에게는 다양한 게임을 즐기고, 평가할 수 있는</p>
          <p>개발자들에게는 자신이 만든 게임을 선보이고,</p>
          <p>같이 게임을 만들어 갈 동료를 구할 수 있습니다.</p>
        </div>

        <div className="flex gap-6">
          <button className="w-64 h-12 rounded-lg bg-primary-500 text-primary-950" onClick={() => openModal()}>
            로그인
          </button>
          <button className="w-64 h-12 rounded-lg border border-solid border-primary-500 text-primary-500">
            회원가입
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

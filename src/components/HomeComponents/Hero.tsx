import useLoginModalStore from "../../share/store/modalStore";

const Hero = () => {
  const { openModal } = useLoginModalStore();

  return (
    <section className="flex justify-center items-center gap-[60px] w-full h-[418px] bg-gray-700 text-white">
      {/* 아래 div크기로 이미지가 들어감 */}
      <div className="w-[580px] h-[298px] bg-gray-200" />
      <div className="flex flex-col justify-center gap-6">
        <h2 className="text-heading-40">Sparta Games</h2>

        <div className="text-body-18 flex flex-col gap-1">
          <p>주니어 개발자들의 게임을 즐기고, 자유롭게 의견을 나눌 수 있습니다.</p>
          <p>게임개발에 대한 다양한 주니어분들과 자유롭게 소통할 수 있습니다.</p>
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

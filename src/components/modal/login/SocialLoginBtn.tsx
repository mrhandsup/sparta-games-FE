type ButtonTypes = {
  icon: string;
  altText: string;
  bgColor: string;
  loginUrl: string;
};

const SocialLoginBtn = ({ icon, altText, bgColor, loginUrl }: ButtonTypes) => {
  console.log(loginUrl);

  const bgImage = `bg-[url(${icon})]`;
  return (
    <div
      onClick={() => (window.location.href = loginUrl)}
      className={`h-[48px] w-[48px] flex items-center justify-center px-[12px] rounded-full shadow-[0_1px_2px_0_rgba(0,0,0,0.25)] ${bgColor} w-fit ${bgImage}`}
    >
      <img src={icon} alt={altText} />
    </div>
  );
};

export default SocialLoginBtn;

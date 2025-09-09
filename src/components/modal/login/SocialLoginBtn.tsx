type ButtonTypes = {
  icon: string;
  altText: string;
  bgColor: string;
  loginUrl: string;
  textColor?: string;
  redirectPath?: string;
};

const SocialLoginBtn = ({ icon, altText, bgColor, loginUrl, textColor, redirectPath }: ButtonTypes) => {
  const bgImage = `bg-[url(${icon})]`;
  return (
    <div
      onClick={() => {
        window.location.href = loginUrl;
        if (redirectPath) {
          sessionStorage.setItem("redirectPath", redirectPath);
        }
      }}
      className={`h-[48px] flex items-center justify-center px-[12px] rounded-full shadow-[0_1px_2px_0_rgba(0,0,0,0.25)] ${bgColor} w-full ${bgImage} gap-3 ${textColor} cursor-pointer`}
    >
      <img src={icon} alt={altText} className="w-[24px] h-[24px]" />
      <div className="text-title-16">{altText}</div>
    </div>
  );
};

export default SocialLoginBtn;

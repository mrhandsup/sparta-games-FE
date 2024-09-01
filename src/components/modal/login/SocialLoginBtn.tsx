type ButtonTypes = {
  icon: string;
  altText: string;
  bgColor: string;
  textColor: string;
  loginSpan: string;
  loginUrl: string;
};

const SocialLoginBtn = ({ icon, altText, bgColor, textColor, loginSpan, loginUrl }: ButtonTypes) => {
  console.log(loginUrl);
  return (
    <button
      onClick={() => (window.location.href = loginUrl)}
      type="button"
      className={`h-[40px] flex items-center px-[12px] rounded-[2px] shadow-[0_1px_2px_0_rgba(0,0,0,0.25)] ${bgColor}`}
    >
      <img src={icon} alt={altText} />
      <div className={`w-[100%] text-center text-[14px] h-[16px] font-medium ${textColor}`}>
        <span>{loginSpan}</span>
      </div>
    </button>
  );
};

export default SocialLoginBtn;

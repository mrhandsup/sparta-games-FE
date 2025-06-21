import { Link } from "react-router-dom";
import titleImage from "../assets/footerTitleImage.svg";

const Footer = () => {
  return (
    <footer className="flex justify-center mx-auto py-8 px-[130px] w-full bg-black text-gray-200 mt-[80px]">
      <div className="flex flex-col items-center gap-4">
        <p>
          <img src={titleImage} />
        </p>
        <p>© 2024 Sparta Games. All Rights Reserved.</p>
        <div className="flex gap-[60px] text-title-18">
          <a href="https://www.notion.so/17257166c44c80a8a082ff6d8da37312" target="_blank">
            <p>ABOUT</p>
          </a>
          <p>FAQ</p>
          {/* <p>GitHub</p> */}
          <p>Contact</p>
        </div>
        <div className="flex gap-[60px] text-body-14 underline underline-offset-4">
          <Link to="/privacy-policy">
            <p className="cursor-pointer">Privacy Policy</p>
          </Link>

          <Link to="/termsofservice">
            <p className="cursor-pointer">Terms of Service</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

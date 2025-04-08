import titleImage from "../assets/footerTitleImage.svg";
import useModalToggles from "../hook/useModalToggles";
import SpartaModal from "../spartaDesignSystem/SpartaModal";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";

const Footer = () => {
  const PRIVACY_POLICY_MODAL_ID = "privacypolicyModal";
  const TERMS_OF_SERVICE_MODAL_ID = "termsofserviceModal";

  // 모달
  const { modalToggles, onClickModalToggleHandlers } = useModalToggles([
    PRIVACY_POLICY_MODAL_ID,
    TERMS_OF_SERVICE_MODAL_ID,
  ]);
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
          <p
            onClick={() => {
              onClickModalToggleHandlers[PRIVACY_POLICY_MODAL_ID]();
              document.body.classList.add("overflow-hidden");
            }}
            className="cursor-pointer"
          >
            Privacy Policy
          </p>
          <p
            onClick={() => {
              onClickModalToggleHandlers[TERMS_OF_SERVICE_MODAL_ID]();
              document.body.classList.add("overflow-hidden");
            }}
            className="cursor-pointer"
          >
            Terms of Service
          </p>
        </div>
      </div>

      <SpartaModal
        isOpen={modalToggles[PRIVACY_POLICY_MODAL_ID]}
        onClose={() => {
          onClickModalToggleHandlers[PRIVACY_POLICY_MODAL_ID]();
          document.body.classList.remove("overflow-hidden");
        }}
        modalId={PRIVACY_POLICY_MODAL_ID}
        title="개인정보 처리방침"
      >
        <PrivacyPolicy />
      </SpartaModal>

      <SpartaModal
        isOpen={modalToggles[TERMS_OF_SERVICE_MODAL_ID]}
        onClose={() => {
          onClickModalToggleHandlers[TERMS_OF_SERVICE_MODAL_ID]();
          document.body.classList.remove("overflow-hidden");
        }}
        modalId={PRIVACY_POLICY_MODAL_ID}
        title="서비스 이용약관"
      >
        <TermsOfService />
      </SpartaModal>
    </footer>
  );
};

export default Footer;

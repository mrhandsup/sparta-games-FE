const Footer = () => {
  return (
    <footer className="flex justify-center py-8 px-[130px] w-full bg-black text-gray-200">
      <div className="flex flex-col items-center gap-4">
        <p className="font-DungGeunMo text-heading-40">Sparta Games</p>
        <p>© 2024 Sparta Games. All Rights Reserved.</p>
        <div className="flex gap-[60px] text-title-18">
          <p>ABOUT</p>
          <p>FAQ</p>
          <p>GitHub</p>
          <p>ConTact</p>
        </div>
        <div className="flex gap-[60px] text-body-14 underline underline-offset-4">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

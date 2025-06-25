import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const links = [
    {
      href: "https://fb.com/kai3089",
      icon: <FaFacebook />,
    },
    {
      href: "https://www.instagram.com/kai3089",
      icon: <FaInstagram />,
    },
    {
      href: "https://www.instagram.com/kai3089",
      icon: <FaInstagram />,
    },
  ];
  return (
    <footer className="w-screen bg-violet-300 py-4 text-black">
      <div className="flex flex-col items-center container mx-auto justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm md:text-left">
          &copy; Nova 2024. All Right Reserved
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          {links.map((link, index) => (
            <a href={link.href} key={index} target="_blank">
              {link.icon}
            </a>
          ))}
        </div>
        <a
          href="#privacy-policy"
          className="text-sm text-center hover:underline md:text-right"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;

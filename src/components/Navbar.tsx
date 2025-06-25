import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import Button from "./Button";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(true);
  const [isActiveBar, setIsActiveBar] = useState<boolean>(true);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsActiveBar((prev) => !prev);
  };

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (isAudioPlaying && audioRef.current) {
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isAudioPlaying, audioRef]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
      ease: "power2.inOut",
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className=" fixed top-4 h-16 z-50 border-none inset-x-2 transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" className="h-10" alt="logo" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex items-center h-full">
            <div className="hidden md:flex items-center ">
              {navItems.map((item) => (
                <a href={`#${item}`} key={item} className="nav-hover-btn">
                  {item}
                </a>
              ))}
            </div>
            <button
              className="border-none ml-10 flex items-center justify-center space-x-0.5 cursor-pointer mt-[5px]"
              onClick={toggleAudio}
            >
              <audio
                ref={audioRef}
                src="/audio/loop.mp3"
                loop
                className="hidden"
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${isActiveBar ? "active" : ""}`}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                ></div>
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;

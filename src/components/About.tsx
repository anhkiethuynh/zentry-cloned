import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimate = gsap.timeline({
      scrollTrigger: {
        // The element that triggers the animation - in this case the div with id "clip"
        trigger: "#clip",
        // Animation starts when the element's center reaches the center of viewport
        start: "center center",
        // Animation ends 800px after the start position, keeping center alignment
        end: "+=800 center",
        // Scrub ties animation progress to scroll position
        // 0.5 means animation is smoothed/interpolated over 0.5 seconds
        // Higher values = smoother but more delayed animation
        // Lower values = more immediate but potentially choppy animation
        // true = animation follows scroll 1:1 with no smoothing
        scrub: 0.5,
        pin: true, // Pins the trigger element in place during scrolling animation
        pinSpacing: true, // Creates space in document flow equal to pinned element's height
      },
    });
    clipAnimate.to(".mask-clip-path", {
      // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      width: "100vw",
      height: "101vh",
      borderRadius: 0,
    });
  });
  return (
    <section id="about" className="z-0 min-h-screen w-screen block">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px] ">
          Wellcome to Zentry
        </p>
        <AnimatedTitle
          text="Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared <b>a</b>dventure"
          containerClass="!text-black"
        />
        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic, MMORPG</p>
          <p className="text-gray-500">
            Zentry unites every player from coutless games and platforms
          </p>
        </div>
      </div>
      <div id="clip" className="h-dvh w-screen">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="About Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;

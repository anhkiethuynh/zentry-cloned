import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const AnimatedTitle = ({
  text,
  containerClass,
}: {
  text: string;
  containerClass?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimations = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          /* onEnter - play, onEnterBack - none, onLeave - none, onLeaveBack - reverse */
          toggleActions: "play none none reverse",
        },
      });

      titleAnimations.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
        // duration: 0.5,
        stagger: 0.02,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {text.split("<br />").map((line, index) => (
        <div key={index} className="flex flex-col">
          <div
            key={index}
            className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
          >
            {line.split(" ").map((word, index) => {
              return (
                <span
                  key={index}
                  className="animated-word"
                  dangerouslySetInnerHTML={{ __html: word }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;

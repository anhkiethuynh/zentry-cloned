import React, { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";

const Story = () => {
  const frameRef = useRef<HTMLImageElement>(null);
  const handleMouseLeave = () => {
    if (!frameRef.current) return;
    const element = frameRef.current;
    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      transformPerspective: 0,
      ease: "power1.inOut",
    });
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;
    if (!element) return;

    const { width, height, left, top } = element.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };
  return (
    <section
      id="story"
      className="min-h-dvh w-screen bg-black text-blue-50 overflow-hidden"
    >
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <div className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </div>
        <div className="relative size-full">
          <AnimatedTitle
            text="The st<b>o</b>ry of<br />a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10 text-center"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  src="/img/entrance.webp"
                  alt="entrance"
                  ref={frameRef}
                  className="object-contain"
                  onMouseUp={handleMouseLeave}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={handleMouseLeave}
                />
              </div>
            </div>
            <RoundedCorners />
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            <p className="text-center text-sm md:text-base max-w-sm md:text-start font-circular-web">
              Where realms coverge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              oportunities.
            </p>
            <Button
              id="realm-button"
              title="Discover prologue"
              className="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;

import React, { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const Features = () => {
  return (
    <section className="relative bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metagame Layer
          </p>
          <p className="text-blue-50 font-circular-web text-lg max-w-md opacity-40">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of products converge into an interconnected overlay
            experience on your world.
          </p>
        </div>
        <BentoTilt
          sensitivity={190}
          className="border-hsla relative h-96 w-full mb-7 overflow-hidden rounded-md md:h-[65vh]"
        >
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                radi<b>n</b>t
              </>
            }
            description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
            isCommingSoon
          />
        </BentoTilt>
        <div className="grid h-[135vh] grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:!col-span-1 md:!row-span-2 ">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  <b>Z</b>ig<b>M</b>a
                </>
              }
              description="
              A anime and gaming-inspired NFT collection - the IP primed for expansion."
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:!col-span-1 md:!ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  N<b>e</b>x<span>u</span>s
                </>
              }
              description="The agent of agents elevating agentic AI experience to be more fun and productive. "
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 row-span-1 me-14 md:!col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  A<b>z</b>ul
                </>
              }
              description="A cross-platform AI Agent - elevating your activities across Web2 and Web3 games into a rewarding adventure."
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
              <h2 className="bento-title special-font max-w-64 text-black">
                M<b>o</b>re co<b>m</b>ing so<b>o</b>n
              </h2>
              <TiLocationArrow className="m-5 scale-[5] text-black self-end" />
            </div>
          </BentoTilt>
          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              autoPlay
              loop
              muted
              className="h-full w-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description: string;
  isCommingSoon?: boolean;
}

const BentoTilt = ({
  children,
  className,
  sensitivity = 60,
}: {
  children: React.ReactNode;
  className?: string;
  sensitivity?: number;
}) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const { width, height, left, top } =
      itemRef.current.getBoundingClientRect();
    const x = e.clientX - left; // vị trí x chuột trong item
    const y = e.clientY - top; // vị trí y chuột trong item

    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = -(y - centerY) / sensitivity;
    const rotateY = (x - centerX) / sensitivity;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(0.95, 0.95, 0.95)`
    );
  };
  const handleMouseLeave = () => {
    if (!itemRef.current) return;
    setTransformStyle("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };
  return (
    <div
      className={`${className}  will-change-transform `}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  src,
  title,
  description,
  isCommingSoon = false,
}: BentoCardProps) => {
  return (
    <div className="relative size-full overflow-hidden">
      <video
        src={src}
        autoPlay
        loop
        muted
        className="h-full w-full object-cover object-center absolute top-0 left-0"
      />
      <div className="relative z-10 felx size-full flex-col justify-between p-5 text-blue-50">
        {title && <h2 className="bento-title special-font">{title}</h2>}
        {description && (
          <p className="mt-3 max-w-64 text-xs md:text-base font-circular-web">
            {description}
          </p>
        )}
        {isCommingSoon && (
          <span className="mt-4 inline-block rounded-full bg-white/10 px-4 py-1 text-sm text-white">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
};

export default Features;

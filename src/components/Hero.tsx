import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
const totalVideos = 4;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadedVideo, setLoadedVideo] = useState<number>(0);
  const [overlayIndex, setOverlayIndex] = useState<number>(1);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (loadedVideo === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideo]);
  /* From 0 - 4*/
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const handleVideoLoaded = () => {
    setLoadedVideo((prev) => prev + 1);
  };

  const getVideoSrc = (index: number) => {
    return `/videos/hero-${index}.mp4`;
  };
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", {
          visibility: "visible",
        });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef.current?.play();
          },
          onComplete: () => {
            setOverlayIndex(currentIndex);
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(10% 0%, 80% 0, 93% 88%, 0 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0 100%)",
      borderRadius: "0 0 0 0",
      // duration: 1.5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  console.log({
    first: getVideoSrc(upcomingVideoIndex),
    second: getVideoSrc(currentIndex),
    third: getVideoSrc(currentIndex === totalVideos ? 1 : currentIndex),
    videos: nextVideoRef,
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVideoRef}
                className="size-64 object-cover scale-150 object-center"
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                onLoadedData={handleVideoLoaded}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            className="absolute-center invisible absolute z-20 size-64 object-center object-cover"
            muted
            loop
            id="next-video"
            src={getVideoSrc(currentIndex)}
            onLoadedData={handleVideoLoaded}
          />

          <video
            className="absolute left-0 top-0 size-full object-cover object-center"
            src={getVideoSrc(overlayIndex)}
            loop
            muted
            // autoPlay
            onLoadedData={handleVideoLoaded}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              Redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-re text-blue-100">
              Enter the Metagame <br /> Unleash the play Economy
            </p>
            <Button
              id="btn-watch"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>ming
      </h1>
    </div>
  );
};

export default Hero;

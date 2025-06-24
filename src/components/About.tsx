import React from "react";

const About = () => {
  return (
    <section id="about" className="z-0 min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <h2 className="font-general text-sm uppercase md:text-[10px] ">
          Wellcome to Zentry
        </h2>
        <div className="special-font font-zentry mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]">
          Disc<b>o</b>ver the world's <br /> l<b>a</b>rgest shared adventure
        </div>
      </div>
    </section>
  );
};

export default About;

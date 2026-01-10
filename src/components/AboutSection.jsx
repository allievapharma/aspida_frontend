import React from "react";
import about from "../assets/image/why/third.webp";
import abtlog from "../assets/image/white.jpg";

function AboutSection() {
  return (
    <div className=" bg-gradient-to-b from-cyan-50 to-white text-gray-800 px-6 py-16 md:px-20">
      {/* Header */}
      {/* <div className="text-center mb-16 transition-all duration-700 ease-out animate-fadeInDown">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-700">
          About <span className="text-cyan-500">Aspida</span>
        </h1>
      </div> */}
      {/* About Section */}
      <div className="myFadeup flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12  md:px-8 lg:px-16 py-12 ">
        {/* Image Section */}
        <div className="w-full relative lg:w-1/2 flex justify-center lg:justify-start">
          <img
            src={about}
            alt="Our Story"
            className="w-full max-w-md lg:max-w-full object-cover rounded-2xl shadow-lg"
          />
          <div className="absolute -bottom-[31px] w-[89px] -right-[10px] ">
            <img className="rounded-tl-[18px]" src={abtlog} alt="" />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 max-w-5xl shadow-[rgba(0,0,0,0.05)_0px_6px_24px_0px,rgba(0,0,0,0.08)_0px_0px_0px_1px] rounded-2xl  md:p-10 lg:p-12 transition-all duration-700 ease-out animate-fadeInUp">
          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-700 mb-4">
            About
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
            Welcome to Aspida Life Science, a fast-growing pharmaceutical and
            life sciences company incorporated in 2020 in India. We are driven
            by one clear purpose — to make high-quality, affordable medicines
            accessible to everyone.
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-cyan-700 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
            At Aspida Life Science, we combine scientific expertise, strict
            quality standards, and ethical business practices to deliver
            reliable healthcare solutions. Our operations are guided by
            compliance, consistency, and a strong commitment to patient
            well-being.
          </p>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            With a focus on long-term partnerships and continuous improvement,
            we strive to contribute meaningfully to the healthcare ecosystem in
            India and beyond.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;

import React from "react";

function AboutSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white text-gray-800 px-6 py-16 md:px-20">
      {/* Header */}
      <div className="text-center mb-16 transition-all duration-700 ease-out animate-fadeInDown">
        <h1 className="text-4xl md:text-5xl font-bold text-cyan-700">
          About <span className="text-cyan-500">Aspida</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Welcome to Aspida Life Science, a fast-growing pharmaceutical and life
          sciences company incorporated in 2020 in India. We are driven by one
          clear purpose — to make high-quality, affordable medicines accessible
          to everyone.
        </p>
      </div>

      {/* About Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-[rgba(0,0,0,0.05)_0px_6px_24px_0px,rgba(0,0,0,0.08)_0px_0px_0px_1px] rounded-2xl p-8 md:p-12 transition-all duration-700 ease-out animate-fadeInUp">
        <h2 className="text-2xl font-semibold text-cyan-700 mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At Aspida Life Science, we combine scientific expertise, strict
          quality standards, and ethical business practices to deliver reliable
          healthcare solutions. Our operations are guided by compliance,
          consistency, and a strong commitment to patient well-being.
        </p>
        <p className="text-gray-700 leading-relaxed">
          With a focus on long-term partnerships and continuous improvement, we
          strive to contribute meaningfully to the healthcare ecosystem in India
          and beyond.
        </p>
      </div>

      {/* Vision Section */}
      <div className="max-w-5xl mx-auto mt-12 bg-gradient-to-r from-cyan-100 to-white rounded-2xl shadow-md p-8 md:p-12 transition-all duration-700 ease-out animate-fadeInUp delay-200">
        <h2 className="text-2xl font-semibold text-cyan-700 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At <b>MediWorld</b>, our vision is to create a healthier, more
          connected world where quality healthcare is accessible to everyone —
          no matter where they live.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>To advance global healthcare by delivering high-quality, affordable pharmaceutical solutions.</li>
          <li>To ensure equitable access to trusted medicines across diverse markets.</li>
          <li>
          To integrate science, quality, and responsibility in everything we do.
          </li>
          <li>To strengthen healthcare systems through reliable and compliant products.</li>
          <li>To be recognized as a globally respected pharmaceutical organization.</li>
        </ul>
      </div>
      {/* Vision Section */}
      <div className="max-w-5xl mx-auto mt-12 bg-gradient-to-r from-white to-cyan-100 rounded-2xl shadow-md p-8 md:p-12 transition-all duration-700 ease-out animate-fadeInUp delay-200">
        <h2 className="text-2xl font-semibold text-cyan-700 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At <b>MediWorld</b>, our vision is to create a healthier, more
          connected world where quality healthcare is accessible to everyone —
          no matter where they live.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>To develop, manufacture, and supply safe, effective, and affordable medicines.</li>
          <li>To maintain stringent quality standards and regulatory compliance.</li>
          <li>To operate with integrity, transparency, and ethical governance.</li>
          <li>To build long-term partnerships with healthcare professionals and institutions.</li>
          <li>To drive sustainable growth through innovation and operational excellence.</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutSection;

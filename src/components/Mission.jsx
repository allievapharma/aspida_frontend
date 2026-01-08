import React from "react";

const Mission = () => {
  return (
    <div>
      {/* Vision Section */}
      <div className="myFadeup max-w-5xl mx-auto mt-12 bg-gradient-to-r from-cyan-100 to-white rounded-2xl shadow-md p-8 md:p-12 transition-all duration-700 ease-out animate-fadeInUp delay-200">
        <h2 className="text-2xl font-semibold text-cyan-700 mb-4">
          Our Vision
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At <b>MediWorld</b>, our vision is to create a healthier, more
          connected world where quality healthcare is accessible to everyone —
          no matter where they live.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            To advance global healthcare by delivering high-quality, affordable
            pharmaceutical solutions.
          </li>
          <li>
            To ensure equitable access to trusted medicines across diverse
            markets.
          </li>
          <li>
            To integrate science, quality, and responsibility in everything we
            do.
          </li>
          <li>
            To strengthen healthcare systems through reliable and compliant
            products.
          </li>
          <li>
            To be recognized as a globally respected pharmaceutical
            organization.
          </li>
        </ul>
      </div>
      {/* Vision Section */}
      <div className="myFadeup max-w-5xl mx-auto mt-12 bg-gradient-to-r from-white to-cyan-100 rounded-2xl shadow-md p-8 md:p-12 transition-all duration-700 ease-out animate-fadeInUp delay-200">
        <h2 className="text-2xl font-semibold text-cyan-700 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At <b>MediWorld</b>, our vision is to create a healthier, more
          connected world where quality healthcare is accessible to everyone —
          no matter where they live.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            To develop, manufacture, and supply safe, effective, and affordable
            medicines.
          </li>
          <li>
            To maintain stringent quality standards and regulatory compliance.
          </li>
          <li>
            To operate with integrity, transparency, and ethical governance.
          </li>
          <li>
            To build long-term partnerships with healthcare professionals and
            institutions.
          </li>
          <li>
            To drive sustainable growth through innovation and operational
            excellence.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Mission;

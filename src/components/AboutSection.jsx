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
          Your trusted partner in online healthcare — bringing authentic
          medicines and essential healthcare products to your doorstep across
          the world.
        </p>
      </div>

      {/* About Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-[rgba(0,0,0,0.05)_0px_6px_24px_0px,rgba(0,0,0,0.08)_0px_0px_0px_1px] rounded-2xl p-8 md:p-12 transition-all duration-700 ease-out animate-fadeInUp">
        <h2 className="text-2xl font-semibold text-cyan-700 mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Founded with a vision to bridge the gap between patients and trusted
          pharmacies, <b>MediWorld</b> ensures that every product meets
          international safety and quality standards. We are dedicated to making
          healthcare accessible, affordable, and convenient — because your
          health deserves the best.
        </p>
        <p className="text-gray-700 leading-relaxed">
          From genuine medicines to wellness products, we deliver with care,
          speed, and trust — across 100+ countries.
        </p>
      </div>

      {/* Vision Section */}
      <div className="max-w-5xl mx-auto mt-12 bg-gradient-to-r from-cyan-100 to-white rounded-2xl shadow-md p-8 md:p-12 transition-all duration-700 ease-out animate-fadeInUp delay-200">
        <h2 className="text-2xl font-semibold text-cyan-700 mb-4">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          At <b>MediWorld</b>, our vision is to create a healthier, more
          connected world where quality healthcare is accessible to everyone —
          no matter where they live.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Healthcare knows no borders.</li>
          <li>Every patient receives care on time.</li>
          <li>
            Technology makes treatment simpler, safer, and smarter for everyone.
          </li>
        </ul>
        <p className="text-gray-700 leading-relaxed mt-4">
          By continuously innovating and expanding our network, we strive to
          become the world’s most trusted digital healthcare partner.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center mt-20 text-sm text-gray-500 animate-fadeIn">
        © {new Date().getFullYear()} MediWorld. All rights reserved.
      </div>
    </div>
  );
}

export default AboutSection;

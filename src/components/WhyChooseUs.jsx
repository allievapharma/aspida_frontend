import { useState } from "react";

const whyChooseUsData = [
  {
    title: "Trusted Oncology Pharmaceutical Company",
    content:
      "Aspida Lifesciences Pvt Ltd is a specialized oncology pharmaceutical company committed to delivering high-quality cancer medicines with regulatory compliance.",
  },
  {
    title: "High-Quality & Certified Cancer Medicines",
    content:
      "Our oncology products are sourced and marketed under strict quality standards to ensure safety, efficacy, and reliability.",
  },
  {
    title: "Ethical Pharma Marketing",
    content:
      "We follow transparent, ethical, and science-driven pharmaceutical marketing practices, building trust with healthcare professionals.",
  },
  {
    title: "Online Availability of Cancer Medicines",
    content:
      "Through digital platforms, we support easy access and online availability of cancer medicines for faster reach.",
  },
  {
    title: "Reliable Supply Chain & Distribution",
    content:
      "Our strong distribution network ensures timely delivery and uninterrupted supply of oncology medicines.",
  },
  {
    title: "Patient-Centric Healthcare Approach",
    content:
      "We focus on improving access to affordable cancer medicines while supporting better treatment outcomes.",
  },
];

const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section className="myFadeup py-16 bg-white px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-indigo-900 mb-12">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Accordion */}
          <div className="space-y-4">
            {whyChooseUsData.map((item, index) => (
              <div
                key={index}
                className={`rounded-md overflow-hidden border border-[#1FA2DB] transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[#00A098] text-white"
                    : "bg-white-200 text-gray-800"
                }`}
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full text-left px-6 py-4 font-medium flex justify-between items-center"
                >
                  {item.title}
                  <span className="text-xl text-[#1FA2DB]">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>

                {activeIndex === index && (
                  <div className="px-6 pb-5 text-sm leading-relaxed bg-white text-gray-700">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="w-full">
            <div class="imageslider">
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

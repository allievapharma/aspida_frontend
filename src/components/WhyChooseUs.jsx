import {
  RocketLaunchIcon,
  LightBulbIcon,
  ChartBarIcon,
  HandRaisedIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Fast Performance",
    description:
      "Lightning-fast load times and smooth interactions on all devices.",
    icon: RocketLaunchIcon,
  },
  {
    title: "Smart Solutions",
    description:
      "Creative and practical solutions built for modern businesses.",
    icon: LightBulbIcon,
  },
  {
    title: "Results Driven",
    description:
      "We focus on measurable outcomes that help you grow.",
    icon: ChartBarIcon,
  },
  {
    title: "Trusted Support",
    description:
      "Reliable long-term support with clear communication.",
    icon: HandRaisedIcon,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Why Choose Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          We blend innovation, performance, and design to deliver exceptional digital experiences.
        </p>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Animated Icon */}
              <div className="flex justify-center mb-6">
                <item.icon className="h-14 w-14 text-indigo-600 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

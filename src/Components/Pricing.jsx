import { useState } from "react";

const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonStyle,
  isPopular,
  gradientColors,
  iconColor,
}) => (
  <div
    className={`relative w-full max-w-sm mx-auto ${
      isPopular ? "lg:scale-110 z-10" : ""
    }`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
        <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
          Most Popular
        </span>
      </div>
    )}

    <div
      className={`h-full bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-3xl p-8 shadow-2xl border transition-all duration-300 hover:scale-105 ${
        isPopular
          ? "border-cyan-500/50 shadow-cyan-500/20"
          : "border-zinc-700/50 hover:border-zinc-600/50"
      }`}
    >
      {/* Gradient spots for visual appeal */}
      <div className="absolute inset-0 bg-white/5 rounded-3xl"></div>
      <div
        className={`absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-br ${gradientColors}/15 rounded-full blur-2xl`}
      ></div>
      <div
        className={`absolute bottom-1/3 left-1/4 w-12 h-12 bg-gradient-to-tl ${gradientColors}/20 rounded-full blur-xl`}
      ></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        </div>

        {/* Price */}
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center">
            {price === "💝" ? (
              <span className="text-5xl font-black text-white">{price}</span>
            ) : (
              <span className="text-5xl font-black text-white">${price}</span>
            )}
            {period && <span className="text-gray-400 ml-2">/{period}</span>}
          </div>
          {price === "0" && (
            <p className="text-cyan-400 text-sm font-medium mt-2">
              Forever free
            </p>
          )}
          {price === "💝" && (
            <p className="text-purple-400 text-sm font-medium mt-2">
              Optional support
            </p>
          )}
        </div>

        {/* Features */}
        <div className="mb-8">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start space-x-3">
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${gradientColors} flex items-center justify-center mt-0.5`}
                >
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-gray-200 text-sm leading-relaxed">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${buttonStyle}`}
          onClick={() => {
            if (buttonText === "Contact on LinkedIn") {
              window.open(
                "https://www.linkedin.com/in/filip-elznic/",
                "_blank"
              );
            } else if (buttonText === "Get Started Free") {
              window.location.href = "/signup";
            } else if (buttonText === "Start Building") {
              window.location.href = "/signup";
            }
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  </div>
);

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const pricingPlans = [
    {
      title: "Everything You Need",
      price: "0",
      period: null,
      description:
        "Create and manage your CVs with full access — forever free.",
      features: [
        "All CV templates included",
        "Full customization options",
        "PDF download",
        "Shareable links",
        "Real-time preview",
        "Responsive on all devices",
      ],
      buttonText: "Get Started Free",
      buttonStyle:
        "bg-gradient-to-r from-gray-700 to-gray-600 text-white hover:from-gray-600 hover:to-gray-500 hover:shadow-gray-500/25",
      isPopular: false,
      gradientColors: "from-gray-500 to-gray-600",
      iconColor: "gray",
    },
    {
      title: "Full Feature Access",
      price: "0",
      period: null,
      description:
        "No subscriptions, no tiers — you get everything for free, always.",
      features: [
        "All CV templates included",
        "Full customization options",
        "PDF download",
        "Shareable links",
        "Real-time preview",
        "Responsive on all devices",
      ],
      buttonText: "Start Building",
      buttonStyle:
        "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700 hover:shadow-cyan-500/25",
      isPopular: true,
      gradientColors: "from-cyan-500 to-blue-600",
      iconColor: "cyan",
    },
    {
      title: "Support the Project",
      price: "💝",
      period: null,
      description:
        "This app is free and will stay free. If you love it, feel free to reach out or support.",
      features: [
        "All CV templates included",
        "Full customization options",
        "PDF download",
        "Shareable links",
        "Real-time preview",
        "Responsive on all devices",
      ],
      buttonText: "Contact on LinkedIn",
      buttonStyle:
        "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 hover:shadow-purple-500/25",
      isPopular: false,
      gradientColors: "from-purple-500 to-pink-600",
      iconColor: "purple",
      isSupport: true,
    },
  ];

  return (
    <div className="w-full py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Completely Free
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            All features are free forever. No hidden costs, no premium tiers, no
            subscriptions required.
          </p>
          {/* Remove Annual/Monthly Toggle since everything is free */}
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-4 items-center">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-4">
            Have questions about our pricing?
          </p>
          <a
            href="#faq"
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-cyan-400/50 hover:decoration-cyan-300 transition-colors"
          >
            Check our FAQ section
          </a>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;

const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonStyle,
  gradientColors,
}) => (
  <div className="relative w-full max-w-sm mx-auto">
    <div className="h-full bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-3xl p-8 shadow-2xl border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 hover:scale-105">
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
            } else if (buttonText === "Share on Social") {
              // Create a share message
              const shareText =
                "Check out this amazing free CV builder! Create professional CVs with multiple templates, all completely free. 🚀";
              const shareUrl = window.location.origin;

              // Try to use Web Share API if available, otherwise copy to clipboard
              if (navigator.share) {
                navigator.share({
                  title: "Free CV Builder",
                  text: shareText,
                  url: shareUrl,
                });
              } else {
                // Fallback: copy share text to clipboard
                const fullShareText = `${shareText} ${shareUrl}`;
                navigator.clipboard
                  .writeText(fullShareText)
                  .then(() => {
                    alert(
                      "Share text copied to clipboard! Paste it on your favorite social media platform."
                    );
                  })
                  .catch(() => {
                    // If clipboard fails, show the text
                    prompt("Copy this text to share:", fullShareText);
                  });
              }
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
  const pricingPlans = [
    {
      title: "Share the Love",
      price: "📢",
      period: null,
      description:
        "Help others discover this free CV builder by sharing it on social media!",
      features: [
        "Help grow the community",
        "Share with friends & colleagues",
        "Spread the word about free CVs",
        "Support open-source projects",
        "Make CV creation accessible",
        "Build a better job market",
      ],
      buttonText: "Share on Social",
      buttonStyle:
        "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:shadow-blue-500/25",
      gradientColors: "from-blue-500 to-indigo-600",
      iconColor: "blue",
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

import { useState } from "react";

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "Is the CV builder really free to use?",
      answer:
        "Yes! Our basic CV builder is completely free. You can create, edit, and download your CV without any charges. We also offer premium templates and advanced features for users who want additional customization options.",
    },
    {
      question: "How many CV templates are available?",
      answer:
        "We offer 5 designed templates ranging from modern and creative designs to traditional and corporate styles. All templates are ATS-friendly and optimized for different industries.",
    },
    {
      question: "Can I download my CV as a PDF?",
      answer:
        "Absolutely! You can download your completed CV as a high-quality PDF file. We also provide options to export in different formats and generate a shareable link that you can send directly to employers.",
    },

    {
      question: "Can I edit my CV after creating it?",
      answer:
        "Yes! You can edit, update, and modify your CV anytime. All your CVs are automatically saved to your account, making it easy to keep them current with your latest achievements and experiences.",
    },
    {
      question: "Can I create multiple CVs for different jobs?",
      answer:
        "Definitely! You can create multiple CVs tailored for different positions, industries, or career stages. This allows you to highlight relevant skills and experiences for each specific opportunity.",
    },
    {
      question: "How do I share my CV with employers?",
      answer:
        "You have several sharing options: download as PDF and attach to emails, generate a unique shareable link, or print directly from the platform. The shareable link is perfect for online applications and social media profiles.",
    },

    {
      question: "Can I use the CV builder on my mobile device?",
      answer:
        "Yes! Our CV builder is fully responsive and works seamlessly on desktop, tablet, and mobile devices. You can create and edit your CV from anywhere, at any time.",
    },
  ];

  return (
    <div className="w-full  py-16 sm:py-20" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked
            <span className="text-cyan-400 block">Questions</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about creating professional CVs with our
            platform
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-zinc-900/50 to-zinc-800/30 rounded-xl border border-zinc-700/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-cyan-500/30"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-xl transition-all duration-200"
              >
                <h3 className="text-base sm:text-lg font-semibold text-white pr-4 leading-relaxed">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 transition-transform duration-300 ${
                      openItems.has(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openItems.has(index)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 sm:px-8 pb-5 sm:pb-6">
                  <div className="pt-2 border-t border-zinc-700/30">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed mt-3">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-gradient-to-r from-zinc-900/80 to-zinc-800/60 rounded-2xl p-6 sm:p-8 border border-zinc-700/50 backdrop-blur-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-sm sm:text-base text-gray-300 mb-6">
              Our support team is here to help you create the perfect CV
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:elznicfilip@gmail.com"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-semibold hover:from-cyan-600 hover:to-blue-700 transition duration-200 shadow-lg hover:shadow-cyan-500/25 w-full sm:w-auto text-center"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

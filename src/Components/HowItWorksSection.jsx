import { Link } from "react-router-dom";
import StepCard from "./Stepcard";

const HowItWorksSection = () => {
  const steps = [
    {
      stepNumber: "01",
      icon: (
        <svg
          className="w-7 h-7 text-white opacity-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      title: "Create Account",
      description:
        "Sign up with secure authentication to protect your data and unlock all premium features for building professional CVs.",
      gradientSpots: (
        <>
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-gradient-to-br from-cyan-600/15 to-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-gradient-to-tl from-cyan-500/20 to-blue-400/15 rounded-full blur-2xl"></div>
        </>
      ),
      actionElement: (
        <Link
          to="/signup"
          className="bg-white text-black font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
        >
          Sign Up Free
        </Link>
      ),
    },
    {
      stepNumber: "02",
      icon: (
        <svg
          className="w-7 h-7 text-white opacity-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      title: "Build Your Profile",
      description:
        "Add your experience, skills, education, and achievements using our intuitive form builder with smart suggestions.",
      gradientSpots: (
        <>
          <div className="absolute top-1/3 right-1/4 w-14 h-14 bg-gradient-to-br from-emerald-600/15 to-teal-700/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-gradient-to-tl from-emerald-500/20 to-teal-600/15 rounded-full blur-2xl"></div>
        </>
      ),
      actionElement: (
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-emerald-400/60 rounded-full"></div>
          <div className="w-2 h-2 bg-emerald-400/30 rounded-full"></div>
        </div>
      ),
    },
    {
      stepNumber: "03",
      icon: (
        <svg
          className="w-7 h-7 text-white opacity-90"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      ),
      title: "Share & Export",
      description:
        "Generate shareable links, download high-quality PDFs, and send your professional CV to employers instantly.",
      gradientSpots: (
        <>
          <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-gradient-to-br from-purple-600/15 to-violet-700/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-tl from-purple-500/20 to-pink-600/15 rounded-full blur-2xl"></div>
        </>
      ),
      actionElement: (
        <div className="flex items-center space-x-3 text-sm text-white/80">
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            <span>PDF</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            <span>Link</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
            <span>Share</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full min-h-[70vh] flex flex-col">
      <div className="w-full max-w-4xl mx-auto text-center pt-20 px-4">
        <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
          How It Works
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-16 max-w-3xl mx-auto">
          Create professional CVs in three simple steps. Our streamlined process
          gets you from signup to sharing in minutes, not hours.
        </p>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 p-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;

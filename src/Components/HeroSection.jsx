import { Link } from "react-router-dom";

const HeroSection = ({ currentUser }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div className="text-center">
      <h1 className="text-5xl md:text-7xl font-extralight mb-6 text-gray-100 tracking-tight text-center">
        Build Your
        <span className="text-cyan-400 block">Professional CV</span>
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
      <p className="text-sm md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
        Create stunning, professional CVs with our easy-to-use builder. Choose
        from multiple templates and share your CV with a simple link.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {currentUser ? (
          <>
            <Link
              to="/create"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition duration-200 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              Start Building
            </Link>
            <Link
              to="/dashboard"
              className="bg-gray-800 text-cyan-400 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-cyan-500 hover:bg-gray-700 transition duration-200 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
            >
              View My CVs
            </Link>
          </>
        ) : (
          <Link
            to="/create"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition duration-200 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
          >
            Get Started Free
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default HeroSection;

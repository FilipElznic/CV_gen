import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

function Home() {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 mt-24">
              Build Your
              <span className="text-cyan-400 block">Own professional CV</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Create stunning, professional CVs with our easy-to-use builder.
              Choose from multiple templates and share your CV with a simple
              link.
            </p>
            <div className="space-x-4">
              {currentUser ? (
                <>
                  <Link
                    to="/create"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition duration-200 shadow-lg hover:shadow-cyan-500/25"
                  >
                    Start Building
                  </Link>
                  <Link
                    to="/dashboard"
                    className="bg-gray-800 text-cyan-400 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-cyan-500 hover:bg-gray-700 transition duration-200 shadow-lg hover:shadow-cyan-500/25"
                  >
                    View My CVs
                  </Link>
                </>
              ) : (
                <Link
                  to="/"
                  onClick={() => {
                    /* This will be handled by Navbar */
                  }}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition duration-200 shadow-lg hover:shadow-cyan-500/25"
                >
                  Get Started Free
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-500/30 group-hover:border-cyan-400 transition duration-300">
                <svg
                  className="w-8 h-8 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Easy Builder
              </h3>
              <p className="text-gray-400">
                Simple drag-and-drop interface to create your perfect CV
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30 group-hover:border-emerald-400 transition duration-300">
                <svg
                  className="w-8 h-8 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Share Easily
              </h3>
              <p className="text-gray-400">
                Get a shareable link for your CV that you can send to employers
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-500/30 group-hover:border-purple-400 transition duration-300">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Secure Storage
              </h3>
              <p className="text-gray-400">
                Your CVs are safely stored in the cloud and always accessible
              </p>
            </div>
          </div>
        </div>

        <div className="w-full min-h-screen flex flex-col">
          <div className="w-2/3 mx-auto text-start pt-20">
            <h2 className="text-6xl font-black mb-4 text-white  mt-20">
              How does it work?
            </h2>
            <p className="text-2xl text-gray-400 text-balance mb-10">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem
              quisquam voluptates delectus ea aliquam ut adipisci iure non,
              libero quibusdam recusandae inventore aspernatur corrupti labore
              deserunt doloribus tenetur cupiditate. Accusamus!
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 md:gap-8 p-4 md:p-8">
              <div className="w-full md:w-1/3 h-64 md:h-80 bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-white/5"></div>
                {/* Blue color spots */}
                <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-2xl"></div>

                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-700 rounded-full mb-4 shadow-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 md:w-7 md:h-7 text-white opacity-80"
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
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Create Account
                    </h3>
                    <p className="text-zinc-200 text-sm">
                      Secure authentication to protect your data and access all
                      features.
                    </p>
                  </div>
                  <div className="flex justify-center mt-4 md:mt-6">
                    <button className="bg-white text-black font-semibold px-4 md:px-6 py-2 rounded-full shadow hover:bg-zinc-200 transition text-sm md:text-base">
                      Sign Up
                    </button>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-8 left-6 w-1 h-1 bg-white rounded-full opacity-10"></div>
                <div className="absolute top-6 left-4 text-xs font-bold text-white/60">
                  01
                </div>
              </div>

              <div className="w-full md:w-1/3 h-64 md:h-80 bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-white/5"></div>
                {/* Dark blue color spots */}
                <div className="absolute top-1/3 right-1/4 w-14 h-14 bg-gradient-to-br from-blue-800/15 to-blue-900/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-1/4 left-1/3 w-10 h-10 bg-gradient-to-tl from-blue-700/20 to-blue-800/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-700 rounded-full mb-4 shadow-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 md:w-7 md:h-7 text-white opacity-80"
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
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Build Profile
                    </h3>
                    <p className="text-zinc-200 text-sm">
                      Add your experience, skills and achievements to create
                      your CV.
                    </p>
                  </div>
                  <div className="flex justify-center mt-4 md:mt-6">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-white/40 rounded-full"></div>
                      <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-8 left-6 w-1 h-1 bg-white rounded-full opacity-10"></div>
                <div className="absolute top-6 left-4 text-xs font-bold text-white/60">
                  02
                </div>
              </div>

              <div className="w-full md:w-1/3 h-64 md:h-80 bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl group hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-0 bg-white/5"></div>
                {/* Purple color spots */}
                <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-gradient-to-br from-purple-600/12 to-violet-700/8 rounded-full blur-xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-12 h-12 bg-gradient-to-tl from-purple-500/18 to-purple-800/10 rounded-full blur-2xl"></div>

                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-zinc-700 rounded-full mb-4 shadow-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 md:w-7 md:h-7 text-white opacity-80"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                      Share & Export
                    </h3>
                    <p className="text-zinc-200 text-sm">
                      Generate link, download PDF, and share with employers
                      instantly.
                    </p>
                  </div>
                  <div className="flex justify-center mt-4 md:mt-6">
                    <div className="flex items-center space-x-2 text-xs text-white/60">
                      <span className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                        <span>PDF</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                        <span>Link</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                        <span>Share</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute bottom-8 left-6 w-1 h-1 bg-white rounded-full opacity-10"></div>
                <div className="absolute top-6 left-4 text-xs font-bold text-white/60">
                  03
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

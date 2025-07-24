import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUserCVs, toggleCVVisibility } from "../services/cvService";
import Navbar from "../Components/Navbar";

function Dashboard() {
  const { currentUser } = useAuth();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingVisibility, setTogglingVisibility] = useState({});

  const handleToggleVisibility = async (cvId) => {
    setTogglingVisibility((prev) => ({ ...prev, [cvId]: true }));

    try {
      const newVisibility = await toggleCVVisibility(cvId);

      // Update the CV in the local state
      setCvs((prevCvs) =>
        prevCvs.map((cv) =>
          cv.id === cvId ? { ...cv, isPublic: newVisibility } : cv
        )
      );
    } catch (error) {
      console.error("Error toggling CV visibility:", error);
      // You could add a toast notification here
    } finally {
      setTogglingVisibility((prev) => ({ ...prev, [cvId]: false }));
    }
  };

  useEffect(() => {
    const fetchCVs = async () => {
      if (currentUser) {
        try {
          const userCVs = await getUserCVs(currentUser.uid);
          setCvs(userCVs);
        } catch (error) {
          console.error("Error fetching CVs:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCVs();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Please sign in to view your dashboard
          </h1>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
        {/* Hero Section */}
        <div className="relative overflow-hidden  px-4 py-16">
          {/* Background decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-cyan-600/10 to-blue-500/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-16 w-32 h-32 bg-gradient-to-tl from-purple-600/10 to-pink-500/5 rounded-full blur-2xl"></div>

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                Welcome back,{" "}
                {currentUser?.displayName ||
                  currentUser?.email?.split("@")[0] ||
                  "User"}
                ! 👋
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Your professional CV journey continues here. Create, manage, and
                share stunning resumes that land you your dream job.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-cyan-400">
                    {cvs.length}
                  </div>
                  <div className="text-gray-300">Total CVs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-emerald-400">
                    {cvs.filter((cv) => cv.isPublic).length}
                  </div>
                  <div className="text-gray-300">Public CVs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-purple-400">
                    {cvs.filter((cv) => !cv.isPublic).length}
                  </div>
                  <div className="text-gray-300">Private CVs</div>
                </div>
              </div>

              <Link
                to="/create"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition duration-200 transform hover:scale-105 shadow-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Create New CV
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-cyan-500 border-t-transparent mb-4"></div>
              <p className="text-gray-300 text-lg">Loading your CVs...</p>
            </div>
          ) : cvs.length === 0 ? (
            /* Empty State with Examples */
            <div className="text-center py-12">
              <div className="max-w-4xl mx-auto">
                {/* Empty state icon */}
                <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  No CVs Yet - Let&apos;s Get Started!
                </h3>
                <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
                  Create your first professional CV and join thousands of
                  successful job seekers. Here&apos;s what you can do:
                </p>

                {/* Feature showcase */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                      Easy Builder
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Use our intuitive form builder to create professional CVs
                      with guided sections for experience, skills, and
                      education.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 5v4a2 2 0 002 2h4"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                      6 Themes
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Choose from 6 professionally designed themes: Classic,
                      Modern, Professional, Creative, Minimal, and Vibrant.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition duration-300">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                    </div>
                    <h4 className="text-xl font-semibold text-white mb-3">
                      Share & Export
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Generate public links, download PDFs, and control privacy
                      settings to share your CV with potential employers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* CV Management Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Your CV Collection
                    </h2>
                    <p className="text-gray-300">
                      Manage, edit, and share your professional CVs
                    </p>
                  </div>
                  <Link
                    to="/create"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-xl hover:from-cyan-600 hover:to-blue-700 transition duration-200 transform hover:scale-105"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    New CV
                  </Link>
                </div>
              </div>

              {/* CV Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cvs.map((cv) => (
                  <div
                    key={cv.id}
                    className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                  >
                    {/* CV Header */}
                    <div className="p-6 border-b border-white/10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white truncate mb-2">
                            {cv.data.personalInfo?.fullName || "Untitled CV"}
                          </h3>
                          <div className="flex items-center space-x-3">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                cv.isPublic
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                  : "bg-gray-500/20 text-gray-300 border border-gray-500/30"
                              }`}
                            >
                              <div
                                className={`w-2 h-2 rounded-full mr-2 ${
                                  cv.isPublic ? "bg-emerald-400" : "bg-gray-400"
                                }`}
                              ></div>
                              {cv.isPublic ? "Public" : "Private"}
                            </span>
                            <span className="text-xs text-gray-400">
                              {new Date(
                                cv.createdAt.seconds * 1000
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* CV Theme indicator */}
                        <div className="ml-4">
                          <div className="w-12 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-cyan-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* CV Summary */}
                      {cv.data.personalInfo?.summary && (
                        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                          {cv.data.personalInfo.summary}
                        </p>
                      )}

                      {/* CV Stats */}
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        {cv.data.experience && (
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
                              />
                            </svg>
                            {cv.data.experience.length} jobs
                          </div>
                        )}
                        {cv.data.skills && (
                          <div className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              />
                            </svg>
                            {cv.data.skills.length} skills
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CV Actions */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <Link
                          to={`/create?edit=${cv.id}`}
                          className="flex items-center justify-center px-4 py-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/30 transition duration-200 text-sm font-medium"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </Link>

                        {cv.isPublic && (
                          <Link
                            to={`/cv/${cv.slug}`}
                            className="flex items-center justify-center px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition duration-200 text-sm font-medium"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View
                          </Link>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleToggleVisibility(cv.id)}
                          disabled={togglingVisibility[cv.id]}
                          className={`flex items-center justify-center px-4 py-2 rounded-lg transition duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed ${
                            cv.isPublic
                              ? "bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30"
                          }`}
                        >
                          {togglingVisibility[cv.id] ? (
                            <svg
                              className="w-4 h-4 mr-2 animate-spin"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            <>
                              {cv.isPublic ? (
                                <>
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L12 12m-3.122-3.122l4.242 4.242"
                                    />
                                  </svg>
                                  Private
                                </>
                              ) : (
                                <>
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                  </svg>
                                  Public
                                </>
                              )}
                            </>
                          )}
                        </button>

                        <button className="flex items-center justify-center px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition duration-200 text-sm font-medium">
                          <svg
                            className="w-4 h-4 mr-2"
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
                          Share
                        </button>
                      </div>

                      {/* Public URL Display */}
                      {cv.isPublic && (
                        <div className="mt-4 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                          <p className="text-xs text-gray-400 mb-1">
                            Public URL:
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-cyan-400 truncate mr-2">
                              {window.location.origin}/cv/{cv.slug}
                            </p>
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  `${window.location.origin}/cv/${cv.slug}`
                                )
                              }
                              className="p-1 hover:bg-white/10 rounded transition duration-200"
                            >
                              <svg
                                className="w-4 h-4 text-gray-400 hover:text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Help Section */}
          {cvs.length > 0 && (
            <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Need Help? 🚀
                </h3>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Here are some tips to make the most of your CV builder
                  experience
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Edit Anytime
                  </h4>
                  <p className="text-sm text-gray-300">
                    Click Edit to modify your CV content and switch between
                    themes
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Public/Private
                  </h4>
                  <p className="text-sm text-gray-300">
                    Toggle visibility to control who can see your CV online
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Share Instantly
                  </h4>
                  <p className="text-sm text-gray-300">
                    Get shareable links and download PDFs for job applications
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 5v4a2 2 0 002 2h4"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-white mb-2">
                    Multiple Themes
                  </h4>
                  <p className="text-sm text-gray-300">
                    Choose from 6 professional themes to match your style
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;

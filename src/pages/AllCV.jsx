import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { getAllPublicCVs, getPublicCVUrl } from "../services/cvService";
import { useAuth } from "../contexts/AuthContext";

function AllCV() {
  const { currentUser } = useAuth();
  const [publicCVs, setPublicCVs] = useState([]);
  const [filteredCVs, setFilteredCVs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    skills: "",
    location: "",
    hasExperience: false,
    hasEducation: false,
    hasProjects: false,
    sortBy: "newest", // newest, oldest, name
  });
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    const fetchPublicCVs = async () => {
      try {
        setLoading(true);
        const cvs = await getAllPublicCVs();
        setPublicCVs(cvs);
        setFilteredCVs(cvs);
      } catch (err) {
        console.error("Error fetching public CVs:", err);
        setError("Failed to load public CVs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicCVs();
  }, []);

  // Filter and sort CVs
  useEffect(() => {
    let filtered = [...publicCVs];

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(
        (cv) =>
          cv.data?.personalInfo?.fullName
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          cv.data?.personalInfo?.title
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          cv.data?.personalInfo?.summary
            ?.toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    // Skills filter
    if (filters.skills) {
      filtered = filtered.filter((cv) =>
        cv.data?.skills?.some((skill) =>
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        )
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter((cv) =>
        cv.data?.personalInfo?.location
          ?.toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    // Experience filter
    if (filters.hasExperience) {
      filtered = filtered.filter((cv) =>
        cv.data?.experience?.some((exp) => exp.company)
      );
    }

    // Education filter
    if (filters.hasEducation) {
      filtered = filtered.filter((cv) =>
        cv.data?.education?.some((edu) => edu.degree)
      );
    }

    // Projects filter
    if (filters.hasProjects) {
      filtered = filtered.filter((cv) =>
        cv.data?.projects?.some((proj) => proj.name)
      );
    }

    // Sort CVs
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "oldest":
          return (
            (a.updatedAt?.toDate?.() || new Date(a.updatedAt)) -
            (b.updatedAt?.toDate?.() || new Date(b.updatedAt))
          );
        case "name":
          return (a.data?.personalInfo?.fullName || "").localeCompare(
            b.data?.personalInfo?.fullName || ""
          );
        case "newest":
        default:
          return (
            (b.updatedAt?.toDate?.() || new Date(b.updatedAt)) -
            (a.updatedAt?.toDate?.() || new Date(a.updatedAt))
          );
      }
    });

    setFilteredCVs(filtered);
  }, [publicCVs, filters]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const openCV = (slug) => {
    const url = getPublicCVUrl(slug);
    window.open(url, "_blank");
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-8xl font-extrabold tracking-wider my-8 text-center text-gray-100 border-b-2 border-gray-700 pb-4 ">
            All Public CVs
          </h1>

          <p className="text-gray-400 text-center mb-8 w-1/2 mx-auto text-xl">
            On this page, you can view all public CVs created by users. Click on
            a CV to view it in detail. You can take inspiration from these CVs
            to create your own CV. If you want to create a CV.
          </p>

          {/* Filter Controls */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-300 font-medium">
                  Showing {filteredCVs.length} of {publicCVs.length} CVs
                </span>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                    />
                  </svg>
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <label className="text-gray-300 text-sm">Sort by:</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters({ ...filters, sortBy: e.target.value })
                  }
                  className="bg-zinc-700 text-white px-3 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="bg-zinc-800/50 rounded-xl p-6 backdrop-blur-sm border border-zinc-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {/* Search Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Search
                    </label>
                    <input
                      type="text"
                      placeholder="Name, title, or summary..."
                      value={filters.search}
                      onChange={(e) =>
                        setFilters({ ...filters, search: e.target.value })
                      }
                      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                  </div>

                  {/* Skills Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Skills
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., React, Python..."
                      value={filters.skills}
                      onChange={(e) =>
                        setFilters({ ...filters, skills: e.target.value })
                      }
                      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                  </div>

                  {/* Location Filter */}
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="City, Country..."
                      value={filters.location}
                      onChange={(e) =>
                        setFilters({ ...filters, location: e.target.value })
                      }
                      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Checkbox Filters */}
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasExperience}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          hasExperience: e.target.checked,
                        })
                      }
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Has Work Experience
                  </label>
                  <label className="flex items-center text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasEducation}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          hasEducation: e.target.checked,
                        })
                      }
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Has Education
                  </label>
                  <label className="flex items-center text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.hasProjects}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          hasProjects: e.target.checked,
                        })
                      }
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Has Projects
                  </label>
                </div>

                {/* Clear Filters Button */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() =>
                      setFilters({
                        search: "",
                        skills: "",
                        location: "",
                        hasExperience: false,
                        hasEducation: false,
                        hasProjects: false,
                        sortBy: "newest",
                      })
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Filter Pills */}
          {!loading && !error && publicCVs.length > 0 && (
            <div className="mb-6">
              <h3 className="text-gray-300 text-sm font-medium mb-3">
                Quick Filters:
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "JavaScript",
                  "Python",
                  "Node.js",
                  "TypeScript",
                  "Java",
                  "CSS",
                ].map((skill) => (
                  <button
                    key={skill}
                    onClick={() => setFilters({ ...filters, skills: skill })}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                      filters.skills.toLowerCase() === skill.toLowerCase()
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-700 text-gray-300 hover:bg-zinc-600"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
                <button
                  onClick={() => setFilters({ ...filters, skills: "" })}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                >
                  Clear Skills
                </button>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
              {error}
            </div>
          )}

          {!loading && !error && publicCVs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No public CVs available at the moment.
              </div>
            </div>
          )}

          {!loading &&
            !error &&
            filteredCVs.length === 0 &&
            publicCVs.length > 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  No CVs match your current filters. Try adjusting your search
                  criteria.
                </div>
              </div>
            )}

          {!loading && !error && filteredCVs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredCVs.map((cv) => {
                const isOwner = currentUser && cv.userId === currentUser.uid;
                return (
                  <div
                    key={cv.id}
                    className={`bg-gradient-to-b from-zinc-700 to-zinc-500 rounded-2xl shadow-xl transition-all duration-300 p-6 min-h-[450px] cursor-pointer hover:shadow-2xl hover:scale-105 transform flex flex-col ${
                      isOwner
                        ? "border-4 border-black ring-2 shadow-xl "
                        : "border border-gray-200 hover:border-zinc-400"
                    }`}
                    onClick={() => openCV(cv.slug)}
                  >
                    {/* Header Section */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">
                          {cv.data?.personalInfo?.fullName || "Untitled CV"}
                        </h3>
                        {isOwner && (
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                            Your CV
                          </span>
                        )}
                      </div>
                      {cv.data?.personalInfo?.title && (
                        <p className="text-zinc-300 mb-2 text-sm font-medium">
                          {cv.data.personalInfo.title}
                        </p>
                      )}
                      {cv.data?.personalInfo?.location && (
                        <p className="text-sm text-zinc-400 mb-2">
                          📍 {cv.data.personalInfo.location}
                        </p>
                      )}
                    </div>

                    {/* Summary/About Section */}
                    {cv.data?.personalInfo?.summary && (
                      <div className="mb-4">
                        <p className="text-zinc-300 text-sm line-clamp-2">
                          {cv.data.personalInfo.summary.length > 100
                            ? `${cv.data.personalInfo.summary.substring(
                                0,
                                100
                              )}...`
                            : cv.data.personalInfo.summary}
                        </p>
                      </div>
                    )}

                    {/* Latest Experience/Education */}
                    {(cv.data?.experience?.[0]?.company ||
                      cv.data?.education?.[0]?.institution) && (
                      <div className="mb-4 p-3 bg-zinc-800/30 rounded-lg">
                        {cv.data.experience?.[0]?.company && (
                          <div className="text-xs">
                            <span className="text-zinc-400">Latest Role:</span>
                            <div className="text-zinc-200 font-medium">
                              {cv.data.experience[0].title || "Position"} at{" "}
                              {cv.data.experience[0].company}
                            </div>
                          </div>
                        )}
                        {cv.data.education?.[0]?.institution &&
                          !cv.data.experience?.[0]?.company && (
                            <div className="text-xs">
                              <span className="text-zinc-400">Education:</span>
                              <div className="text-zinc-200 font-medium">
                                {cv.data.education[0].degree || "Degree"} from{" "}
                                {cv.data.education[0].institution}
                              </div>
                            </div>
                          )}
                      </div>
                    )}

                    {/* Skills Section */}
                    {cv.data?.skills && cv.data.skills.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-zinc-300 mb-2">
                          Skills
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {cv.data.skills.slice(0, 4).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {cv.data.skills.length > 4 && (
                            <span className="text-zinc-400 text-xs px-2 py-1">
                              +{cv.data.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CV Stats Section */}
                    <div className="mb-4">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {cv.data?.experience && (
                          <div className="bg-zinc-800/50 rounded p-2">
                            <span className="text-zinc-400">Experience:</span>
                            <div className="text-white font-semibold">
                              {
                                cv.data.experience.filter((exp) => exp.company)
                                  .length
                              }{" "}
                              positions
                            </div>
                          </div>
                        )}
                        {cv.data?.education && (
                          <div className="bg-zinc-800/50 rounded p-2">
                            <span className="text-zinc-400">Education:</span>
                            <div className="text-white font-semibold">
                              {
                                cv.data.education.filter((edu) => edu.degree)
                                  .length
                              }{" "}
                              degrees
                            </div>
                          </div>
                        )}
                        {cv.data?.projects && (
                          <div className="bg-zinc-800/50 rounded p-2">
                            <span className="text-zinc-400">Projects:</span>
                            <div className="text-white font-semibold">
                              {
                                cv.data.projects.filter((proj) => proj.name)
                                  .length
                              }{" "}
                              projects
                            </div>
                          </div>
                        )}
                        {cv.data?.languages && (
                          <div className="bg-zinc-800/50 rounded p-2">
                            <span className="text-zinc-400">Languages:</span>
                            <div className="text-white font-semibold">
                              {
                                cv.data.languages.filter(
                                  (lang) => lang.language
                                ).length
                              }{" "}
                              languages
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    {(cv.data?.personalInfo?.email ||
                      cv.data?.personalInfo?.website) && (
                      <div className="mb-4 text-xs">
                        <div className="flex flex-wrap gap-2">
                          {cv.data.personalInfo.email && (
                            <span className="text-zinc-400">
                              ✉️ {cv.data.personalInfo.email}
                            </span>
                          )}
                          {cv.data.personalInfo.website && (
                            <span className="text-zinc-400">🌐 Website</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Footer Section */}
                    <div className="border-t border-zinc-600 pt-3 mt-auto">
                      <div className="flex justify-between items-center text-xs text-zinc-400 mb-3">
                        <span>Updated: {formatDate(cv.updatedAt)}</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Public
                        </span>
                      </div>

                      <button
                        className={`w-full py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isOwner
                            ? "bg-zinc-600 hover:bg-zinc-700 text-white"
                            : "bg-black/70 hover:bg-black text-white"
                        }`}
                      >
                        View CV
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllCV;

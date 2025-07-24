import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { getAllPublicCVs, getPublicCVUrl } from "../services/cvService";
import { useAuth } from "../contexts/AuthContext";

function AllCV() {
  const { currentUser } = useAuth();
  const [publicCVs, setPublicCVs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    yourCVs: 0,
    industries: new Set(),
    locations: new Set(),
    recentlyUpdated: 0,
  });

  useEffect(() => {
    const fetchPublicCVs = async () => {
      try {
        setLoading(true);
        const cvs = await getAllPublicCVs();
        setPublicCVs(cvs);

        // Calculate statistics
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        const industries = new Set();
        const locations = new Set();
        let yourCVs = 0;
        let recentlyUpdated = 0;

        cvs.forEach((cv) => {
          if (currentUser && cv.userId === currentUser.uid) yourCVs++;

          if (cv.data?.personalInfo?.title) {
            // Extract industry from job title (simplified)
            const title = cv.data.personalInfo.title.toLowerCase();
            if (title.includes("developer") || title.includes("engineer"))
              industries.add("Technology");
            else if (title.includes("designer")) industries.add("Design");
            else if (title.includes("manager")) industries.add("Management");
            else if (title.includes("analyst")) industries.add("Analytics");
            else if (title.includes("marketing")) industries.add("Marketing");
            else industries.add("Other");
          }

          if (cv.data?.personalInfo?.location) {
            locations.add(cv.data.personalInfo.location);
          }

          if (cv.updatedAt) {
            const updateDate = cv.updatedAt.toDate
              ? cv.updatedAt.toDate()
              : new Date(cv.updatedAt);
            if (updateDate > oneWeekAgo) recentlyUpdated++;
          }
        });

        setStats({
          total: cvs.length,
          yourCVs,
          industries,
          locations,
          recentlyUpdated,
        });
      } catch (err) {
        console.error("Error fetching public CVs:", err);
        setError("Failed to load public CVs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicCVs();
  }, [currentUser]);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
        {/* Futuristic background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <h1 className="text-6xl font-thin tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mb-4">
                CV NEXUS
              </h1>
              <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent w-full" />
            </div>
            <p className="text-slate-400 text-lg mt-6 max-w-2xl mx-auto font-light">
              Explore the global talent network. Discover innovative
              professionals and their career journeys.
            </p>
          </div>

          {/* Statistics Dashboard */}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-blue-400/50 transition-all duration-300">
                <div className="text-3xl font-thin text-blue-400 mb-2">
                  {stats.total}
                </div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">
                  Total CVs
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-purple-400/50 transition-all duration-300">
                <div className="text-3xl font-thin text-purple-400 mb-2">
                  {stats.industries.size}
                </div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">
                  Industries
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="text-3xl font-thin text-cyan-400 mb-2">
                  {stats.locations.size}
                </div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">
                  Locations
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-emerald-400/50 transition-all duration-300">
                <div className="text-3xl font-thin text-emerald-400 mb-2">
                  {stats.recentlyUpdated}
                </div>
                <div className="text-slate-400 text-sm uppercase tracking-wider">
                  Recent Updates
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-slate-700 rounded-full animate-spin border-t-blue-400"></div>
                <div className="absolute inset-0 w-16 h-16 border-2 border-slate-800 rounded-full animate-pulse"></div>
              </div>
              <p className="text-slate-400 mt-4 font-light">
                Syncing CV data...
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-6 text-center backdrop-blur-sm">
              <div className="text-red-400 mb-2">⚠ System Error</div>
              <div className="text-slate-300">{error}</div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && publicCVs.length === 0 && (
            <div className="text-center py-24">
              <div className="text-6xl mb-4 opacity-20">📋</div>
              <div className="text-slate-400 text-lg font-light">
                No CVs in the network yet.
              </div>
              <div className="text-slate-500 text-sm mt-2">
                Be the first to share your professional story.
              </div>
            </div>
          )}

          {/* CV Grid */}
          {!loading && !error && publicCVs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publicCVs.map((cv) => {
                const isOwner = currentUser && cv.userId === currentUser.uid;
                return (
                  <div
                    key={cv.id}
                    className={`group relative bg-slate-900/30 backdrop-blur-sm rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-slate-800/40 ${
                      isOwner
                        ? "border-2 border-amber-400/60 shadow-amber-400/20 shadow-xl"
                        : "border border-slate-700/50 hover:border-slate-600/50"
                    }`}
                    onClick={() => openCV(cv.slug)}
                  >
                    {/* Glow effect for owned CVs */}
                    {isOwner && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 rounded-2xl blur-xl" />
                    )}

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-light text-slate-100 mb-1 group-hover:text-blue-400 transition-colors duration-300">
                            {cv.data?.personalInfo?.fullName || "Anonymous"}
                          </h3>
                          {cv.data?.personalInfo?.title && (
                            <p className="text-slate-400 text-sm font-light">
                              {cv.data.personalInfo.title}
                            </p>
                          )}
                        </div>

                        {isOwner && (
                          <div className="bg-amber-400/20 text-amber-400 px-3 py-1 rounded-full text-xs font-light border border-amber-400/30">
                            YOURS
                          </div>
                        )}
                      </div>

                      {/* Location */}
                      {cv.data?.personalInfo?.location && (
                        <div className="flex items-center text-slate-500 text-sm mb-4">
                          <div className="w-1 h-1 bg-slate-500 rounded-full mr-2"></div>
                          {cv.data.personalInfo.location}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <span className="text-slate-500 text-xs font-light">
                          {formatDate(cv.updatedAt)}
                        </span>

                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                          <span className="text-emerald-400 text-xs font-light uppercase tracking-wider">
                            Live
                          </span>
                        </div>
                      </div>

                      {/* Hover effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-500" />
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

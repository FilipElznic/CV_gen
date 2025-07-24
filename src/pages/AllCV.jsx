import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { getAllPublicCVs, getPublicCVUrl } from "../services/cvService";
import { useAuth } from "../contexts/AuthContext";

function AllCV() {
  const { currentUser } = useAuth();
  const [publicCVs, setPublicCVs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicCVs = async () => {
      try {
        setLoading(true);
        const cvs = await getAllPublicCVs();
        setPublicCVs(cvs);
      } catch (err) {
        console.error("Error fetching public CVs:", err);
        setError("Failed to load public CVs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPublicCVs();
  }, []);

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
          <h1 className="text-4xl font-extrabold tracking-wider my-8 text-center text-gray-100 border-b-2 border-gray-700 pb-4 ">
            All Public CVs
          </h1>

          <p className="text-gray-300 text-center mb-8 w-1/2 mx-auto">
            On this page, you can view all public CVs created by users. Click on
            a CV to view it in detail. You can take inspiration from these CVs
            to create your own CV. If you want to create a CV.
          </p>

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

          {!loading && !error && publicCVs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicCVs.map((cv) => {
                const isOwner = currentUser && cv.userId === currentUser.uid;
                return (
                  <div
                    key={cv.id}
                    className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer ${
                      isOwner
                        ? "border-4 border-amber-400 ring-2 ring-amber-200"
                        : "border border-gray-200"
                    }`}
                    onClick={() => openCV(cv.slug)}
                  >
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {cv.data?.personalInfo?.fullName || "Untitled CV"}
                        </h3>
                        {isOwner && (
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                            Your CV
                          </span>
                        )}
                      </div>
                      {cv.data?.personalInfo?.title && (
                        <p className="text-gray-600 mb-2">
                          {cv.data.personalInfo.title}
                        </p>
                      )}
                      {cv.data?.personalInfo?.location && (
                        <p className="text-sm text-gray-500 mb-2">
                          📍 {cv.data.personalInfo.location}
                        </p>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>Updated: {formatDate(cv.updatedAt)}</span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          Public
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <button
                        className={`w-full py-2 px-4 rounded-md transition-colors duration-200 ${
                          isOwner
                            ? "bg-amber-600 hover:bg-amber-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
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

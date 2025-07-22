import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUserCVs } from "../services/cvService";

function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-gray-900">
              CV Builder
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {currentUser.email}
              </span>
              <Link
                to="/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Create New CV
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My CVs</h1>
          <p className="text-gray-600 mt-2">
            Manage and share your professional CVs
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : cvs.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No CVs</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first CV.
            </p>
            <div className="mt-6">
              <Link
                to="/create"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Create New CV
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {cv.data.personalInfo?.fullName || "Untitled CV"}
                    </h3>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        cv.isPublic
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {cv.isPublic ? "Public" : "Private"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    Created:{" "}
                    {new Date(cv.createdAt.seconds * 1000).toLocaleDateString()}
                  </p>

                  {cv.data.personalInfo?.summary && (
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                      {cv.data.personalInfo.summary}
                    </p>
                  )}

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700">
                      Edit
                    </button>
                    {cv.isPublic && (
                      <Link
                        to={`/cv/${cv.slug}`}
                        className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md text-sm hover:bg-gray-700 text-center"
                      >
                        View
                      </Link>
                    )}
                    <button className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                      Share
                    </button>
                  </div>

                  {cv.isPublic && (
                    <div className="mt-3 p-2 bg-gray-50 rounded-md">
                      <p className="text-xs text-gray-600">Public URL:</p>
                      <p className="text-xs text-blue-600 break-all">
                        {window.location.origin}/cv/{cv.slug}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

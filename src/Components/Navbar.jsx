import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { PiReadCvLogoBold } from "react-icons/pi";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-black via-zinc-900 to-zinc-800 shadow-sm sticky top-0 z-40">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <PiReadCvLogoBold className="h-8 mr-2 text-white" />
                <h1 className="text-xl font-bold text-white">CV Builder</h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 ">
              {currentUser ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/cv"
                    className="text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    Public CVs
                  </Link>
                  <Link
                    to="/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Create CV
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-red-600 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/cv"
                    className="text-white hover:text-gray-300 transition-colors duration-200"
                  >
                    Public CVs
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-colors duration-200"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-transparent border-t border-gray-200">
                {currentUser ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 text-gray-200 hover:text-gray-400  rounded-md transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/cv"
                      className="text-white hover:text-gray-300 transition-colors duration-200"
                    >
                      Public CVs
                    </Link>
                    <Link
                      to="/create"
                      className="block px-3 py-2 text-gray-200 hover:text-gray-400  rounded-md transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create CV
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/cv"
                      className="text-white hover:text-gray-300 transition-colors duration-200"
                    >
                      Public CVs
                    </Link>
                    <Link
                      to="/signin"
                      className="block w-full text-left px-3 py-2 text-gray-200 hover:text-gray-400 rounded-md transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      className="block w-full text-left px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

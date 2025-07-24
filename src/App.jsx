import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { PublicRoute, PrivateRoute } from "./Components/ProtectedRoute";

// Lazy load components for better performance
const Home = lazy(() => import("./pages/Home"));
const Create = lazy(() => import("./pages/Create"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PublicCV = lazy(() => import("./pages/PublicCV"));
const Footer = lazy(() => import("./Components/Footer"));
const SignIn = lazy(() => import("./Components/SignIn"));
const SignUp = lazy(() => import("./Components/SignUp"));
const PrivacyPolicy = lazy(() => import("./Components/Privacypol"));
const AllCV = lazy(() => import("./pages/AllCV"));
const HowToWrite = lazy(() => import("./pages/HowToWrite"));
const Docs = lazy(() => import("./pages/Docs"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-blue-400 font-medium animate-pulse">Loading...</p>
    </div>
  </div>
);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100); // Small delay to ensure smooth animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div
          className={`min-h-screen flex flex-col transition-all duration-1000 ease-out transform ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Home / Landing page */}
                <Route path="/" element={<Home />} />

                {/* Authentication pages - redirect to dashboard if logged in */}
                <Route
                  path="/signin"
                  element={
                    <PublicRoute>
                      <SignIn />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <PublicRoute>
                      <SignUp />
                    </PublicRoute>
                  }
                />

                {/* Protected pages - require authentication */}
                <Route
                  path="/create"
                  element={
                    <PrivateRoute>
                      <Create />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />

                {/* Public CV view - no authentication required */}
                <Route path="/howtowrite" element={<HowToWrite />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/how-to-write" element={<HowToWrite />} />
                <Route path="/cv/:slug" element={<PublicCV />} />
                <Route path="/cv" element={<AllCV />} />
              </Routes>
            </Suspense>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <Footer />
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { PublicRoute, PrivateRoute } from "./Components/ProtectedRoute";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import PublicCV from "./pages/PublicCV";
import Footer from "./Components/Footer";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import PrivacyPolicy from "./Components/Privacypol";
import AllCV from "./pages/AllCV";
import HowToWrite from "./pages/HowToWrite";
import Docs from "./pages/Docs";

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
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

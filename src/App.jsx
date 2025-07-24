import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
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
              <Route path="/privacy" element={<PrivacyPolicy />} />
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

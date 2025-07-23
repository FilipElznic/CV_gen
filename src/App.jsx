import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import PublicCV from "./pages/PublicCV";
import Footer from "./Components/Footer";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              {/* Home / Landing page */}
              <Route path="/" element={<Home />} />

              {/* CV Builder */}
              <Route path="/create" element={<Create />} />

              {/* User's saved CVs */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Public CV view */}
              <Route path="/cv/:slug" element={<PublicCV />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

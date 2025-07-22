import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import PublicCV from "./pages/PublicCV";

function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
}

export default App;

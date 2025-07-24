import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Protected route for authenticated users (redirects to dashboard if logged in)
function PublicRoute({ children }) {
  const { currentUser } = useAuth();

  // If user is authenticated, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is not authenticated, show the page
  return children;
}

// Protected route for unauthenticated users (redirects to sign in if not logged in)
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  // If user is not authenticated, redirect to sign in
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  // If user is authenticated, show the page
  return children;
}

export { PublicRoute, PrivateRoute };

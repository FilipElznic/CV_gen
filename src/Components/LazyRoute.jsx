import { Suspense } from "react";

// Enhanced loading component with better UX
const RouteLoadingSpinner = ({ message = "Loading page..." }) => (
  <div className="flex items-center justify-center min-h-[60vh] bg-transparent">
    <div className="flex flex-col items-center gap-4">
      {/* Futuristic loader matching your design */}
      <div className="relative">
        <div className="w-16 h-16 border-3 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-1 left-1 w-14 h-14 border-2 border-blue-400/20 border-t-blue-400 rounded-full animate-spin animation-delay-200"></div>
        <div className="absolute top-3 left-3 w-10 h-10 border-2 border-blue-300/20 border-t-blue-300 rounded-full animate-spin animation-delay-400"></div>
      </div>
      <p className="text-blue-400 font-medium animate-pulse text-sm tracking-wide">
        {message}
      </p>
    </div>
  </div>
);

// Route wrapper with enhanced Suspense
const LazyRoute = ({ children, fallbackMessage }) => (
  <Suspense fallback={<RouteLoadingSpinner message={fallbackMessage} />}>
    {children}
  </Suspense>
);

export default LazyRoute;
export { RouteLoadingSpinner };

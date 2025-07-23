import { useState } from "react";
import PropTypes from "prop-types";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function AuthModal({ isOpen, onClose, mode = "signin" }) {
  const [currentMode, setCurrentMode] = useState(mode);

  const switchToSignUp = () => setCurrentMode("signup");
  const switchToSignIn = () => setCurrentMode("signin");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <div></div> {/* Empty div for spacing */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {currentMode === "signin" ? (
          <SignIn onClose={onClose} onSwitchToSignUp={switchToSignUp} />
        ) : (
          <SignUp onClose={onClose} onSwitchToSignIn={switchToSignIn} />
        )}
      </div>
    </div>
  );
}

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["signin", "signup"]),
};

export default AuthModal;

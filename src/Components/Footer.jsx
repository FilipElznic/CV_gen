import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-700 bg-gradient-to-br from-black via-zinc-900 to-zinc-800 px-4 py-6 w-full mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              CV Generator
            </h3>
            <p className="text-gray-400 max-w-xs">
              This project is created via project shipwrecked by Filip Elznic.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-cyan-400 transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="text-gray-400 hover:text-cyan-400 transition duration-200"
                >
                  Create CV
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-cyan-400 transition duration-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-cyan-400 transition duration-200 flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C14.8,12.4 14.4,13.2 13.7,13.7C14.2,14.1 14.5,14.9 14.5,15.5V16.5C14.5,17.6 13.6,18.5 12.5,18.5H11.5C10.4,18.5 9.5,17.6 9.5,16.5V15.5C9.5,14.9 9.8,14.1 10.3,13.7C9.6,13.2 9.2,12.4 9.2,11.5V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.9 10.5,9.7V11.5C10.5,12.3 11.2,13 12,13C12.8,13 13.5,12.3 13.5,11.5V9.7C13.5,8.9 12.8,8.2 12,8.2Z" />
                  </svg>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/FilipElznic"
                aria-label="GitHub"
                className="text-white hover:text-gray-900"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/filip-elznic/"
                aria-label="LinkedIn"
                className="text-white hover:text-gray-900"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="elznicfilip@gmail.com"
                aria-label="Email"
                className="text-white hover:text-gray-900"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-white text-sm">
          <div className="mb-2">
            © {currentYear} CV Generator. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

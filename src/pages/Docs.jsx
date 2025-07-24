import Navbar from "../Components/Navbar";

function Docs() {
  return (
    <>
      <style>{`
        .docs-container {
          scroll-behavior: smooth;
        }
        
        .sidebar {
          position: sticky;
          top: 2rem;
          height: fit-content;
        }
        
        .content-section {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .content-section:nth-child(2) { animation-delay: 0.1s; }
        .content-section:nth-child(3) { animation-delay: 0.2s; }
        .content-section:nth-child(4) { animation-delay: 0.3s; }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .nav-link {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background: linear-gradient(180deg, #3b82f6, #8b5cf6);
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }
        
        .nav-link:hover::before {
          transform: scaleY(1);
        }
        
        .tech-card {
          transition: all 0.3s ease;
          background: linear-gradient(145deg, rgba(39, 39, 42, 0.5), rgba(24, 24, 27, 0.3));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(63, 63, 70, 0.3);
        }
        
        .tech-card:hover {
          transform: translateY(-2px);
          border-color: rgba(156, 163, 175, 0.5);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-gray-100 docs-container">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extralight mb-6 text-gray-100 tracking-tight">
              Documentation
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Comprehensive guide to the CV Generator platform. Everything you
              need to know about features, implementation, and best practices.
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sidebar bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50">
                <h3 className="text-lg font-semibold mb-6 text-gray-200">
                  Navigation
                </h3>
                <nav className="space-y-2">
                  <a
                    href="#overview"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Overview
                  </a>
                  <a
                    href="#features"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Features
                  </a>
                  <a
                    href="#technologies"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    Technologies
                  </a>
                  <a
                    href="#getting-started"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Getting Started
                  </a>
                  <a
                    href="#user-guide"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                    User Guide
                  </a>
                  <a
                    href="#architecture"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                    Architecture
                  </a>
                  <a
                    href="#api"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    API Reference
                  </a>
                  <a
                    href="#troubleshooting"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Troubleshooting
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-16">
              {/* Overview Section */}
              <section id="overview" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  Application Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      The CV Generator is a modern, full-stack web application
                      designed to help users create, customize, and share
                      professional resumes. Built with React and Firebase, it
                      offers a seamless experience for crafting
                      interview-winning CVs.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-200">
                            Intuitive Interface
                          </h4>
                          <p className="text-sm text-gray-400">
                            Streamlined CV creation process
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-200">
                            Professional Templates
                          </h4>
                          <p className="text-sm text-gray-400">
                            Multiple styling options available
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-200">
                            Public Sharing
                          </h4>
                          <p className="text-sm text-gray-400">
                            Share CVs for inspiration
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tech-card rounded-xl p-6">
                    <h4 className="font-medium text-gray-200 mb-4">
                      Target Audience
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center space-x-3">
                        <span className="text-blue-400">→</span>
                        <span>Job seekers creating professional resumes</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-green-400">→</span>
                        <span>Students entering the job market</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-purple-400">→</span>
                        <span>Professionals updating career documents</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-yellow-400">→</span>
                        <span>Career counselors and HR professionals</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Features Section */}
              <section id="features" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="tech-card rounded-xl p-6 group">
                    <div className="text-2xl mb-4">🎨</div>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">
                      CV Builder
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Interactive form-based creation</li>
                      <li>• Real-time preview and editing</li>
                      <li>• Multiple template styles</li>
                      <li>• Customizable color schemes</li>
                    </ul>
                  </div>

                  <div className="tech-card rounded-xl p-6 group">
                    <div className="text-2xl mb-4">👤</div>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">
                      User Management
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Firebase Authentication</li>
                      <li>• User registration and login</li>
                      <li>• Personal dashboard</li>
                      <li>• CV organization</li>
                    </ul>
                  </div>

                  <div className="tech-card rounded-xl p-6 group">
                    <div className="text-2xl mb-4">🌐</div>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">
                      Public Gallery
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Browse public CVs</li>
                      <li>• Advanced filtering</li>
                      <li>• Skill-based search</li>
                      <li>• Responsive layout</li>
                    </ul>
                  </div>

                  <div className="tech-card rounded-xl p-6 group">
                    <div className="text-2xl mb-4">📚</div>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">
                      Educational Content
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Interactive CV guide</li>
                      <li>• Data-driven insights</li>
                      <li>• ATS optimization tips</li>
                      <li>• Best practices</li>
                    </ul>
                  </div>

                  <div className="tech-card rounded-xl p-6 group">
                    <div className="text-2xl mb-4">📊</div>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">
                      Analytics
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• View tracking</li>
                      <li>• Performance metrics</li>
                      <li>• Usage statistics</li>
                      <li>• Completion insights</li>
                    </ul>
                  </div>

                  <div className="tech-card rounded-xl p-6 group">
                    <div className="text-2xl mb-4">🔧</div>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">
                      Advanced Features
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Template customization</li>
                      <li>• Version control</li>
                      <li>• API integrations</li>
                      <li>• Export options</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Technologies Section */}
              <section id="technologies" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  Technologies Used
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="tech-card rounded-xl p-6">
                      <h3 className="text-lg font-medium mb-4 text-blue-400 flex items-center">
                        <span className="w-3 h-3 bg-blue-400 rounded-full mr-3"></span>
                        Frontend
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                          <div className="font-medium text-gray-200">
                            React 18
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            UI Framework
                          </div>
                        </div>
                        <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                          <div className="font-medium text-gray-200">Vite</div>
                          <div className="text-xs text-gray-400 mt-1">
                            Build Tool
                          </div>
                        </div>
                        <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                          <div className="font-medium text-gray-200">
                            Tailwind
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Styling
                          </div>
                        </div>
                        <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                          <div className="font-medium text-gray-200">
                            Chart.js
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Visualization
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tech-card rounded-xl p-6">
                      <h3 className="text-lg font-medium mb-4 text-green-400 flex items-center">
                        <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
                        Backend & Database
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                          <div className="font-medium text-gray-200">
                            Firebase
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Backend
                          </div>
                        </div>
                        <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                          <div className="font-medium text-gray-200">
                            Firestore
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Database
                          </div>
                        </div>
                        <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                          <div className="font-medium text-gray-200">Auth</div>
                          <div className="text-xs text-gray-400 mt-1">
                            Authentication
                          </div>
                        </div>
                        <div className="text-center p-3 bg-zinc-800/30 rounded-lg">
                          <div className="font-medium text-gray-200">
                            Hosting
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Deployment
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="tech-card rounded-xl p-6">
                      <h3 className="text-lg font-medium mb-4 text-purple-400 flex items-center">
                        <span className="w-3 h-3 bg-purple-400 rounded-full mr-3"></span>
                        Development Tools
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 rounded">
                          <span className="text-gray-300">ESLint</span>
                          <span className="text-xs text-gray-500">
                            Code Quality
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded">
                          <span className="text-gray-300">PostCSS</span>
                          <span className="text-xs text-gray-500">
                            CSS Processing
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded">
                          <span className="text-gray-300">Git</span>
                          <span className="text-xs text-gray-500">
                            Version Control
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded">
                          <span className="text-gray-300">npm</span>
                          <span className="text-xs text-gray-500">
                            Package Manager
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="tech-card rounded-xl p-6">
                      <h3 className="text-lg font-medium mb-4 text-yellow-400 flex items-center">
                        <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></span>
                        Key Libraries
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 rounded">
                          <span className="text-gray-300">uuid</span>
                          <span className="text-xs text-gray-500">
                            ID Generation
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded">
                          <span className="text-gray-300">line-clamp</span>
                          <span className="text-xs text-gray-500">
                            Text Truncation
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded">
                          <span className="text-gray-300">Context API</span>
                          <span className="text-xs text-gray-500">
                            State Management
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Getting Started Section */}
              <section id="getting-started" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  Getting Started
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="tech-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4 text-blue-400">
                      Prerequisites
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                        <span>Node.js (version 16+)</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        <span>npm or yarn package manager</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                        <span>Firebase account and project</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                        <span>Modern web browser</span>
                      </li>
                    </ul>
                  </div>
                  <div className="tech-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4 text-green-400">
                      Quick Start
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-zinc-900/50 rounded p-3 font-mono text-sm">
                        <div className="text-gray-400 mb-1">
                          # Clone repository
                        </div>
                        <div className="text-green-400">
                          git clone https://github.com/FilipElznic/CV_gen.git
                        </div>
                      </div>
                      <div className="bg-zinc-900/50 rounded p-3 font-mono text-sm">
                        <div className="text-gray-400 mb-1">
                          # Install dependencies
                        </div>
                        <div className="text-green-400">
                          cd CV_gen && npm install
                        </div>
                      </div>
                      <div className="bg-zinc-900/50 rounded p-3 font-mono text-sm">
                        <div className="text-gray-400 mb-1">
                          # Start development
                        </div>
                        <div className="text-green-400">npm run dev</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* User Guide Section */}
              <section id="user-guide" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  User Guide
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="tech-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4 text-blue-400">
                      Creating Your First CV
                    </h3>
                    <ol className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                          1
                        </span>
                        <span>Sign up or log in to your account</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                          2
                        </span>
                        <span>
                          Navigate to &apos;Create CV&apos; from dashboard
                        </span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                          3
                        </span>
                        <span>Fill in your personal information</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                          4
                        </span>
                        <span>Add experience, education, skills</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5 flex-shrink-0">
                          5
                        </span>
                        <span>Choose template and save</span>
                      </li>
                    </ol>
                  </div>
                  <div className="tech-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4 text-green-400">
                      Managing CVs
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center space-x-3">
                        <span className="text-green-400">→</span>
                        <span>View all CVs in dashboard</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-green-400">→</span>
                        <span>Edit existing CVs anytime</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-green-400">→</span>
                        <span>Toggle public/private visibility</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-green-400">→</span>
                        <span>Export CVs for offline use</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Architecture & API Sections Combined */}
              <section id="architecture" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  System Architecture
                </h2>
                <div className="tech-card rounded-xl p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-blue-400 mb-3">
                        Frontend Layer
                      </h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• React Components</li>
                        <li>• Pages & Routing</li>
                        <li>• Context API</li>
                        <li>• Tailwind Styling</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-400 mb-3">
                        Backend Services
                      </h4>
                      <ul className="text-sm text-gray-400 space-y-1">
                        <li>• Firebase Auth</li>
                        <li>• Firestore Database</li>
                        <li>• API Services</li>
                        <li>• Cloud Functions</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-400 mb-3">
                        File Structure
                      </h4>
                      <div className="text-xs text-gray-500 font-mono">
                        src/
                        <br />
                        ├── Components/
                        <br />
                        ├── pages/
                        <br />
                        ├── contexts/
                        <br />
                        ├── services/
                        <br />
                        └── config/
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* API Reference */}
              <section id="api" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  API Reference
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="tech-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4 text-green-400">
                      CV Service Functions
                    </h3>
                    <div className="space-y-3">
                      <div className="border-l-2 border-blue-500 pl-3">
                        <code className="text-blue-400 text-sm">
                          createCV(cvData, userId)
                        </code>
                        <p className="text-xs text-gray-500 mt-1">
                          Creates new CV document
                        </p>
                      </div>
                      <div className="border-l-2 border-green-500 pl-3">
                        <code className="text-green-400 text-sm">
                          getAllPublicCVs()
                        </code>
                        <p className="text-xs text-gray-500 mt-1">
                          Retrieves public CVs
                        </p>
                      </div>
                      <div className="border-l-2 border-purple-500 pl-3">
                        <code className="text-purple-400 text-sm">
                          updateCV(cvId, data)
                        </code>
                        <p className="text-xs text-gray-500 mt-1">
                          Updates existing CV
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tech-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4 text-yellow-400">
                      Auth Context
                    </h3>
                    <div className="space-y-3">
                      <div className="border-l-2 border-blue-500 pl-3">
                        <code className="text-blue-400 text-sm">
                          currentUser
                        </code>
                        <p className="text-xs text-gray-500 mt-1">
                          Current user object
                        </p>
                      </div>
                      <div className="border-l-2 border-green-500 pl-3">
                        <code className="text-green-400 text-sm">
                          signup(email, pass)
                        </code>
                        <p className="text-xs text-gray-500 mt-1">
                          Creates new account
                        </p>
                      </div>
                      <div className="border-l-2 border-purple-500 pl-3">
                        <code className="text-purple-400 text-sm">
                          login(email, pass)
                        </code>
                        <p className="text-xs text-gray-500 mt-1">
                          Authenticates user
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Troubleshooting Section */}
              <section id="troubleshooting" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  Troubleshooting
                </h2>
                <div className="space-y-6">
                  <div className="tech-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4 text-red-400">
                      Common Issues
                    </h3>
                    <div className="space-y-4">
                      <div className="border-l-2 border-yellow-500 pl-4">
                        <h4 className="font-medium text-gray-200">
                          Firebase Configuration
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Ensure config is properly set in
                          src/config/firebase.js
                        </p>
                      </div>
                      <div className="border-l-2 border-red-500 pl-4">
                        <h4 className="font-medium text-gray-200">
                          Authentication Issues
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Check Firebase Auth settings and enable Email/Password
                        </p>
                      </div>
                      <div className="border-l-2 border-blue-500 pl-4">
                        <h4 className="font-medium text-gray-200">
                          Charts Not Loading
                        </h4>
                        <p className="text-sm text-gray-400 mt-1">
                          Verify Chart.js loads properly and check console
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="tech-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4 text-blue-400">
                      Support Resources
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center space-x-3">
                        <span className="text-blue-400">•</span>
                        <span>GitHub Issues for bug reports</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-green-400">•</span>
                        <span>Firebase Documentation</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-purple-400">•</span>
                        <span>React Documentation</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-yellow-400">•</span>
                        <span>Tailwind CSS Documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-16 mt-16 border-t border-zinc-700/50">
            <p className="text-gray-400 mb-2">CV Generator Documentation</p>
            <p className="text-gray-500 text-sm">
              Last updated: July 2025 • Built with React, Firebase, and Tailwind
              CSS
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Docs;

import Navbar from "./Navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <style>{`
        .privacy-container {
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
        .content-section:nth-child(5) { animation-delay: 0.4s; }
        .content-section:nth-child(6) { animation-delay: 0.5s; }
        
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
        
        .privacy-card {
          transition: all 0.3s ease;
          background: linear-gradient(145deg, rgba(39, 39, 42, 0.5), rgba(24, 24, 27, 0.3));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(63, 63, 70, 0.3);
        }
        
        .privacy-card:hover {
          transform: translateY(-2px);
          border-color: rgba(156, 163, 175, 0.5);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-gray-100 privacy-container">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-extralight mb-6 text-gray-100 tracking-tight">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Your privacy is important to us. Learn how we collect, use, and
              protect your personal information on our CV Generator platform.
            </p>
            <div className="text-sm text-gray-500">
              Last updated: July 25, 2025
            </div>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sidebar bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50">
                <h3 className="text-lg font-semibold mb-6 text-gray-200">
                  Quick Navigation
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
                    href="#data-collection"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Data Collection
                  </a>
                  <a
                    href="#data-usage"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    Data Usage
                  </a>
                  <a
                    href="#data-storage"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Data Storage
                  </a>

                  <a
                    href="#contact"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    Contact Us
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-16">
              {/* Overview Section */}
              <section id="overview" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  Privacy Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Welcome to our CV Generator platform. This privacy policy
                      explains how we collect, use, and protect your personal
                      information when you use our service. We are committed to
                      maintaining the privacy and security of your data.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-200">
                            No Cookies Policy
                          </h4>
                          <p className="text-sm text-gray-400">
                            We do not use cookies on our website
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-200">
                            Secure Storage
                          </h4>
                          <p className="text-sm text-gray-400">
                            All data is securely stored in Firebase
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-200">
                            User Control
                          </h4>
                          <p className="text-sm text-gray-400">
                            You control the visibility of your CVs
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="privacy-card rounded-xl p-6">
                    <h4 className="font-medium text-gray-200 mb-4">
                      Key Principles
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center space-x-3">
                        <span className="text-green-400">✓</span>
                        <span>Minimal data collection</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-green-400">✓</span>
                        <span>Transparent practices</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-green-400">✓</span>
                        <span>Secure data handling</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-green-400">✓</span>
                        <span>User privacy control</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Collection Section */}
              <section id="data-collection" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  What Data We Collect
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="privacy-card rounded-xl p-6">
                    <div className="text-2xl mb-4">👤</div>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">
                      Account Information
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Email address (for account creation)</li>

                      <li>• Authentication credentials</li>
                      <li>• Account creation date</li>
                    </ul>
                  </div>

                  <div className="privacy-card rounded-xl p-6">
                    <div className="text-2xl mb-4">📄</div>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">
                      CV Content
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Personal information you provide</li>
                      <li>• Work experience details</li>
                      <li>• Education information</li>
                      <li>• Skills and qualifications</li>
                    </ul>
                  </div>

                  <div className="privacy-card rounded-xl p-6">
                    <div className="text-2xl mb-4">⚙️</div>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">
                      Usage Data
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• CV creation timestamps</li>
                      <li>• Public/private settings</li>
                      <li>• Template preferences</li>
                    </ul>
                  </div>

                  <div className="privacy-card rounded-xl p-6">
                    <div className="text-2xl mb-4">🚫</div>
                    <h3 className="text-lg font-medium mb-3 text-gray-200">
                      What We Don&apos;t Collect
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Cookies or tracking data</li>
                      <li>• Browsing history</li>
                      <li>• Third-party data</li>
                      <li>• Sensitive personal data</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Usage Section */}
              <section id="data-usage" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  How We Use Your Data
                </h2>
                <div className="space-y-8">
                  <div className="privacy-card rounded-xl p-6">
                    <h3 className="text-xl font-medium mb-4 text-gray-200">
                      Primary Purposes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-300 mb-3">
                          Account Management
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                          <li>• Create and maintain your account</li>
                          <li>• Authenticate your identity</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-300 mb-3">
                          CV Services
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                          <li>• Store and manage your CVs</li>
                          <li>• Enable CV sharing features</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="privacy-card rounded-xl p-6">
                    <h3 className="text-xl font-medium mb-4 text-gray-200">
                      Data Sharing Policy
                    </h3>
                    <p className="text-gray-300 mb-4">
                      We do not sell, rent, or share your personal data with
                      third parties. Your information is only used for the
                      purposes outlined above.
                    </p>
                    <div className="bg-zinc-700/30 rounded-lg p-4">
                      <h4 className="font-medium text-gray-200 mb-2">
                        Public CV Feature
                      </h4>
                      <p className="text-sm text-gray-400">
                        When you choose to make a CV public, only the CV content
                        you&apos;ve created becomes visible to other users. Your
                        account information and private CVs remain protected.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Storage Section */}
              <section id="data-storage" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  Data Storage & Security
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="privacy-card rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-medium mb-4 text-gray-200">
                        Firebase Security
                      </h3>
                      <p className="text-gray-300 mb-4">
                        All your data is stored securely in Google Firebase,
                        which provides enterprise-grade security and
                        reliability.
                      </p>
                      <ul className="space-y-2 text-sm text-gray-400">
                        <li>• End-to-end encryption</li>
                        <li>• Regular security audits</li>
                        <li>• SOC 2 Type II compliance</li>
                        <li>• ISO 27001 certification</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* User Rights Section */}

              {/* Contact Section */}
              <section id="contact" className="content-section">
                <h2 className="text-3xl font-light mb-8 text-gray-100 border-b border-zinc-700 pb-4">
                  Contact & Updates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="privacy-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4 text-gray-200">
                      Privacy Questions
                    </h3>
                    <p className="text-gray-300 mb-4">
                      If you have any questions about this privacy policy or how
                      we handle your data, please don&apos;t hesitate to contact
                      us.
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>📧elznicfilip@gmail.com</p>
                    </div>
                  </div>
                  <div className="privacy-card rounded-xl p-6">
                    <h3 className="text-lg font-medium mb-4 text-gray-200">
                      Policy Updates
                    </h3>
                    <p className="text-gray-300 mb-4">
                      We may update this privacy policy from time to time. When
                      we do, we&apos;ll notify you through your account
                      dashboard.
                    </p>
                    <div className="bg-zinc-700/30 rounded-lg p-4">
                      <p className="text-sm text-gray-400">
                        <strong>Current Version:</strong> 1.0
                        <br />
                        <strong>Last Updated:</strong> July 25, 2025
                        <br />
                        <strong>Next Review:</strong> January 2026
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

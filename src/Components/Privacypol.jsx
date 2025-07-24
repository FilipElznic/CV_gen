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
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-500">
              Last updated: January 24, 2025
            </p>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sidebar bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700/50">
                <h3 className="text-lg font-semibold mb-6 text-gray-200">
                  Contents
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
                    href="#information-collection"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Information We Collect
                  </a>
                  <a
                    href="#information-use"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                    How We Use Information
                  </a>
                  <a
                    href="#information-sharing"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                    Information Sharing
                  </a>
                  <a
                    href="#data-security"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                    Data Security
                  </a>
                  <a
                    href="#your-rights"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                    Your Rights
                  </a>
                  <a
                    href="#public-cvs"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    Public CVs
                  </a>
                  <a
                    href="#contact"
                    className="nav-link flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-300"
                  >
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                    Contact Us
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Overview Section */}
              <section id="overview" className="content-section">
                <div className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50">
                  <h2 className="text-3xl font-bold mb-6 text-gray-100 flex items-center">
                    <span className="w-3 h-3 bg-blue-400 rounded-full mr-4"></span>
                    Overview
                  </h2>
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p>
                      At CV Generator, we are committed to protecting your
                      privacy and ensuring the security of your personal
                      information. This Privacy Policy explains how we collect,
                      use, share, and protect information about you when you use
                      our CV generation platform.
                    </p>
                    <p>
                      Our platform is designed with privacy in mind. We use
                      Firebase and Google authentication for secure login, and
                      all CV data is stored securely in Firebase. We do not use
                      cookies for tracking, and your personal information is
                      only used to provide the CV generation service.
                    </p>
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-6">
                      <p className="text-blue-300 font-medium">
                        <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                        Key Principle: We only collect information necessary to
                        provide our CV generation service. You control whether
                        your CV is private or public.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Information Collection Section */}
              <section id="information-collection" className="content-section">
                <div className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50">
                  <h2 className="text-3xl font-bold mb-6 text-gray-100 flex items-center">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-4"></span>
                    Information We Collect
                  </h2>
                  <div className="space-y-6 text-gray-300">
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-green-300">
                        Authentication Information (via Firebase/Google)
                      </h3>
                      <ul className="space-y-2 list-disc list-inside ml-4">
                        <li>Email address (for account creation and login)</li>
                        <li>Authentication tokens managed by Firebase</li>
                        <li>
                          Basic profile information from Google (if using Google
                          Sign-In)
                        </li>
                        <li>Account creation and last login timestamps</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-green-300">
                        CV Content (Stored in Firebase)
                      </h3>
                      <ul className="space-y-2 list-disc list-inside ml-4">
                        <li>
                          Personal information you choose to include (name,
                          contact details)
                        </li>
                        <li>Work experience and education details</li>
                        <li>Skills, certifications, and achievements</li>
                        <li>Any additional content you add to your CV</li>
                        <li>CV privacy settings (public or private)</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3 text-green-300">
                        Technical Information (Minimal Collection)
                      </h3>
                      <ul className="space-y-2 list-disc list-inside ml-4">
                        <li>IP address for security purposes</li>
                        <li>
                          Browser type and device information (basic analytics)
                        </li>
                        <li>Error logs for debugging (no personal data)</li>
                      </ul>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                      <p className="text-green-300 text-sm">
                        <strong>No Cookies:</strong> We do not use tracking
                        cookies or any cookies for data collection.
                        Authentication is handled entirely through Firebase.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Information Use Section */}
              <section id="information-use" className="content-section">
                <div className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50">
                  <h2 className="text-3xl font-bold mb-6 text-gray-100 flex items-center">
                    <span className="w-3 h-3 bg-purple-400 rounded-full mr-4"></span>
                    How We Use Your Information
                  </h2>
                  <div className="space-y-6 text-gray-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-3 text-purple-300">
                          Service Provision
                        </h3>
                        <ul className="space-y-2 text-sm list-disc list-inside">
                          <li>Generate and format your CV</li>
                          <li>Store and manage your CV content</li>
                          <li>Provide sharing and download features</li>
                          <li>Maintain your account and preferences</li>
                        </ul>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-3 text-purple-300">
                          Service Improvement
                        </h3>
                        <ul className="space-y-2 text-sm list-disc list-inside">
                          <li>Analyze usage patterns and trends</li>
                          <li>Debug and fix technical issues</li>
                          <li>Develop new features and improvements</li>
                          <li>Optimize performance and user experience</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Information Sharing Section */}
              <section id="information-sharing" className="content-section">
                <div className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50">
                  <h2 className="text-3xl font-bold mb-6 text-gray-100 flex items-center">
                    <span className="w-3 h-3 bg-yellow-400 rounded-full mr-4"></span>
                    Information Sharing
                  </h2>
                  <div className="space-y-6 text-gray-300">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-3 text-red-300">
                        We Do NOT Sell Your Data
                      </h3>
                      <p className="text-sm">
                        We do not sell, trade, or rent your personal information
                        to third parties for marketing purposes.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-yellow-300">
                        Limited Sharing Circumstances
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-200 mb-2">
                            Service Providers
                          </h4>
                          <p className="text-sm">
                            We may share information with trusted service
                            providers who help us operate our platform (hosting,
                            analytics, customer support).
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-200 mb-2">
                            Legal Requirements
                          </h4>
                          <p className="text-sm">
                            We may disclose information when required by law,
                            court order, or to protect our legal rights.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-200 mb-2">
                            Business Transfers
                          </h4>
                          <p className="text-sm">
                            In the event of a merger or acquisition, your
                            information may be transferred as part of the
                            business assets.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-200 mb-2">
                            Public CVs
                          </h4>
                          <p className="text-sm">
                            Information in CVs you choose to make public will be
                            visible to anyone with the link.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Data Security Section */}
              <section id="data-security" className="content-section">
                <div className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50">
                  <h2 className="text-3xl font-bold mb-6 text-gray-100 flex items-center">
                    <span className="w-3 h-3 bg-pink-400 rounded-full mr-4"></span>
                    Data Security
                  </h2>
                  <div className="space-y-6 text-gray-300">
                    <p>
                      We implement appropriate technical and organizational
                      measures to protect your personal information. Your data
                      is secured through Google Firebase's enterprise-grade
                      security infrastructure.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-3 text-pink-300">
                          Firebase Security Features
                        </h3>
                        <ul className="space-y-2 text-sm list-disc list-inside">
                          <li>End-to-end encryption for all data</li>
                          <li>Google-grade authentication systems</li>
                          <li>Automatic security updates and patches</li>
                          <li>Advanced access controls and monitoring</li>
                          <li>GDPR and SOC 2 compliance</li>
                        </ul>
                      </div>
                      <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-3 text-pink-300">
                          Additional Safeguards
                        </h3>
                        <ul className="space-y-2 text-sm list-disc list-inside">
                          <li>No third-party data sharing</li>
                          <li>User-controlled privacy settings</li>
                          <li>Regular security monitoring</li>
                          <li>Secure data transmission (HTTPS)</li>
                          <li>No tracking or analytics cookies</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                      <p className="text-amber-300 text-sm">
                        <strong>Firebase Protection:</strong> Your data is
                        protected by Google Firebase's security infrastructure,
                        which includes enterprise-grade encryption, security
                        monitoring, and compliance with international data
                        protection standards.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Public CVs Section */}
              <section id="public-cvs" className="content-section">
                <div className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50">
                  <h2 className="text-3xl font-bold mb-6 text-gray-100 flex items-center">
                    <span className="w-3 h-3 bg-cyan-400 rounded-full mr-4"></span>
                    Public CVs & Privacy Control
                  </h2>
                  <div className="space-y-6 text-gray-300">
                    <p>
                      You have complete control over the privacy of your CV. By
                      default, all CVs are private and only accessible to you.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-3 text-cyan-300">
                          Private CVs (Default)
                        </h3>
                        <ul className="space-y-2 text-sm list-disc list-inside">
                          <li>Only accessible to you when logged in</li>
                          <li>Stored securely in Firebase</li>
                          <li>Not visible to search engines</li>
                          <li>No public URLs or sharing</li>
                          <li>Complete privacy protection</li>
                        </ul>
                      </div>
                      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-3 text-cyan-300">
                          Public CVs (Your Choice)
                        </h3>
                        <ul className="space-y-2 text-sm list-disc list-inside">
                          <li>You explicitly choose to make CV public</li>
                          <li>Accessible via a unique shareable link</li>
                          <li>Visible to anyone with the link</li>
                          <li>Can be made private again anytime</li>
                          <li>Full control over public visibility</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                        <h4 className="font-semibold text-orange-300 mb-2">
                          Important Privacy Controls
                        </h4>
                        <ul className="space-y-1 text-sm list-disc list-inside">
                          <li>
                            You can switch between private and public at any
                            time
                          </li>
                          <li>Making a CV public is entirely your decision</li>
                          <li>
                            Public CVs are only accessible via direct link
                            sharing
                          </li>
                          <li>
                            We never make your CV public without your explicit
                            consent
                          </li>
                        </ul>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                        <h4 className="font-semibold text-blue-300 mb-2">
                          What This Means for You
                        </h4>
                        <p className="text-sm">
                          Your personal information in CVs is only shared
                          publicly if you choose to make your CV public. Even
                          then, only the information you include in your CV
                          becomes visible - your account details and
                          authentication information remain private.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="content-section">
                <div className="bg-zinc-800/30 backdrop-blur-sm rounded-2xl p-8 border border-zinc-700/50">
                  <h2 className="text-3xl font-bold mb-6 text-gray-100 flex items-center">
                    <span className="w-3 h-3 bg-red-400 rounded-full mr-4"></span>
                    Contact Us
                  </h2>
                  <div className="space-y-6 text-gray-300">
                    <p>
                      If you have questions about this Privacy Policy or our
                      privacy practices, please contact us:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4 text-red-300">
                          Contact Information
                        </h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                            <span>Email: privacy@cvgenerator.com</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                            <span>Response Time: Within 30 days</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                            <span>Subject Line: "Privacy Policy Inquiry"</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                        <h3 className="text-lg font-semibold mb-4 text-red-300">
                          Policy Updates
                        </h3>
                        <div className="space-y-3 text-sm">
                          <p>We may update this Privacy Policy periodically.</p>
                          <p>
                            Changes will be posted on this page with an updated
                            "Last modified" date.
                          </p>
                          <p>
                            Significant changes will be communicated via email
                            or platform notification.
                          </p>
                        </div>
                      </div>
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

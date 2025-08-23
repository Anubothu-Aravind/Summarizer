import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, FileText, MessageSquare, Mic, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === "/";

  return (
    <>
      <style>
        {`
        .nav-button {
          padding: 0.5rem 2rem;
          border-radius: 0.75rem;
          backdrop-filter: blur(4px);
          background-color: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgb(55, 65, 81);
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          text-decoration: none;
          display: inline-block;
        }

        .nav-button:hover {
          background-color: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .nav-button.active {
          background-color: rgba(255, 255, 255, 0.4);
          border-color: rgba(255, 255, 255, 0.4);
        }
        `}
      </style>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-xl bg-white/20 border-b border-white/20 shadow-lg shadow-black/5"
            : "backdrop-blur-sm bg-white/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center py-3 px-4 ml-2">
              <Link
                to="/"
                className="flex items-center space-x-4 text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent"
              >
                <span className="text-3xl">📚</span>
                <span className="tracking-normal">DocDistill</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10 mr-4">
              <Link
                to="/about"
                className={`nav-button ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`nav-button ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                Contact
              </Link>
              <Link
                to="/developer"
                className={`nav-button ${
                  location.pathname === "/developer" ? "active" : ""
                }`}
              >
                Developer
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden mr-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-4 rounded-xl backdrop-blur-sm bg-white/20 border border-white/20 text-gray-700 hover:bg-white/30 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 mx-6 mb-6 p-8 rounded-2xl backdrop-blur-xl bg-white/30 border border-white/20 shadow-xl">
              <div className="flex flex-col space-y-6">
                <Link
                  to="/about"
                  className={`px-10 py-4 rounded-xl backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/20 text-gray-700 font-medium transition-all duration-300 text-center ${
                    location.pathname === "/about" ? "bg-white/30" : ""
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`px-8 py-4 rounded-xl backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/20 text-gray-700 font-medium transition-all duration-300 text-center ${
                    location.pathname === "/contact" ? "bg-white/30" : ""
                  }`}
                >
                  Contact
                </Link>
                <Link
                  to="/developer"
                  className={`px-8 py-4 rounded-xl backdrop-blur-sm bg-white/20 hover:bg-white/30 border border-white/20 text-gray-700 font-medium transition-all duration-300 text-center ${
                    location.pathname === "/developer" ? "bg-white/30" : ""
                  }`}
                >
                  Developer
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      <br />
      <br />
      <br />
      

      {/* Hero Section - Only show on home page */}
      {isHomePage && (
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col items-center text-center space-y-16">
              {/* Header Section */}
              <div className="flex flex-col items-center space-y-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100/60 to-purple-100/60 backdrop-blur-sm border border-white/30 text-sm font-medium text-blue-700">
                  <Sparkles size={18} className="mr-3" />
                  AI-Powered Document Intelligence
                </div>

                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight tracking-tight">
                  Transform PDFs into
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                    Intelligent Conversations
                  </span>
                </h1>
    <br />
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl leading-relaxed mt-6">
                  Upload any PDF document and engage in natural conversations
                  with your content. Get instant answers through text or voice,
                  powered by advanced AI technology.
                </p>
              </div>
<br />
              {/* Feature Cards */}
              <div className="w-full flex justify-center mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl">
                  <div className="flex flex-col items-center p-8 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-6">
                      <FileText size={28} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      Smart PDF Analysis
                    </h3>
                    <p className="text-gray-600 text-base text-center leading-relaxed">
                      Advanced AI extracts and understands content from any PDF
                      document with precision.
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-8 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-green-500/20 to-green-600/20 flex items-center justify-center mb-6">
                      <MessageSquare size={28} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      Text Conversations
                    </h3>
                    <p className="text-gray-600 text-base text-center leading-relaxed">
                      Ask questions about your documents and receive accurate,
                      contextual responses instantly.
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-8 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-6">
                      <Mic size={28} className="text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                      Voice Interaction
                    </h3>
                    <p className="text-gray-600 text-base text-center leading-relaxed">
                      Speak naturally and receive voice responses for a
                      seamless, hands-free experience.
                    </p>
                  </div>
                </div>
              </div>
<br />
              {/* Stats Section */}
              <div className="w-full flex justify-center mt-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-3xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                      85%
                    </div>
                    <div className="text-base text-gray-600">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                      6.1s
                    </div>
                    <div className="text-base text-gray-600">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                      PDF
                    </div>
                    <div className="text-base text-gray-600">File Formats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                      24/7
                    </div>
                    <div className="text-base text-gray-600">Available</div>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

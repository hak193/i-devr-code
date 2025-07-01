import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">iD</span>
              </div>
              <span className="text-xl font-bold text-gray-900">iDevrCode</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
              Courses
            </a>
            <a href="/tools" className="text-gray-600 hover:text-blue-600 transition-colors">
              Tools
            </a>
            <a href="/software" className="text-gray-600 hover:text-blue-600 transition-colors">
              Software Store
            </a>
            <a href="/app-builder" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
              <span className="mr-1">🤖</span>
              AI Builder
            </a>
            <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/app-builder" className="btn btn-primary">
              Start Building
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="/courses" className="text-gray-600 hover:text-blue-600 transition-colors">
                Courses
              </a>
              <a href="/tools" className="text-gray-600 hover:text-blue-600 transition-colors">
                Tools
              </a>
              <a href="/software" className="text-gray-600 hover:text-blue-600 transition-colors">
                Software Store
              </a>
              <a href="/app-builder" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                <span className="mr-1">🤖</span>
                AI Builder
              </a>
              <a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                About
              </a>
              <a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
              <a href="/app-builder" className="btn btn-primary w-full text-center">
                Start Building
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
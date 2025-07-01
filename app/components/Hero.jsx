import { Link } from "@remix-run/react";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white py-20 lg:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            New courses added weekly
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Level Up Your
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Coding Skills
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover premium development tools, in-depth courses, and ready-to-use templates.
            Built by developers, for developers who want to{" "}
            <span className="code-highlight">ship faster</span> and{" "}
            <span className="code-highlight">code better</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/courses" className="btn btn-primary text-lg px-8 py-4">
              Browse Courses
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link to="/tools" className="btn btn-secondary text-lg px-8 py-4">
              Explore Tools
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-400 text-sm">Premium Courses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">10K+</div>
              <div className="text-gray-400 text-sm">Happy Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
              <div className="text-gray-400 text-sm">Code Templates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-400 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </section>
  );
}

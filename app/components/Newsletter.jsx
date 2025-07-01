import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to your newsletter service
    console.log("Newsletter signup:", email);
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-16 lg:py-24 bg-gray-900 text-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Stay Updated with Latest Resources
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get weekly updates on new courses, tools, and exclusive developer content.
              Join 10,000+ developers who trust our insights.
            </p>
          </div>

          {/* Newsletter Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="btn btn-primary px-8 py-3 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-3">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </form>
          ) : (
            <div className="max-w-md mx-auto mb-12 p-6 bg-green-600/20 border border-green-500/30 rounded-lg">
              <div className="text-green-400 text-2xl mb-2">✓</div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                Successfully Subscribed!
              </h3>
              <p className="text-green-200">
                Check your email for a confirmation link.
              </p>
            </div>
          )}

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Weekly Tutorials</h3>
              <p className="text-gray-400 text-sm">
                In-depth tutorials and coding tips delivered to your inbox
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Exclusive Discounts</h3>
              <p className="text-gray-400 text-sm">
                Early access to new courses and subscriber-only discounts
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Access</h3>
              <p className="text-gray-400 text-sm">
                Join our private Discord community of developers
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

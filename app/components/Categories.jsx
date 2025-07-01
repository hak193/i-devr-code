import { Link } from "@remix-run/react";

export function Categories({ categories }) {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find exactly what you need to take your skills to the next level
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.name.toLowerCase()}`}
              className="card text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {category.description}
              </p>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-full text-lg font-bold mb-2">
                {category.count}
              </div>
              <p className="text-xs text-gray-500">Available items</p>
            </Link>
          ))}
        </div>

        {/* Featured Category Highlight */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            🚀 New: Full-Stack Development Bundle
          </h3>
          <p className="text-lg lg:text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Complete collection of courses, tools, and templates for modern web development.
            Everything you need to build production-ready applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-3xl font-bold">
              <span className="line-through text-blue-200 text-xl mr-2">$499</span>
              $299
            </div>
            <Link to="/bundle" className="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Get Bundle Now
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

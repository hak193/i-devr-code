import { Link } from "@remix-run/react";

export function FeaturedProducts({ products }) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hand-picked resources to accelerate your development journey
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="card group cursor-pointer">
              {/* Product Image */}
              <div className="relative mb-6 overflow-hidden rounded-lg bg-gray-100">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-4xl mb-2">
                      {product.category === 'Course' ? '📚' : 
                       product.category === 'Tools' ? '🛠️' : 
                       product.category === 'Scripts' ? '⚡' : '📋'}
                    </div>
                    <div className="text-sm opacity-80">{product.category}</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.price}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {product.price}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                      Preview
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/products" className="btn btn-primary text-lg px-8 py-4">
            View All Products
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
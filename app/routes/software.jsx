import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PaymentModal } from "../components/PaymentModal";

export const meta = () => {
  return [
    { title: "Software Store - iDevrCode" },
    { name: "description", content: "Premium custom software tools and applications built for developers and businesses." },
  ];
};

export const loader = async () => {
  return json({
    featuredSoftware: [
      {
        id: 1,
        name: "DevFlow Pro",
        description: "Complete project management suite designed specifically for development teams",
        price: 299,
        originalPrice: 399,
        category: "Project Management",
        image: "🚀",
        features: ["Team Collaboration", "Git Integration", "Time Tracking", "Sprint Planning"],
        downloads: 1250,
        rating: 4.9,
        tags: ["Popular", "Best Seller"]
      },
      {
        id: 2,
        name: "API Guardian",
        description: "Advanced API monitoring and testing tool with automated documentation",
        price: 199,
        originalPrice: 249,
        category: "API Tools",
        image: "🛡️",
        features: ["Real-time Monitoring", "Auto Documentation", "Load Testing", "Security Scanning"],
        downloads: 890,
        rating: 4.8,
        tags: ["New Release"]
      },
      {
        id: 3,
        name: "Code Architect",
        description: "AI-powered code analysis and architecture visualization platform",
        price: 399,
        originalPrice: 499,
        category: "Code Analysis",
        image: "🏗️",
        features: ["Architecture Mapping", "Code Quality Analysis", "Dependency Tracking", "Refactoring Suggestions"],
        downloads: 650,
        rating: 4.7,
        tags: ["AI Powered"]
      }
    ],
    softwareCategories: [
      {
        name: "Development Tools",
        count: 24,
        icon: "⚡",
        description: "IDEs, editors, and development utilities"
      },
      {
        name: "Project Management",
        count: 18,
        icon: "📊",
        description: "Team collaboration and project tracking"
      },
      {
        name: "API & Integration",
        count: 15,
        icon: "🔗",
        description: "API tools and integration platforms"
      },
      {
        name: "Security Tools",
        count: 12,
        icon: "🔒",
        description: "Security scanning and vulnerability tools"
      },
      {
        name: "Database Tools",
        count: 20,
        icon: "🗄️",
        description: "Database management and optimization"
      },
      {
        name: "DevOps & CI/CD",
        count: 16,
        icon: "🔄",
        description: "Deployment and continuous integration"
      }
    ],
    allSoftware: [
      {
        id: 4,
        name: "Database Optimizer Pro",
        description: "Intelligent database performance optimization and monitoring",
        price: 149,
        category: "Database Tools",
        image: "⚡",
        rating: 4.6,
        downloads: 420
      },
      {
        id: 5,
        name: "Security Scanner Elite",
        description: "Comprehensive security vulnerability scanner for web applications",
        price: 249,
        category: "Security Tools",
        image: "🔍",
        rating: 4.8,
        downloads: 380
      },
      {
        id: 6,
        name: "Deploy Master",
        description: "Automated deployment pipeline with rollback capabilities",
        price: 179,
        category: "DevOps & CI/CD",
        image: "🚀",
        rating: 4.7,
        downloads: 520
      },
      {
        id: 7,
        name: "Code Formatter Suite",
        description: "Multi-language code formatting and style enforcement tool",
        price: 89,
        category: "Development Tools",
        image: "✨",
        rating: 4.5,
        downloads: 750
      },
      {
        id: 8,
        name: "Team Sync Pro",
        description: "Real-time team collaboration with integrated communication",
        price: 199,
        category: "Project Management",
        image: "👥",
        rating: 4.6,
        downloads: 340
      }
    ]
  });
};

export default function Software() {
  const { featuredSoftware, softwareCategories, allSoftware } = useLoaderData();
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, item: null });

  const handlePurchase = (software) => {
    setPaymentModal({ isOpen: true, item: software });
  };

  const closePaymentModal = () => {
    setPaymentModal({ isOpen: false, item: null });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Premium Software Store
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Discover powerful custom tools and applications built by developers, for developers. 
                Each software is crafted with precision and tested in real-world scenarios.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#featured" className="btn btn-primary">
                  Browse Featured
                </a>
                <a href="/app-builder" className="btn bg-white text-purple-600 hover:bg-gray-100">
                  🤖 AI App Builder
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Software Categories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our curated collection of professional software tools organized by category
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softwareCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.count} tools available</span>
                    <span className="text-blue-600 font-medium">Browse →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Software */}
        <section id="featured" className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Software</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our most popular and highly-rated software tools, trusted by thousands of developers
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredSoftware.map((software) => (
                <div key={software.id} className="bg-gray-50 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{software.image}</div>
                      <div className="flex flex-wrap gap-1">
                        {software.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{software.name}</h3>
                    <p className="text-gray-600 mb-4">{software.description}</p>
                    
                    <div className="mb-4">
                      <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded">
                        {software.category}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      {software.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <span className="text-yellow-400">★</span>
                          <span className="text-sm text-gray-600 ml-1">{software.rating}</span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">{software.downloads} downloads</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${software.price}</span>
                        {software.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">${software.originalPrice}</span>
                        )}
                      </div>
                      <button 
                        onClick={() => handlePurchase(software)}
                        className="btn btn-primary"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Software Grid */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">All Software</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse our complete collection of professional development tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allSoftware.map((software) => (
                <div key={software.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{software.image}</div>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {software.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{software.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{software.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm text-gray-600 ml-1">{software.rating}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{software.downloads} downloads</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${software.price}</span>
                    <button 
                      onClick={() => handlePurchase(software)}
                      className="btn btn-primary text-sm px-4 py-2"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Need Something Custom?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Can't find exactly what you need? Try our AI-powered app builder to create custom solutions 
                tailored to your specific requirements.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/app-builder" className="btn bg-white text-blue-600 hover:bg-gray-100">
                  🤖 Try AI App Builder
                </a>
                <a href="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600">
                  Request Custom Development
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        item={paymentModal.item}
        type="software"
      />
    </div>
  );
}
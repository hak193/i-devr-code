import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Categories } from "../components/Categories";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";

export const meta = () => {
  return [
    { title: "iDevrCode - Premium Developer Tools & Resources" },
    { name: "description", content: "Discover premium development tools, courses, and resources to accelerate your coding journey." },
  ];
};

export const loader = async () => {
  // In a real app, you'd fetch this data from your database or API
  const featuredProducts = [
    {
      id: 1,
      title: "Advanced React Patterns Course",
      description: "Master advanced React patterns and best practices used by top-tier companies.",
      price: "$149",
      image: "/api/placeholder/300/200",
      category: "Course",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Full-Stack Developer Toolkit",
      description: "Complete collection of tools and templates for modern web development.",
      price: "$89",
      image: "/api/placeholder/300/200",
      category: "Tools",
      tags: ["Full-Stack", "Templates", "Tools"]
    },
    {
      id: 3,
      title: "Node.js Microservices Guide",
      description: "Build scalable microservices architecture with Node.js and Docker.",
      price: "$199",
      image: "/api/placeholder/300/200",
      category: "Course",
      tags: ["Node.js", "Microservices", "Backend"]
    },
    {
      id: 4,
      title: "DevOps Automation Scripts",
      description: "Ready-to-use automation scripts for CI/CD and deployment workflows.",
      price: "$79",
      image: "/api/placeholder/300/200",
      category: "Tools",
      tags: ["DevOps", "Automation", "Scripts"]
    }
  ];

  const categories = [
    {
      name: "Courses",
      description: "In-depth programming courses",
      icon: "📚",
      count: 24
    },
    {
      name: "Tools",
      description: "Development tools and utilities",
      icon: "🛠️",
      count: 18
    },
    {
      name: "Templates",
      description: "Ready-to-use code templates",
      icon: "📄",
      count: 32
    },
    {
      name: "Guides",
      description: "Step-by-step tutorials",
      icon: "📖",
      count: 28
    },
    {
      name: "Resources",
      description: "Curated development resources",
      icon: "💎",
      count: 45
    },
    {
      name: "Scripts",
      description: "Automation and utility scripts",
      icon: "⚡",
      count: 15
    }
  ];

  return json({ featuredProducts, categories });
};

// New component for the special features section
function SpecialFeatures() {
  return (
    <section className="py-16 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Powerful New Features
          </h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Discover our latest innovations designed to supercharge your development workflow
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Software Store */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all">
            <div className="text-5xl mb-6">🛒</div>
            <h3 className="text-2xl font-bold mb-4">Software Store</h3>
            <p className="text-purple-100 mb-6">
              Browse our curated collection of premium custom software tools built specifically for developers. 
              From project management to API monitoring, find the perfect tool for your workflow.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-purple-100">
                <span className="text-green-400 mr-2">✓</span>
                Professional development tools
              </div>
              <div className="flex items-center text-purple-100">
                <span className="text-green-400 mr-2">✓</span>
                Tested by thousands of developers
              </div>
              <div className="flex items-center text-purple-100">
                <span className="text-green-400 mr-2">✓</span>
                Regular updates and support
              </div>
            </div>
            <a href="/software" className="btn bg-white text-purple-600 hover:bg-gray-100">
              Browse Software Store
            </a>
          </div>
          
          {/* AI App Builder */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 hover:bg-white/15 transition-all">
            <div className="text-5xl mb-6">🤖</div>
            <h3 className="text-2xl font-bold mb-4">AI App Builder</h3>
            <p className="text-purple-100 mb-6">
              Describe your app idea and watch our AI build it for you. Choose from templates or create 
              something completely custom. Pay per app or subscribe for unlimited access.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-purple-100">
                <span className="text-green-400 mr-2">✓</span>
                AI-powered code generation
              </div>
              <div className="flex items-center text-purple-100">
                <span className="text-green-400 mr-2">✓</span>
                Real-time preview and testing
              </div>
              <div className="flex items-center text-purple-100">
                <span className="text-green-400 mr-2">✓</span>
                Flexible pricing options
              </div>
            </div>
            <a href="/app-builder" className="btn bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600">
              🚀 Start Building
            </a>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
            <span className="text-yellow-400">⭐</span>
            <span className="text-purple-100">New features launching every month</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const { featuredProducts, categories } = useLoaderData();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedProducts products={featuredProducts} />
        <SpecialFeatures />
        <Categories categories={categories} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
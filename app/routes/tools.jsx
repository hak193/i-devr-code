import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const meta = () => {
  return [
    { title: "Developer Tools - iDevrCode" },
    { name: "description", content: "Premium developer tools and utilities to boost your productivity." },
  ];
};

export const loader = async () => {
  const tools = [
    {
      id: 1,
      title: "API Testing Suite",
      description: "Complete API testing toolkit with automated testing, mock servers, and performance monitoring.",
      price: "$89",
      category: "Testing",
      features: ["Automated Testing", "Mock Servers", "Performance Monitoring", "Team Collaboration"],
      downloads: 5420,
      rating: 4.9,
      icon: "🔧"
    },
    {
      id: 2,
      title: "Code Generator Pro",
      description: "Generate boilerplate code for React, Node.js, and database schemas with customizable templates.",
      price: "$79",
      category: "Productivity",
      features: ["React Components", "Node.js APIs", "Database Schemas", "Custom Templates"],
      downloads: 3210,
      rating: 4.8,
      icon: "⚡"
    },
    {
      id: 3,
      title: "Database Designer",
      description: "Visual database design tool with ERD generation, migration scripts, and team collaboration.",
      price: "$129",
      category: "Database",
      features: ["Visual Design", "ERD Generation", "Migration Scripts", "Team Sync"],
      downloads: 2890,
      rating: 4.7,
      icon: "🗄️"
    },
    {
      id: 4,
      title: "Performance Profiler",
      description: "Advanced performance profiling for web applications with real-time monitoring and optimization suggestions.",
      price: "$149",
      category: "Performance",
      features: ["Real-time Monitoring", "Performance Metrics", "Optimization Tips", "Custom Alerts"],
      downloads: 1950,
      rating: 4.9,
      icon: "📊"
    },
    {
      id: 5,
      title: "Deployment Manager",
      description: "Streamline your deployment process with automated CI/CD pipelines and environment management.",
      price: "$99",
      category: "DevOps",
      features: ["CI/CD Pipelines", "Environment Management", "Rollback Support", "Monitoring"],
      downloads: 4320,
      rating: 4.6,
      icon: "🚀"
    },
    {
      id: 6,
      title: "Security Scanner",
      description: "Comprehensive security scanning for web applications with vulnerability detection and remediation guides.",
      price: "$159",
      category: "Security",
      features: ["Vulnerability Scanning", "Security Reports", "Remediation Guides", "Compliance Checks"],
      downloads: 2150,
      rating: 4.8,
      icon: "🔒"
    }
  ];

  const categories = [
    { name: "All", count: tools.length },
    { name: "Testing", count: tools.filter(t => t.category === "Testing").length },
    { name: "Productivity", count: tools.filter(t => t.category === "Productivity").length },
    { name: "Database", count: tools.filter(t => t.category === "Database").length },
    { name: "Performance", count: tools.filter(t => t.category === "Performance").length },
    { name: "DevOps", count: tools.filter(t => t.category === "DevOps").length },
    { name: "Security", count: tools.filter(t => t.category === "Security").length }
  ];

  return json({ tools, categories });
};

export default function Tools() {
  const { tools, categories } = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-900 to-blue-900 text-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Developer Tools & Utilities
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Boost your productivity with our collection of premium developer tools. 
                Built to solve real problems and save you hours of development time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="#tools" className="btn btn-primary px-8 py-3">
                  Browse Tools
                </Link>
                <Link to="/bundles" className="btn btn-secondary px-8 py-3">
                  View Bundles
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-white border-b">
          <div className="container">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-lg transition-colors"
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool) => (
                <div key={tool.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{tool.icon}</div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {tool.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {tool.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <span>📥 {tool.downloads.toLocaleString()} downloads</span>
                    <span>⭐ {tool.rating}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-purple-600">{tool.price}</div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors text-sm">
                        Demo
                      </button>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Tool?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? We build custom developer tools tailored to your specific needs.
            </p>
            <Link to="/contact" className="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
              Get Custom Quote
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
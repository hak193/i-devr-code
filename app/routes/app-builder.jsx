import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PaymentModal } from "../components/PaymentModal";

export const meta = () => {
  return [
    { title: "AI App Builder - iDevrCode" },
    { name: "description", content: "Build custom applications with our AI-powered app builder. Pay to unlock or buy your creation." },
  ];
};

export const loader = async () => {
  return json({
    pricingPlans: [
      {
        name: "Builder Access",
        price: 29,
        period: "month",
        description: "Unlimited access to AI app builder",
        features: [
          "Unlimited app building sessions",
          "AI-powered code generation",
          "Real-time preview",
          "Export source code",
          "Basic templates library",
          "Community support"
        ],
        popular: false
      },
      {
        name: "Pro Builder",
        price: 79,
        period: "month",
        description: "Advanced features for professional developers",
        features: [
          "Everything in Builder Access",
          "Advanced AI models",
          "Custom component library",
          "Database integration",
          "API connectivity",
          "Priority support",
          "Commercial license"
        ],
        popular: true
      },
      {
        name: "Pay Per App",
        price: 99,
        period: "app",
        description: "Pay only for what you build",
        features: [
          "Single app purchase",
          "Full source code ownership",
          "Commercial license included",
          "30-day support",
          "No monthly commitment"
        ],
        popular: false
      }
    ],
    appTemplates: [
      {
        id: 1,
        name: "E-commerce Store",
        description: "Full-featured online store with cart, payments, and admin panel",
        image: "🛒",
        complexity: "Advanced",
        estimatedTime: "15-20 minutes",
        features: ["Product catalog", "Shopping cart", "Payment integration", "Admin dashboard"]
      },
      {
        id: 2,
        name: "Task Management",
        description: "Project management tool with teams, tasks, and deadlines",
        image: "📋",
        complexity: "Intermediate",
        estimatedTime: "10-15 minutes",
        features: ["Task boards", "Team collaboration", "Due dates", "Progress tracking"]
      },
      {
        id: 3,
        name: "Blog Platform",
        description: "Content management system with editor and publishing tools",
        image: "📝",
        complexity: "Beginner",
        estimatedTime: "5-10 minutes",
        features: ["Rich text editor", "Categories", "Comments", "SEO optimization"]
      },
      {
        id: 4,
        name: "CRM System",
        description: "Customer relationship management with contacts and deals",
        image: "👥",
        complexity: "Advanced",
        estimatedTime: "20-25 minutes",
        features: ["Contact management", "Deal pipeline", "Email integration", "Reports"]
      }
    ]
  });
};

export default function AppBuilder() {
  const { pricingPlans, appTemplates } = useLoaderData();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [buildingStep, setBuildingStep] = useState(0);
  const [builtApp, setBuiltApp] = useState(null);
  const [paymentModal, setPaymentModal] = useState({ isOpen: false, item: null, type: "software" });
  const [appRequirements, setAppRequirements] = useState({
    name: "",
    description: "",
    features: [],
    database: false,
    authentication: false,
    payments: false,
    api: false
  });

  const buildingSteps = [
    "Analyzing Requirements",
    "Generating Architecture",
    "Creating Components",
    "Setting up Database",
    "Implementing Features",
    "Testing & Optimization",
    "Finalizing Build"
  ];

  const handleStartBuilding = (template) => {
    setSelectedTemplate(template);
    setBuildingStep(1);
    // Simulate building process
    const interval = setInterval(() => {
      setBuildingStep(prev => {
        if (prev >= buildingSteps.length) {
          clearInterval(interval);
          // Set the built app for purchase
          setBuiltApp({
            name: template.name,
            price: 99,
            description: template.description,
            template: template
          });
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const handleCustomBuild = () => {
    if (!appRequirements.name || !appRequirements.description) {
      alert("Please fill in app name and description");
      return;
    }
    setBuildingStep(1);
    // Simulate building process
    const interval = setInterval(() => {
      setBuildingStep(prev => {
        if (prev >= buildingSteps.length) {
          clearInterval(interval);
          // Set the built app for purchase
          setBuiltApp({
            name: appRequirements.name,
            price: 99,
            description: appRequirements.description,
            custom: true
          });
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const handleSubscribe = (plan) => {
    setPaymentModal({ 
      isOpen: true, 
      item: { name: plan.name, price: plan.price }, 
      type: "subscription" 
    });
  };

  const handleBuyApp = () => {
    setPaymentModal({ 
      isOpen: true, 
      item: builtApp, 
      type: "software" 
    });
  };

  const closePaymentModal = () => {
    setPaymentModal({ isOpen: false, item: null, type: "software" });
  };

  const resetBuilder = () => {
    setBuildingStep(0);
    setBuiltApp(null);
    setSelectedTemplate(null);
    setAppRequirements({
      name: "",
      description: "",
      features: [],
      database: false,
      authentication: false,
      payments: false,
      api: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-16">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-6xl mb-6">🤖</div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                AI App Builder
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Describe your app idea and watch our AI build it for you. 
                Choose from templates or create something completely custom.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#templates" className="btn btn-primary">
                  Browse Templates
                </a>
                <a href="#custom" className="btn bg-white text-purple-600 hover:bg-gray-100">
                  Custom Build
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our AI-powered builder makes app development accessible to everyone
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">1. Describe Your Idea</h3>
                <p className="text-gray-600 text-sm">Tell us what you want to build or choose from our templates</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">2. AI Builds Your App</h3>
                <p className="text-gray-600 text-sm">Our AI analyzes requirements and generates your application</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👀</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">3. Preview & Test</h3>
                <p className="text-gray-600 text-sm">See your app in action with our real-time preview</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">4. Pay & Download</h3>
                <p className="text-gray-600 text-sm">Subscribe for unlimited access or buy individual apps</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Flexible pricing options to fit your development needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`rounded-xl shadow-lg p-8 ${plan.popular ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white transform scale-105' : 'bg-gray-50'}`}>
                  {plan.popular && (
                    <div className="text-center mb-4">
                      <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.name}
                    </h3>
                    <div className="mb-2">
                      <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                        ${plan.price}
                      </span>
                      <span className={`text-lg ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                        /{plan.period}
                      </span>
                    </div>
                    <p className={`${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                      {plan.description}
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className={`flex items-center ${plan.popular ? 'text-white' : 'text-gray-600'}`}>
                        <span className={`mr-3 ${plan.popular ? 'text-green-300' : 'text-green-500'}`}>✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => handleSubscribe(plan)}
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-colors ${
                      plan.popular 
                        ? 'bg-white text-blue-600 hover:bg-gray-100' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {plan.period === 'app' ? 'Pay Per App' : 'Start Free Trial'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App Templates */}
        <section id="templates" className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Templates</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get started quickly with our pre-built templates. Customize them to fit your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {appTemplates.map((template) => (
                <div key={template.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4 text-center">{template.image}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Complexity:</span>
                      <span className={`font-medium ${
                        template.complexity === 'Beginner' ? 'text-green-600' :
                        template.complexity === 'Intermediate' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {template.complexity}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Build Time:</span>
                      <span className="text-gray-900">{template.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feature, featureIndex) => (
                        <span key={featureIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleStartBuilding(template)}
                    className="w-full btn btn-primary text-sm"
                  >
                    Build This App
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Builder */}
        <section id="custom" className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Custom App Builder</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Describe your unique app idea and let our AI build it from scratch
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">App Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
                        <input
                          type="text"
                          value={appRequirements.name}
                          onChange={(e) => setAppRequirements({...appRequirements, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="My Awesome App"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={appRequirements.description}
                          onChange={(e) => setAppRequirements({...appRequirements, description: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Describe what your app should do, who will use it, and any specific features you need..."
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Features Needed</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'database', label: 'Database Storage', desc: 'Store and manage data' },
                        { key: 'authentication', label: 'User Authentication', desc: 'Login and user accounts' },
                        { key: 'payments', label: 'Payment Processing', desc: 'Accept payments online' },
                        { key: 'api', label: 'API Integration', desc: 'Connect to external services' }
                      ].map((feature) => (
                        <label key={feature.key} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={appRequirements[feature.key]}
                            onChange={(e) => setAppRequirements({
                              ...appRequirements, 
                              [feature.key]: e.target.checked
                            })}
                            className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900">{feature.label}</div>
                            <div className="text-sm text-gray-600">{feature.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <button 
                    onClick={handleCustomBuild}
                    className="btn btn-primary px-8 py-3"
                  >
                    🚀 Build My Custom App
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Building Progress Modal */}
        {buildingStep > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Building Your App</h3>
                
                <div className="space-y-3 mb-6">
                  {buildingSteps.map((step, index) => (
                    <div key={index} className={`flex items-center space-x-3 ${
                      index < buildingStep ? 'text-green-600' : 
                      index === buildingStep ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        index < buildingStep ? 'bg-green-100' : 
                        index === buildingStep ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {index < buildingStep ? '✓' : index + 1}
                      </div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
                
                {buildingStep >= buildingSteps.length ? (
                  <div>
                    <div className="text-green-600 text-4xl mb-4">✅</div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">App Built Successfully!</h4>
                    <p className="text-gray-600 mb-6">Your app is ready. Choose how you'd like to proceed:</p>
                    <div className="space-y-3">
                      <button 
                        onClick={handleBuyApp}
                        className="w-full btn btn-primary"
                      >
                        💳 Buy App - $99
                      </button>
                      <button 
                        onClick={() => handleSubscribe(pricingPlans[1])}
                        className="w-full btn bg-purple-600 text-white hover:bg-purple-700"
                      >
                        🔓 Subscribe for Unlimited Access - $79/month
                      </button>
                      <button 
                        onClick={resetBuilder}
                        className="w-full btn bg-gray-200 text-gray-700 hover:bg-gray-300"
                      >
                        👀 Preview Only (No Download)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(buildingStep / buildingSteps.length) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
      
      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={closePaymentModal}
        item={paymentModal.item}
        type={paymentModal.type}
      />
    </div>
  );
}
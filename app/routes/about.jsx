import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const meta = () => {
  return [
    { title: "About - iDevrCode" },
    { name: "description", content: "Learn about iDevrCode and our mission to empower developers worldwide." },
  ];
};

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                About iDevrCode
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                We're on a mission to empower developers worldwide with premium tools, 
                courses, and resources that accelerate learning and boost productivity.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Founded in 2025 by a team of passionate developers, iDevrCode was born from 
                    the frustration of spending countless hours searching for quality learning 
                    resources and productivity tools.
                  </p>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    We realized that developers needed a centralized platform where they could 
                    find premium, battle-tested resources created by industry experts who 
                    understand real-world challenges.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Today, we're proud to serve over 10,000 developers worldwide, helping them 
                    level up their skills and build amazing products.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">10K+</div>
                      <div className="text-blue-100 text-sm">Happy Developers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">50+</div>
                      <div className="text-blue-100 text-sm">Premium Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">100+</div>
                      <div className="text-blue-100 text-sm">Developer Tools</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">24/7</div>
                      <div className="text-blue-100 text-sm">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
                  <p className="text-gray-600">
                    Every resource is carefully curated and tested by industry experts 
                    to ensure the highest quality standards.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                  <p className="text-gray-600">
                    We stay ahead of the curve, constantly updating our content 
                    with the latest technologies and best practices.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤝</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
                  <p className="text-gray-600">
                    We believe in the power of community and provide platforms 
                    for developers to connect, learn, and grow together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Sarah Chen",
                    role: "Founder & CEO",
                    bio: "Full-stack developer with 10+ years at Google and Meta",
                    avatar: "👩‍💻"
                  },
                  {
                    name: "Mike Rodriguez",
                    role: "CTO",
                    bio: "Backend architect specializing in microservices and DevOps",
                    avatar: "👨‍💻"
                  },
                  {
                    name: "Alex Thompson",
                    role: "Lead Instructor",
                    bio: "TypeScript expert and former Microsoft engineer",
                    avatar: "👨‍🏫"
                  }
                ].map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">{member.avatar}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Level Up?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already accelerating their careers with iDevrCode.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/courses" className="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Browse Courses
              </a>
              <a href="/contact" className="btn btn-secondary px-8 py-3">
                Get in Touch
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
import { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const meta = () => {
  return [
    { title: "Contact - iDevrCode" },
    { name: "description", content: "Get in touch with the iDevrCode team. We're here to help!" },
  ];
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 to-purple-900 text-white py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-blue-100">
                Have questions? Need help? Want to collaborate? We'd love to hear from you!
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="partnership">Partnership</option>
                          <option value="custom">Custom Development</option>
                          <option value="refund">Refund Request</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>
                      
                      <button
                        type="submit"
                        className="w-full btn btn-primary py-3"
                      >
                        Send Message
                      </button>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-green-600 text-5xl mb-4">✓</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                      <p className="text-gray-600 mb-6">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setFormData({ name: "", email: "", subject: "", message: "" });
                        }}
                        className="btn btn-primary"
                      >
                        Send Another Message
                      </button>
                    </div>
                  )}
                </div>

                {/* Contact Info */}
                <div className="space-y-8">
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Email</h3>
                          <p className="text-gray-600">support@idevrcode.com</p>
                          <p className="text-gray-600">partnerships@idevrcode.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Response Time</h3>
                          <p className="text-gray-600">Within 24 hours</p>
                          <p className="text-gray-600">Priority support for customers</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Community</h3>
                          <p className="text-gray-600">Join our Discord server</p>
                          <p className="text-gray-600">Connect with other developers</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-8 text-white">
                    <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                    <p className="text-blue-100 mb-6">
                      Check out our comprehensive help center with tutorials, FAQs, and troubleshooting guides.
                    </p>
                    <a href="/help" className="btn bg-white text-blue-600 hover:bg-gray-100">
                      Visit Help Center
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
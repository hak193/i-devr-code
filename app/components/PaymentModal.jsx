import { useState } from "react";

export function PaymentModal({ isOpen, onClose, item, type = "software" }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
    address: "",
    city: "",
    zipCode: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
      
      // Auto-close after success
      setTimeout(() => {
        setPaymentComplete(false);
        onClose();
      }, 3000);
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {paymentComplete ? (
          // Success State
          <div className="p-8 text-center">
            <div className="text-green-500 text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              {type === "subscription" 
                ? "Your subscription is now active. You have unlimited access to the AI App Builder."
                : `You now own "${item?.name}". Check your email for download instructions.`
              }
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                📧 Confirmation email sent to: <strong>{formData.email}</strong>
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {type === "subscription" ? "Subscribe to AI Builder" : `Purchase ${item?.name}`}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Order Summary */}
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    {type === "subscription" ? "AI App Builder Pro" : item?.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {type === "subscription" 
                      ? "Monthly subscription with unlimited access"
                      : "One-time purchase with full source code"
                    }
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    ${type === "subscription" ? "79" : item?.price || "99"}
                    {type === "subscription" && <span className="text-sm text-gray-600">/month</span>}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="p-6">
              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 ${
                      paymentMethod === "card" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span>💳</span>
                    <span>Credit Card</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`p-4 border-2 rounded-lg flex items-center justify-center space-x-2 ${
                      paymentMethod === "paypal" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <span>🅿️</span>
                    <span>PayPal</span>
                  </button>
                </div>
              </div>

              {paymentMethod === "card" && (
                <>
                  {/* Card Details */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  {/* Billing Info */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Billing Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                      placeholder="123 Main Street"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Terms */}
              <div className="mb-6">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-colors ${
                  isProcessing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Complete Purchase - $${type === "subscription" ? "79" : item?.price || "99"}`
                )}
              </button>

              {/* Security Notice */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  🔒 Your payment information is encrypted and secure
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
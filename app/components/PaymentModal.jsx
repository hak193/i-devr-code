import { useState, useEffect } from "react";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getStripe, getPaymentElementOptions, validatePaymentForm } from "~/lib/stripe.client";

// Payment form component that uses Stripe Elements
function PaymentForm({ item, type, onSuccess, onError, onClose }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Validate form data
    const validation = validatePaymentForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setIsProcessing(true);
    setFormErrors({});

    try {
      // Create payment intent or subscription on the server
      const response = await fetch('/api/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type === 'subscription' ? 'subscription' : 'payment',
          amount: type === 'subscription' ? undefined : item.price,
          email: formData.email,
          name: formData.name,
          planId: type === 'subscription' ? getPlanId(item.name) : undefined,
          metadata: {
            itemName: item.name,
            itemId: item.id || 'custom',
            softwareName: item.name,
            softwareId: item.id,
          }
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Payment setup failed');
      }

      // Confirm the payment
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: result.clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        throw new Error(error.message);
      }

      // Payment succeeded
      onSuccess({
        type: result.type,
        paymentIntentId: result.paymentIntentId,
        subscriptionId: result.subscriptionId,
        customerId: result.customerId,
      });

    } catch (error) {
      console.error('Payment error:', error);
      onError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPlanId = (planName) => {
    const planMap = {
      'Builder Access': 'builder-access',
      'Pro Builder': 'pro-builder',
    };
    return planMap[planName] || 'builder-access';
  };

  const buttonText = type === 'subscription' ? 'Start Free Trial' : 'Complete Purchase';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formErrors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="your@email.com"
            required
          />
          {formErrors.email && (
            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              formErrors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
            required
          />
          {formErrors.name && (
            <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
          )}
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
        <div className="p-4 border border-gray-200 rounded-lg">
          <PaymentElement options={getPaymentElementOptions()} />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Order Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">{item.name}</span>
            <span className="font-semibold">
              ${item.price}{type === 'subscription' ? '/month' : ''}
            </span>
          </div>
          {type === 'subscription' && (
            <div className="flex justify-between text-sm text-green-600">
              <span>7-day free trial</span>
              <span>$0.00</span>
            </div>
          )}
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total {type === 'subscription' ? '(after trial)' : ''}</span>
            <span>${item.price}{type === 'subscription' ? '/month' : ''}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          disabled={isProcessing}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            <span>{buttonText}</span>
          )}
        </button>
      </div>

      {type === 'subscription' && (
        <p className="text-xs text-gray-500 text-center">
          You won't be charged during your 7-day free trial. Cancel anytime.
        </p>
      )}
    </form>
  );
}

// Main PaymentModal component
export function PaymentModal({ isOpen, onClose, item, type = "software" }) {
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, success, error
  const [statusMessage, setStatusMessage] = useState('');
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStripePromise(getStripe());
      setPaymentStatus('idle');
      setStatusMessage('');
    }
  }, [isOpen]);

  const handlePaymentSuccess = (result) => {
    setPaymentStatus('success');
    if (result.type === 'subscription') {
      setStatusMessage('Subscription created successfully! Your free trial has started.');
    } else {
      setStatusMessage('Payment successful! You now have access to your purchase.');
    }

    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  const handlePaymentError = (error) => {
    setPaymentStatus('error');
    setStatusMessage(error || 'Payment failed. Please try again.');
  };

  const handleClose = () => {
    setPaymentStatus('idle');
    setStatusMessage('');
    onClose();
  };

  const isPaymentFormReady = paymentStatus === 'idle' && stripePromise;
  const isPaymentFormLoading = paymentStatus === 'idle' && !stripePromise;

  if (!isOpen || !item) return null;

  const options = {
    mode: type === 'subscription' ? 'subscription' : 'payment',
    amount: type === 'subscription' ? undefined : item.price * 100,
    currency: 'usd',
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#3b82f6',
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {type === 'subscription' ? 'Subscribe to Plan' : 'Complete Purchase'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Content */}
          {paymentStatus === 'success' && (
            <div className="text-center py-8">
              <div className="text-green-500 text-6xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600 mb-4">{statusMessage}</p>
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Continue
              </button>
            </div>
          )}

          {paymentStatus === 'error' && (
            <div className="text-center py-8">
              <div className="text-red-500 text-6xl mb-4">❌</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h3>
              <p className="text-gray-600 mb-4">{statusMessage}</p>
              <div className="space-x-4">
                <button
                  onClick={() => setPaymentStatus('idle')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Try Again
                </button>
                <button
                  onClick={handleClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {isPaymentFormReady && (
            <Elements stripe={stripePromise} options={options}>
              <PaymentForm
                item={item}
                type={type}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onClose={handleClose}
              />
            </Elements>
          )}

          {isPaymentFormLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading payment form...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";

export const meta = () => {
  return [
    { title: "Payment Successful - iDevrCode" },
    { name: "description", content: "Your payment has been processed successfully." },
  ];
};

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get payment details from URL parameters
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    const redirectStatus = searchParams.get('redirect_status');

    if (paymentIntent && redirectStatus === 'succeeded') {
      setPaymentDetails({
        paymentIntentId: paymentIntent,
        status: 'succeeded',
        type: 'payment'
      });
    } else if (redirectStatus === 'succeeded') {
      setPaymentDetails({
        status: 'succeeded',
        type: 'subscription'
      });
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {paymentDetails?.status === 'succeeded' ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-green-500 text-6xl mb-6">✅</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Payment Successful!
                </h1>

                {paymentDetails.type === 'subscription' ? (
                  <div className="space-y-4">
                    <p className="text-lg text-gray-600 mb-6">
                      Your subscription has been activated successfully. Your free trial has started!
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
                      <ul className="text-sm text-blue-800 space-y-1 text-left">
                        <li>• Access the AI App Builder with unlimited builds</li>
                        <li>• Explore premium templates and features</li>
                        <li>• Download source code for your projects</li>
                        <li>• Get priority support from our team</li>
                      </ul>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="/app-builder"
                        className="btn btn-primary"
                      >
                        Start Building Apps
                      </a>
                      <a
                        href="/dashboard"
                        className="btn btn-outline"
                      >
                        View Dashboard
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-lg text-gray-600 mb-6">
                      Your purchase has been completed successfully. You now have access to your software!
                    </p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-green-900 mb-2">Download Information</h3>
                      <p className="text-sm text-green-800">
                        Download links and license information have been sent to your email address.
                        You can also access your purchases from your account dashboard.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href="/software"
                        className="btn btn-primary"
                      >
                        Browse More Software
                      </a>
                      <a
                        href="/dashboard"
                        className="btn btn-outline"
                      >
                        View My Purchases
                      </a>
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Payment ID: {paymentDetails.paymentIntentId || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Need help? <a href="/contact" className="text-blue-600 hover:underline">Contact our support team</a>
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-red-500 text-6xl mb-6">❌</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Payment Failed
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                  We couldn't process your payment. Please try again or contact support if the problem persists.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/software"
                    className="btn btn-primary"
                  >
                    Try Again
                  </a>
                  <a
                    href="/contact"
                    className="btn btn-outline"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import { Header } from "~/components/Header";
import { Footer } from "~/components/Footer";
import {
  getUserByEmail,
  getUserPurchases,
  getActiveSubscription,
} from "~/lib/db.server";
import { getSubscription, cancelSubscription } from "~/lib/stripe.server";

export const meta = () => {
  return [
    { title: "Dashboard - iDevrCode" },
    { name: "description", content: "Manage your subscriptions and purchases" },
  ];
};

export const loader = async ({ request }) => {
  // In a real app, you'd get the user from session/auth
  // For now, we'll use a demo user email
  const url = new URL(request.url);
  const userEmail = url.searchParams.get('email') || 'demo@example.com';

  try {
    const user = await getUserByEmail(userEmail);

    if (!user) {
      return json({
        user: null,
        purchases: [],
        subscription: null,
        subscriptionDetails: null,
      });
    }

    const purchases = await getUserPurchases(user.id);
    const subscription = await getActiveSubscription(user.id);

    let subscriptionDetails = null;
    if (subscription) {
      const stripeSubscription = await getSubscription(subscription.stripeSubscriptionId);
      subscriptionDetails = stripeSubscription.success ? stripeSubscription.subscription : null;
    }

    return json({
      user,
      purchases,
      subscription,
      subscriptionDetails,
    });
  } catch (error) {
    console.error('Dashboard loader error:', error);
    return json({
      user: null,
      purchases: [],
      subscription: null,
      subscriptionDetails: null,
      error: 'Failed to load dashboard data',
    });
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const action = formData.get('action');
  const subscriptionId = formData.get('subscriptionId');

  if (action === 'cancel_subscription' && subscriptionId) {
    try {
      const result = await cancelSubscription(subscriptionId);

      if (result.success) {
        return json({ success: true, message: 'Subscription canceled successfully' });
      } else {
        return json({ success: false, error: result.error }, { status: 400 });
      }
    } catch (error) {
      console.error('Cancel subscription error:', error);
      return json({ success: false, error: 'Failed to cancel subscription' }, { status: 500 });
    }
  }

  return json({ success: false, error: 'Invalid action' }, { status: 400 });
};

export default function Dashboard() {
  const { user, purchases, subscription, subscriptionDetails, error } = useLoaderData();
  const [cancellingSubscription, setCancellingSubscription] = useState(false);

  const handleCancelSubscription = async () => {
    if (!subscription || !confirm('Are you sure you want to cancel your subscription? You will lose access at the end of your current billing period.')) {
      return;
    }

    setCancellingSubscription(true);

    try {
      const formData = new FormData();
      formData.append('action', 'cancel_subscription');
      formData.append('subscriptionId', subscription.stripeSubscriptionId);

      const response = await fetch('/dashboard', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        window.location.reload();
      } else {
        alert('Failed to cancel subscription: ' + result.error);
      }
    } catch (error) {
      alert('Failed to cancel subscription. Please try again.');
    } finally {
      setCancellingSubscription(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'bg-green-100 text-green-800',
      trialing: 'bg-blue-100 text-blue-800',
      past_due: 'bg-yellow-100 text-yellow-800',
      canceled: 'bg-red-100 text-red-800',
      completed: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const canCancelSubscription = subscription && subscription.status === 'active' && !subscription.cancelAtPeriodEnd;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Error</h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link to="/" className="btn btn-primary">
                Go Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to iDevrCode</h1>
              <p className="text-gray-600 mb-6">Sign in to view your dashboard and manage your subscriptions.</p>
              <div className="space-x-4">
                <Link to="/software" className="btn btn-primary">
                  Browse Software
                </Link>
                <Link to="/app-builder" className="btn btn-outline">
                  Try App Builder
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="py-16">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Subscription Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Subscription</h2>

                  {subscription ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {subscription.planType === 'builder-access' ? 'Builder Access' : 'Pro Builder'}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {subscription.status === 'trialing' ? 'Free Trial' : 'Active Subscription'}
                          </p>
                        </div>
                        {getStatusBadge(subscription.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Current Period:</span>
                          <p className="font-medium">
                            {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                          </p>
                        </div>
                        {subscription.trialEnd && (
                          <div>
                            <span className="text-gray-600">Trial Ends:</span>
                            <p className="font-medium">{formatDate(subscription.trialEnd)}</p>
                          </div>
                        )}
                      </div>

                      {subscriptionDetails && (
                        <div className="pt-4 border-t">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Next Payment:</span>
                            <span className="font-medium">
                              {formatCurrency(subscriptionDetails.items.data[0].price.unit_amount)} on {formatDate(subscription.currentPeriodEnd)}
                            </span>
                          </div>
                        </div>
                      )}

                      {canCancelSubscription && (
                        <div className="pt-4">
                          <button
                            onClick={handleCancelSubscription}
                            disabled={cancellingSubscription}
                            className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                          >
                            {cancellingSubscription ? 'Canceling...' : 'Cancel Subscription'}
                          </button>
                        </div>
                      )}

                      {subscription.cancelAtPeriodEnd && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-sm text-yellow-800">
                            Your subscription will be canceled at the end of the current billing period ({formatDate(subscription.currentPeriodEnd)}).
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">You don't have an active subscription.</p>
                      <Link to="/app-builder" className="btn btn-primary">
                        Choose a Plan
                      </Link>
                    </div>
                  )}
                </div>

                {/* Purchases Section */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Software Purchases</h2>

                  {purchases.length > 0 ? (
                    <div className="space-y-4">
                      {purchases.map((purchase) => (
                        <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{purchase.softwareName}</h3>
                            {getStatusBadge(purchase.status)}
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <span>Purchase Date:</span>
                              <p className="font-medium text-gray-900">{formatDate(purchase.createdAt)}</p>
                            </div>
                            <div>
                              <span>Amount:</span>
                              <p className="font-medium text-gray-900">{formatCurrency(purchase.amount)}</p>
                            </div>
                          </div>
                          {purchase.status === 'completed' && (
                            <div className="mt-3">
                              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Download
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">You haven't purchased any software yet.</p>
                      <Link to="/software" className="btn btn-primary">
                        Browse Software
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Account Info */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Member Since:</span>
                      <p className="font-medium">{formatDate(user.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link to="/app-builder" className="block w-full btn btn-primary text-center">
                      App Builder
                    </Link>
                    <Link to="/software" className="block w-full btn btn-outline text-center">
                      Browse Software
                    </Link>
                    {subscription && (
                      <Link to="/app-builds" className="block w-full btn btn-outline text-center">
                        My App Builds
                      </Link>
                    )}
                  </div>
                </div>

                {/* Support */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                  <div className="space-y-3 text-sm">
                    <Link to="/contact" className="block text-blue-600 hover:text-blue-700">
                      Contact Support
                    </Link>
                    <Link to="/docs" className="block text-blue-600 hover:text-blue-700">
                      Documentation
                    </Link>
                    <Link to="/faq" className="block text-blue-600 hover:text-blue-700">
                      FAQ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

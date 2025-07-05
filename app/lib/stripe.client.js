import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

/**
 * Get Stripe instance with publishable key
 */
export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = typeof window !== 'undefined'
      ? window.ENV?.STRIPE_PUBLISHABLE_KEY
      : null;

    if (!publishableKey) {
      console.error('Stripe publishable key not found');
      return null;
    }

    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

/**
 * Format currency for display
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100);
};

/**
 * Confirm payment with Stripe
 */
export const confirmPayment = async (stripe, elements, clientSecret, returnUrl) => {
  if (!stripe || !elements) {
    return { error: { message: 'Stripe not initialized' } };
  }

  return await stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams: {
      return_url: returnUrl,
    },
    redirect: 'if_required',
  });
};

/**
 * Confirm subscription with Stripe
 */
export const confirmSubscription = async (stripe, elements, clientSecret, returnUrl) => {
  if (!stripe || !elements) {
    return { error: { message: 'Stripe not initialized' } };
  }

  return await stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams: {
      return_url: returnUrl,
    },
    redirect: 'if_required',
  });
};

/**
 * Get payment element options for customizing the UI
 */
export const getPaymentElementOptions = () => {
  return {
    layout: "tabs",
    paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
    fields: {
      billingDetails: {
        name: 'auto',
        email: 'auto',
        phone: 'auto',
        address: {
          country: 'auto',
          line1: 'auto',
          line2: 'auto',
          city: 'auto',
          state: 'auto',
          postalCode: 'auto',
        },
      },
    },
    terms: {
      card: 'auto',
    },
  };
};

/**
 * Validate payment form data
 */
export const validatePaymentForm = (formData) => {
  const errors = {};
  let isValid = true;

  // Email validation
  if (!formData.email) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Name validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Please enter your full name';
    isValid = false;
  }

  return { isValid, errors };
};

/**
 * Handle payment errors and return user-friendly messages
 */
export const getPaymentErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';

  switch (error.code) {
    case 'card_declined':
      return 'Your card was declined. Please try a different payment method.';
    case 'expired_card':
      return 'Your card has expired. Please use a different card.';
    case 'incorrect_cvc':
      return 'Your card\'s security code is incorrect.';
    case 'processing_error':
      return 'An error occurred while processing your card. Please try again.';
    case 'incorrect_number':
      return 'Your card number is incorrect.';
    case 'incomplete_number':
      return 'Your card number is incomplete.';
    case 'incomplete_cvc':
      return 'Your card\'s security code is incomplete.';
    case 'incomplete_expiry':
      return 'Your card\'s expiration date is incomplete.';
    case 'invalid_expiry_month':
      return 'Your card\'s expiration month is invalid.';
    case 'invalid_expiry_year':
      return 'Your card\'s expiration year is invalid.';
    case 'invalid_cvc':
      return 'Your card\'s security code is invalid.';
    default:
      return error.message || 'An error occurred while processing your payment.';
  }
};

/**
 * Payment status helpers
 */
export const getPaymentStatus = (paymentIntent) => {
  if (!paymentIntent) return { status: 'unknown', message: 'Payment status unknown' };

  switch (paymentIntent.status) {
    case 'succeeded':
      return {
        status: 'success',
        message: 'Payment successful!'
      };
    case 'processing':
      return {
        status: 'processing',
        message: 'Your payment is being processed.'
      };
    case 'requires_payment_method':
      return {
        status: 'failed',
        message: 'Payment failed. Please try a different payment method.'
      };
    case 'requires_confirmation':
      return {
        status: 'pending',
        message: 'Payment requires confirmation.'
      };
    case 'requires_action':
      return {
        status: 'action_required',
        message: 'Additional authentication required.'
      };
    case 'canceled':
      return {
        status: 'canceled',
        message: 'Payment was canceled.'
      };
    default:
      return {
        status: 'unknown',
        message: `Payment status: ${paymentIntent.status}`
      };
  }
};

/**
 * Subscription status helpers
 */
export const getSubscriptionStatus = (subscription) => {
  if (!subscription) return { status: 'unknown', message: 'Subscription status unknown' };

  switch (subscription.status) {
    case 'active':
      return {
        status: 'active',
        message: 'Subscription is active'
      };
    case 'trialing':
      return {
        status: 'trial',
        message: 'Free trial is active'
      };
    case 'past_due':
      return {
        status: 'past_due',
        message: 'Payment is past due'
      };
    case 'canceled':
      return {
        status: 'canceled',
        message: 'Subscription has been canceled'
      };
    case 'unpaid':
      return {
        status: 'unpaid',
        message: 'Subscription payment failed'
      };
    case 'incomplete':
      return {
        status: 'incomplete',
        message: 'Subscription setup is incomplete'
      };
    case 'incomplete_expired':
      return {
        status: 'expired',
        message: 'Subscription setup expired'
      };
    default:
      return {
        status: 'unknown',
        message: `Subscription status: ${subscription.status}`
      };
  }
};

/**
 * Create payment method for future use
 */
export const createPaymentMethod = async (stripe, elements) => {
  if (!stripe || !elements) {
    return { error: { message: 'Stripe not initialized' } };
  }

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    elements,
  });

  return { error, paymentMethod };
};

/**
 * Retrieve payment intent
 */
export const retrievePaymentIntent = async (stripe, clientSecret) => {
  if (!stripe) {
    return { error: { message: 'Stripe not initialized' } };
  }

  return await stripe.retrievePaymentIntent(clientSecret);
};

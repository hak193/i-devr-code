import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

// Create a payment intent for one-time payments (software purchases)
export async function createPaymentIntent({ amount, currency = 'usd', metadata = {} }) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Create a subscription for recurring payments (monthly plans)
export async function createSubscription({
  customerId,
  priceId,
  metadata = {},
  trialPeriodDays = 7
}) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      trial_period_days: trialPeriodDays,
      metadata,
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    return {
      success: true,
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    };
  } catch (error) {
    console.error('Error creating subscription:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Create or retrieve a customer
export async function createOrRetrieveCustomer({ email, name, metadata = {} }) {
  try {
    // First, try to find existing customer by email
    const existingCustomers = await stripe.customers.list({
      email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      return {
        success: true,
        customer: existingCustomers.data[0],
        isNew: false,
      };
    }

    // Create new customer if not found
    const customer = await stripe.customers.create({
      email,
      name,
      metadata,
    });

    return {
      success: true,
      customer,
      isNew: true,
    };
  } catch (error) {
    console.error('Error creating/retrieving customer:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Create price objects for subscription plans
export async function createPrice({
  productId,
  unitAmount,
  currency = 'usd',
  interval = 'month',
  nickname
}) {
  try {
    const price = await stripe.prices.create({
      product: productId,
      unit_amount: Math.round(unitAmount * 100), // Convert to cents
      currency,
      recurring: {
        interval,
      },
      nickname,
    });

    return {
      success: true,
      price,
    };
  } catch (error) {
    console.error('Error creating price:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Create product for subscription plans
export async function createProduct({ name, description, metadata = {} }) {
  try {
    const product = await stripe.products.create({
      name,
      description,
      metadata,
    });

    return {
      success: true,
      product,
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Webhook signature verification
export function verifyWebhookSignature(payload, signature, endpointSecret) {
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    return { success: true, event };
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return { success: false, error: error.message };
  }
}

// Get subscription details
export async function getSubscription(subscriptionId) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return {
      success: true,
      subscription,
    };
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Cancel subscription
export async function cancelSubscription(subscriptionId) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return {
      success: true,
      subscription,
    };
  } catch (error) {
    console.error('Error canceling subscription:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

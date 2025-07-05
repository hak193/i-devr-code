import { json } from "@remix-run/node";
import {
  createPaymentIntent,
  createOrRetrieveCustomer,
  createSubscription
} from "~/lib/stripe.server";

export const action = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();
    const { type, amount, email, name, planId, metadata = {} } = body;

    // Validate required fields
    if (!email || !name) {
      return json({
        success: false,
        error: "Email and name are required"
      }, { status: 400 });
    }

    // Create or retrieve customer
    const customerResult = await createOrRetrieveCustomer({
      email,
      name,
      metadata: {
        source: 'iDevrCode',
        ...metadata
      }
    });

    if (!customerResult.success) {
      return json({
        success: false,
        error: customerResult.error
      }, { status: 500 });
    }

    const customer = customerResult.customer;

    if (type === 'subscription') {
      // Handle subscription payment
      if (!planId) {
        return json({
          success: false,
          error: "Plan ID is required for subscriptions"
        }, { status: 400 });
      }

      // Map plan names to Stripe price IDs (you'll need to create these in Stripe Dashboard)
      const priceIdMap = {
        'builder-access': process.env.STRIPE_BUILDER_ACCESS_PRICE_ID,
        'pro-builder': process.env.STRIPE_PRO_BUILDER_PRICE_ID,
      };

      const priceId = priceIdMap[planId];
      if (!priceId) {
        return json({
          success: false,
          error: "Invalid plan selected"
        }, { status: 400 });
      }

      const subscriptionResult = await createSubscription({
        customerId: customer.id,
        priceId,
        metadata: {
          customerEmail: email,
          customerName: name,
          planType: planId,
          ...metadata
        }
      });

      if (!subscriptionResult.success) {
        return json({
          success: false,
          error: subscriptionResult.error
        }, { status: 500 });
      }

      return json({
        success: true,
        clientSecret: subscriptionResult.clientSecret,
        subscriptionId: subscriptionResult.subscriptionId,
        customerId: customer.id,
        type: 'subscription'
      });

    } else {
      // Handle one-time payment
      if (!amount || amount <= 0) {
        return json({
          success: false,
          error: "Valid amount is required"
        }, { status: 400 });
      }

      const paymentResult = await createPaymentIntent({
        amount,
        metadata: {
          customerEmail: email,
          customerName: name,
          customerId: customer.id,
          type: 'software_purchase',
          ...metadata
        }
      });

      if (!paymentResult.success) {
        return json({
          success: false,
          error: paymentResult.error
        }, { status: 500 });
      }

      return json({
        success: true,
        clientSecret: paymentResult.clientSecret,
        paymentIntentId: paymentResult.paymentIntentId,
        customerId: customer.id,
        type: 'payment'
      });
    }

  } catch (error) {
    console.error('Payment creation error:', error);
    return json({
      success: false,
      error: "Internal server error"
    }, { status: 500 });
  }
};

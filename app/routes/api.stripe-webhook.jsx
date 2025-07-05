import { json } from "@remix-run/node";
import { verifyWebhookSignature } from "~/lib/stripe.server";
import {
  createOrUpdateUser,
  getUserByStripeCustomerId,
  createSubscription,
  updateSubscription,
  createPurchase,
  createPaymentEvent,
  markPaymentEventProcessed,
} from "~/lib/db.server";

export const action = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  const signature = request.headers.get("stripe-signature");
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !endpointSecret) {
    console.error("Missing webhook signature or secret");
    return json({ error: "Webhook configuration error" }, { status: 400 });
  }

  try {
    const payload = await request.text();
    
    const verificationResult = verifyWebhookSignature(
      payload, 
      signature, 
      endpointSecret
    );

    if (!verificationResult.success) {
      console.error("Webhook verification failed:", verificationResult.error);
      return json({ error: "Webhook verification failed" }, { status: 400 });
    }

    const event = verificationResult.event;
    console.log(`Received webhook event: ${event.type}`);

    // Create audit trail
    const eventObject = event.data.object;
    const subscriptionId = eventObject.subscription || eventObject.id || null;
    const paymentIntentId = eventObject.payment_intent || eventObject.id || null;
    const amount = eventObject.amount || eventObject.amount_paid || null;
    const status = eventObject.status || 'unknown';

    await createPaymentEvent({
      stripeEventId: event.id,
      eventType: event.type,
      customerId: eventObject.customer || null,
      subscriptionId: subscriptionId,
      paymentIntentId: paymentIntentId,
      amount: amount,
      status: status,
      metadata: eventObject.metadata || {},
    });

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
        
      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;
        
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
        
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionCanceled(event.data.object);
        break;
        
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object);
        break;
        
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object);
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Mark event as processed
    await markPaymentEventProcessed(event.id);

    return json({ received: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return json({ error: "Webhook processing failed" }, { status: 500 });
  }
};

// Handle successful one-time payment
async function handlePaymentSuccess(paymentIntent) {
  console.log('Payment succeeded:', paymentIntent.id);
  
  const metadata = paymentIntent.metadata;
  
  try {
    // Create or update user
    const user = await createOrUpdateUser({
      email: metadata.customerEmail,
      name: metadata.customerName,
      stripeCustomerId: paymentIntent.customer,
    });

    // Create purchase record
    if (metadata.type === 'software_purchase') {
      const softwareId = metadata.softwareId || 'custom';
      const softwareName = metadata.softwareName || metadata.itemName || 'Unknown Software';

      await createPurchase({
        userId: user.id,
        stripePaymentIntentId: paymentIntent.id,
        softwareId: softwareId,
        softwareName: softwareName,
        amount: paymentIntent.amount,
        status: 'completed',
      });

      console.log(`Software purchase completed for user: ${user.email}`);
      console.log(`Amount: $${paymentIntent.amount / 100}`);
      console.log(`Software: ${metadata.softwareName || 'Unknown'}`);
      
      // TODO: Send purchase confirmation email
      // await sendPurchaseConfirmationEmail(user.email, {
      //   softwareName: metadata.softwareName,
      //   amount: paymentIntent.amount / 100,
      //   downloadUrl: 'https://your-domain.com/downloads/' + metadata.softwareId
      // });
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

// Handle failed payment
async function handlePaymentFailed(paymentIntent) {
  console.log('Payment failed:', paymentIntent.id);
  
  const metadata = paymentIntent.metadata;
  
  try {
    console.log(`Payment failed for customer: ${metadata.customerEmail}`);
    
    // TODO: Send payment failed notification
    // await sendPaymentFailedEmail(metadata.customerEmail, {
    //   amount: paymentIntent.amount / 100,
    //   reason: paymentIntent.last_payment_error?.message || 'Unknown error'
    // });
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

// Handle subscription creation
async function handleSubscriptionCreated(subscription) {
  console.log('Subscription created:', subscription.id);
  
  try {
    // Get user by Stripe customer ID
    const user = await getUserByStripeCustomerId(subscription.customer);
    
    if (user) {
      // Create subscription record
      await createSubscription({
        userId: user.id,
        stripeSubscriptionId: subscription.id,
        stripePriceId: subscription.items.data[0].price.id,
        planType: getPlanTypeFromPriceId(subscription.items.data[0].price.id),
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        trialStart: subscription.trial_start ? new Date(subscription.trial_start * 1000) : null,
        trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      });

      console.log(`Subscription created for user: ${user.email}`);
      console.log(`Plan: ${getPlanTypeFromPriceId(subscription.items.data[0].price.id)}`);
      console.log(`Status: ${subscription.status}`);
      
      // TODO: Send welcome email
      // await sendSubscriptionWelcomeEmail(user.email, {
      //   planType: getPlanTypeFromPriceId(subscription.items.data[0].price.id),
      //   trialEnd: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null
      // });
    }
  } catch (error) {
    console.error('Error handling subscription creation:', error);
  }
}

// Handle subscription updates
async function handleSubscriptionUpdated(subscription) {
  console.log('Subscription updated:', subscription.id);
  
  try {
    // Update subscription record
    await updateSubscription(subscription.id, {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });

    console.log(`Subscription updated: ${subscription.id}`);
    console.log(`New status: ${subscription.status}`);
    
    // Handle status changes
    if (subscription.status === 'active') {
      console.log('Subscription is now active - access granted');
    } else if (subscription.status === 'past_due') {
      console.log('Subscription is past due - sending reminder');
      // TODO: Send past due notification
    } else if (subscription.status === 'canceled') {
      console.log('Subscription canceled - access will be revoked at period end');
    }
  } catch (error) {
    console.error('Error handling subscription update:', error);
  }
}

// Handle subscription cancellation
async function handleSubscriptionCanceled(subscription) {
  console.log('Subscription canceled:', subscription.id);
  
  try {
    // Update subscription status
    await updateSubscription(subscription.id, {
      status: 'canceled',
    });

    console.log(`Subscription canceled: ${subscription.id}`);
    
    // TODO: Send cancellation confirmation email
    // const user = await getUserByStripeCustomerId(subscription.customer);
    // if (user) {
    //   await sendCancellationEmail(user.email, {
    //     planType: getPlanTypeFromPriceId(subscription.items.data[0].price.id),
    //     accessUntil: new Date(subscription.current_period_end * 1000)
    //   });
    // }
  } catch (error) {
    console.error('Error handling subscription cancellation:', error);
  }
}

// Handle successful invoice payment (for subscriptions)
async function handleInvoicePaymentSucceeded(invoice) {
  console.log('Invoice payment succeeded:', invoice.id);
  
  try {
    console.log(`Invoice paid for customer: ${invoice.customer}`);
    console.log(`Amount: $${invoice.amount_paid / 100}`);
    
    // TODO: Send payment receipt
    // const user = await getUserByStripeCustomerId(invoice.customer);
    // if (user) {
    //   await sendPaymentReceiptEmail(user.email, {
    //     amount: invoice.amount_paid / 100,
    //     invoiceUrl: invoice.hosted_invoice_url,
    //     period: {
    //       start: new Date(invoice.period_start * 1000),
    //       end: new Date(invoice.period_end * 1000)
    //     }
    //   });
    // }
  } catch (error) {
    console.error('Error handling invoice payment success:', error);
  }
}

// Handle failed invoice payment
async function handleInvoicePaymentFailed(invoice) {
  console.log('Invoice payment failed:', invoice.id);
  
  try {
    console.log(`Invoice payment failed for customer: ${invoice.customer}`);
    
    // TODO: Send payment failed notification
    // const user = await getUserByStripeCustomerId(invoice.customer);
    // if (user) {
    //   await sendInvoiceFailedEmail(user.email, {
    //     amount: invoice.amount_due / 100,
    //     dueDate: new Date(invoice.due_date * 1000),
    //     paymentUrl: invoice.hosted_invoice_url
    //   });
    // }
  } catch (error) {
    console.error('Error handling invoice payment failure:', error);
  }
}

// Helper function to map price IDs to plan types
function getPlanTypeFromPriceId(priceId) {
  const priceMap = {
    [process.env.STRIPE_BUILDER_ACCESS_PRICE_ID]: 'builder-access',
    [process.env.STRIPE_PRO_BUILDER_PRICE_ID]: 'pro-builder',
  };
  return priceMap[priceId] || 'unknown';
}

# Stripe Integration Setup Guide

This guide will help you set up Stripe payment processing for the iDevrCode platform.

## Prerequisites

1. **Stripe Account**: Create a free account at [stripe.com](https://stripe.com)
2. **Node.js**: Ensure you have Node.js installed
3. **Environment Variables**: Access to your app's environment configuration

## Step 1: Stripe Dashboard Setup

### 1.1 Get API Keys

1. Log into your Stripe Dashboard
2. Go to **Developers** → **API Keys**
3. Copy your **Publishable key** (starts with `pk_`)
4. Copy your **Secret key** (starts with `sk_`)

### 1.2 Create Products and Prices

1. Go to **Products** in your Stripe Dashboard
2. Create the following products:

#### Builder Access Plan

- **Name**: Builder Access
- **Description**: Access to AI App Builder with basic features
- **Pricing**: $29/month (or your preferred price)
- **Billing**: Recurring monthly
- **Free Trial**: 7 days
- Copy the **Price ID** (starts with `price_`)

#### Pro Builder Plan

- **Name**: Pro Builder
- **Description**: Full access to AI App Builder with premium features
- **Pricing**: $79/month (or your preferred price)
- **Billing**: Recurring monthly
- **Free Trial**: 7 days
- Copy the **Price ID** (starts with `price_`)

### 1.3 Set Up Webhooks

1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Set **Endpoint URL** to: `https://your-domain.com/api/stripe-webhook`
4. Select the following events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Webhook signing secret** (starts with `whsec_`)

## Step 2: Environment Configuration

Create or update your `.env` file with the following variables:

```env
# Stripe Configuration
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe Price IDs
STRIPE_BUILDER_ACCESS_PRICE_ID=price_your_builder_access_price_id
STRIPE_PRO_BUILDER_PRICE_ID=price_your_pro_builder_price_id
```

## Step 3: Test the Integration

### 3.1 Test Cards
Use these test card numbers in development:

- **Successful payment**: `4242424242424242`
- **Declined payment**: `4000000000000002`
- **Requires authentication**: `4000002500003155`

### 3.2 Test Scenarios

#### One-time Payment Test

1. Go to your Software Store
2. Click "Buy Now" on any software item
3. Fill in test information:
   - Email: `test@example.com`
   - Name: `Test User`
   - Card: `4242424242424242`
   - Expiry: Any future date
   - CVC: Any 3 digits
4. Complete the payment
5. Verify success page appears

#### Subscription Test

1. Go to your App Builder page
2. Click "Start Free Trial" on any plan
3. Fill in the same test information
4. Complete the subscription setup
5. Verify trial starts successfully

### 3.3 Webhook Testing

1. Use Stripe CLI for local testing:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   ```
2. Trigger test events:
   ```bash
   stripe trigger payment_intent.succeeded
   ```

## Step 4: Production Setup

### 4.1 Switch to Live Mode

1. In Stripe Dashboard, toggle to **Live mode**
2. Get your live API keys
3. Update environment variables with live keys
4. Update webhook endpoint to production URL

### 4.2 Security Checklist

- [ ] Environment variables are secure
- [ ] Webhook endpoint is HTTPS
- [ ] API keys are not exposed in client code
- [ ] Error handling is implemented
- [ ] Logging is configured for production

## Step 5: Business Logic Integration

### 5.1 Database Schema
Consider adding these tables to track payments:

```sql
-- Users table (if not exists)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  stripe_customer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  plan_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchases table
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  stripe_payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
  software_name VARCHAR(255) NOT NULL,
  amount INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5.2 Update Webhook Handlers
In `app/routes/api.stripe-webhook.jsx`, replace the TODO comments with actual database operations:

```javascript
// Example implementation
async function handlePaymentSuccess(paymentIntent) {
  const metadata = paymentIntent.metadata;
  
  // Create or update user
  const user = await createOrUpdateUser({
    email: metadata.customerEmail,
    name: metadata.customerName,
    stripeCustomerId: paymentIntent.customer
  });
  
  // Record purchase
  await createPurchase({
    userId: user.id,
    stripePaymentIntentId: paymentIntent.id,
    softwareName: metadata.softwareName,
    amount: paymentIntent.amount,
    status: 'completed'
  });
  
  // Send confirmation email
  await sendPurchaseConfirmationEmail(user.email, {
    softwareName: metadata.softwareName,
    amount: paymentIntent.amount / 100
  });
}
```

## Step 6: Monitoring and Analytics

### 6.1 Stripe Dashboard
Monitor your payments in the Stripe Dashboard:

- **Payments**: Track successful and failed payments
- **Subscriptions**: Monitor subscription metrics
- **Customers**: View customer information
- **Analytics**: Revenue and growth metrics

### 6.2 Application Logging
Implement logging for:

- Payment attempts
- Webhook events
- Error conditions
- User actions

## Troubleshooting

### Common Issues

1. **"Stripe not initialized" error**
   - Check that `STRIPE_PUBLISHABLE_KEY` is set correctly
   - Verify the key is available in `window.ENV`

2. **Webhook signature verification fails**
   - Ensure `STRIPE_WEBHOOK_SECRET` is correct
   - Check that the webhook URL is accessible
   - Verify the endpoint is receiving POST requests

3. **Payment fails with "Invalid API key"**
   - Check that `STRIPE_SECRET_KEY` is set correctly
   - Ensure you're using the right key for your environment (test/live)

4. **Subscription creation fails**
   - Verify price IDs are correct
   - Check that products are active in Stripe
   - Ensure customer creation is working

### Getting Help

- **Stripe Documentation**: [stripe.com/docs](https://stripe.com/docs)
- **Stripe Support**: Available in your dashboard
- **Community**: Stack Overflow with `stripe-payments` tag

## Security Best Practices

1. **Never expose secret keys** in client-side code
2. **Always verify webhook signatures** before processing
3. **Use HTTPS** for all payment-related endpoints
4. **Validate all input** from webhooks and forms
5. **Log security events** for monitoring
6. **Keep dependencies updated** regularly

## Next Steps

After completing the setup:

1. **Test thoroughly** with various scenarios
2. **Implement user dashboard** for managing subscriptions
3. **Add email notifications** for payment events
4. **Set up monitoring** and alerts
5. **Plan for scaling** as your business grows

---

For additional help or questions about this integration, please refer to the Stripe documentation or contact support.

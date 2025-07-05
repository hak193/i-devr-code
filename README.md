# iDevrCode - Premium Developer Platform

A comprehensive platform for developers featuring a Software Store and AI App Builder with integrated Stripe payments, user management, and subscription handling.

## 🚀 Features

### Software Store
- **Premium Developer Tools**: Curated collection of templates, boilerplates, and tools
- **Secure Payments**: Stripe integration for one-time purchases
- **Instant Downloads**: Automated delivery after successful payment
- **User Dashboard**: Track purchases and download history

### AI App Builder
- **Subscription-Based Access**: Monthly/yearly plans with free trials
- **Multiple Build Types**: Web apps, mobile apps, APIs, and more
- **Framework Support**: React, Next.js, Vue, Node.js, and others
- **Project Management**: Save, edit, and deploy your builds

### Platform Features
- **Customizable Themes**: Tailor the look and feel of your app
- **User Authentication**: Secure user accounts and sessions
- **Payment Processing**: Full Stripe integration with webhooks
- **Database Management**: PostgreSQL with Prisma ORM
- **Responsive Design**: Mobile-first, modern UI
- **Admin Dashboard**: Manage users, subscriptions, and content
- **Analytics & Monitoring**: Track sales, usage, and performance

## 🛠️ Tech Stack

- **Frontend**: Remix, React, Tailwind CSS
- **Backend**: Node.js, Remix (Full-stack)
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe (subscriptions & one-time payments)
- **Authentication**: Custom session-based auth
- **Deployment**: Vercel, Railway, or Docker
- **Monitoring**: Sentry, health checks

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ installed
- **PostgreSQL** database (local or cloud)
- **Stripe Account** (test and live mode)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd i-devr-code

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate
```

### 2. Environment Setup

Create `.env` file in the root directory:

```env
# Database
DATABASE_URL="idevr-db.ctmq6umw42mp.us-east-2.rds.amazonaws.com"

# Session & Security
SESSION_SECRET="your-super-secure-session-secret-min-32-chars"

# Stripe (Test Mode)
STRIPE_PUBLISHABLE_KEY="pk_test_your_test_publishable_key"
STRIPE_SECRET_KEY="sk_test_your_test_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Stripe Price IDs (Test)
STRIPE_BUILDER_ACCESS_PRICE_ID="price_test_builder_access_id"
STRIPE_PRO_BUILDER_PRICE_ID="price_test_pro_builder_id"

# Application
NODE_ENV="development"
APP_URL="http://localhost:3000"
```

### 3. Database Setup

```bash
# Push schema to database
npx prisma db push

# Seed with sample data
npm run db:seed

# (Optional) View data in Prisma Studio
npx prisma studio
```

### 4. Stripe Configuration

1. **Create Stripe Products & Prices**:
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Create products for "Builder Access" and "Pro Builder"
   - Copy the price IDs to your `.env` file

2. **Setup Webhooks**:
   - Add webhook endpoint: `http://localhost:3000/api/stripe-webhook`
   - Select events: `payment_intent.succeeded`, `customer.subscription.*`, `invoice.*`
   - Copy webhook secret to `.env`

### 5. Start Development

```bash
# Start the development server
npm run dev

# The app will be available at http://localhost:3000
```

## 📁 Project Structure

```
i-devr-code/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── PaymentModal.jsx
│   ├── lib/                 # Utility libraries
│   │   ├── db.server.js     # Database utilities
│   │   ├── stripe.server.js # Stripe server utilities
│   │   └── stripe.client.js # Stripe client utilities
│   ├── routes/              # Application routes
│   │   ├── _index.jsx       # Homepage
│   │   ├── software.jsx     # Software store
│   │   ├── app-builder.jsx  # AI App Builder
│   │   ├── dashboard.jsx    # User dashboard
│   │   └── api/             # API endpoints
│   ├── styles/              # CSS styles
│   └── root.jsx             # Root component
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.js              # Database seeding
├── public/                  # Static assets
├── docs/                    # Documentation
│   ├── STRIPE_SETUP.md      # Stripe integration guide
│   └── PRODUCTION_DEPLOYMENT_GUIDE.md
└── package.json
```

## 🎯 Key Routes

- **`/`** - Homepage with platform overview
- **`/software`** - Software store with products
- **`/app-builder`** - AI App Builder with subscription plans
- **`/dashboard`** - User dashboard (requires authentication)
- **`/payment-success`** - Payment confirmation page
- **`/api/create-payment`** - Payment processing endpoint
- **`/api/stripe-webhook`** - Stripe webhook handler

## 💳 Payment Flow

### One-time Purchases (Software Store)
1. User selects software product
2. Payment modal opens with Stripe Elements
3. User enters payment details
4. Payment processed via `/api/create-payment`
5. Webhook confirms payment success
6. User redirected to success page
7. Download access granted

### Subscriptions (App Builder)
1. User selects subscription plan
2. Stripe Checkout session created
3. User completes payment on Stripe
4. Webhook creates subscription record
5. User gains access to App Builder features
6. Recurring billing handled automatically

## 🗄️ Database Schema

### Core Models
- **User**: User accounts and profiles
- **Subscription**: App Builder subscriptions
- **Purchase**: Software store purchases
- **Software**: Product catalog
- **AppBuild**: User's app builder projects
- **PaymentEvent**: Webhook event logging
- **Setting**: System configuration

### Key Relationships
- User → Subscriptions (1:many)
- User → Purchases (1:many)
- User → AppBuilds (1:many)
- Software → Purchases (1:many)

## 🔧 Development Commands

```bash
# Database
npm run db:seed          # Seed database with sample data
npm run db:reset         # Reset and reseed database
npm run db:push          # Push schema changes and seed

# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Utilities
npm run lint             # Run ESLint
npx prisma studio        # Open database browser
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Software store displays products
- [ ] Payment modal opens and functions
- [ ] Test payments work (use Stripe test cards)
- [ ] Subscription signup works
- [ ] Dashboard shows user data
- [ ] Webhooks process correctly

### Test Payment Cards

```
# Successful payment
4242 4242 4242 4242

# Declined payment
4000 0000 0000 0002

# Requires authentication
4000 0025 0000 3155
```

## 🚀 Production Deployment

For detailed production deployment instructions, see [PRODUCTION_DEPLOYMENT_GUIDE.md](./PRODUCTION_DEPLOYMENT_GUIDE.md).

### Quick Production Checklist

- [ ] Environment variables configured
- [ ] Database deployed and migrated
- [ ] Stripe live mode configured
- [ ] Domain and SSL setup
- [ ] Monitoring configured
- [ ] Backup strategy implemented

## 📊 Monitoring & Analytics

### Health Checks
- **`/health`** - Application health status
- Database connectivity
- Stripe API connectivity
- System resource usage

### Key Metrics to Track
- Payment success/failure rates
- Subscription churn rate
- Software download counts
- User registration trends
- Revenue analytics

## 🔒 Security Features

- **Input Validation**: All user inputs validated
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: API endpoint protection
- **Secure Headers**: Security headers configured
- **Environment Variables**: Sensitive data protection
- **Webhook Verification**: Stripe webhook signature validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues

1. **Database Connection Errors**
   - Check DATABASE_URL format
   - Ensure PostgreSQL is running
   - Verify credentials

2. **Stripe Payment Failures**
   - Verify API keys are correct
   - Check webhook endpoint URL
   - Ensure webhook secret matches

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify environment variables

### Getting Help

- **Documentation**: Check the `/docs` folder
- **Issues**: Open a GitHub issue
- **Discussions**: Use GitHub Discussions
- **Email**: support@idevrcode.com

## 🎉 What's Next?

### Planned Features
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] API marketplace
- [ ] Mobile app
- [ ] Advanced AI features
- [ ] Integration marketplace

### Scaling Considerations
- Database optimization and indexing
- CDN for static assets
- Redis for caching
- Load balancing
- Microservices architecture
- Advanced monitoring and alerting

---

**Built with ❤️ by the iDevrCode team**

Ready to revolutionize your development workflow? Get started today!
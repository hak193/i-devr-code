# Production Deployment Guide - iDevrCode Platform

This comprehensive guide will walk you through deploying the iDevrCode platform to production with full Stripe integration, database setup, and monitoring.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Environment Configuration](#environment-configuration)
4. [Stripe Configuration](#stripe-configuration)
5. [Application Deployment](#application-deployment)
6. [Domain & SSL Setup](#domain--ssl-setup)
7. [Monitoring & Logging](#monitoring--logging)
8. [Security Hardening](#security-hardening)
9. [Testing & Validation](#testing--validation)
10. [Maintenance & Updates](#maintenance--updates)

## Prerequisites

### Required Accounts & Services
- [ ] **Hosting Provider** (Vercel, Railway, Render, or VPS)
- [ ] **Database Provider** (Supabase, PlanetScale, or PostgreSQL instance)
- [ ] **Stripe Account** (with live mode enabled)
- [ ] **Domain Name** (for production URL)
- [ ] **Email Service** (SendGrid, Mailgun, or similar)
- [ ] **Monitoring Service** (Sentry, LogRocket, or similar)

### Development Environment
- [ ] Node.js 18+ installed
- [ ] Git repository set up
- [ ] Local development working
- [ ] All tests passing

## Database Setup

### Option 1: Supabase (Recommended)

1. **Create Supabase Project**
   ```bash
   # Visit https://supabase.com
   # Create new project
   # Note down your database URL
   ```

2. **Configure Database**
   ```bash
   # Install Supabase CLI
   npm install -g supabase
   
   # Login to Supabase
   supabase login
   
   # Link your project
   supabase link --project-ref your-project-ref
   ```

3. **Run Migrations**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   
   # Seed initial data (optional)
   npx prisma db seed
   ```

### Option 2: PlanetScale

1. **Create PlanetScale Database**
   ```bash
   # Install PlanetScale CLI
   curl -fsSL https://github.com/planetscale/cli/releases/latest/download/pscale_linux_amd64.tar.gz | tar -xz pscale
   
   # Login
   pscale auth login
   
   # Create database
   pscale database create idevrcode-prod
   
   # Create branch
   pscale branch create idevrcode-prod main
   ```

2. **Configure Connection**
   ```bash
   # Get connection string
   pscale connect idevrcode-prod main --port 3309
   
   # Update DATABASE_URL in .env
   DATABASE_URL="mysql://root@127.0.0.1:3309/idevrcode-prod"
   ```

### Option 3: Self-Hosted PostgreSQL

1. **Install PostgreSQL**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   
   # Start service
   sudo systemctl start postgresql
   sudo systemctl enable postgresql
   ```

2. **Create Database**
   ```sql
   -- Connect as postgres user
   sudo -u postgres psql
   
   -- Create database and user
   CREATE DATABASE idevrcode_prod;
   CREATE USER idevrcode_user WITH PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE idevrcode_prod TO idevrcode_user;
   ```

3. **Configure Connection**
   ```bash
   # Update DATABASE_URL
   DATABASE_URL="postgresql://idevrcode_user:your_secure_password@localhost:5432/idevrcode_prod"
   ```

### Database Schema Deployment

```bash
# Generate Prisma client
npx prisma generate

# Deploy schema
npx prisma db push

# Verify deployment
npx prisma studio
```

### Initial Data Seeding

Create `prisma/seed.js`:

```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample software
  const software1 = await prisma.software.create({
    data: {
      name: 'React Dashboard Template',
      description: 'Professional React dashboard with authentication and charts',
      price: 4900, // $49.00
      category: 'Templates',
      tags: ['React', 'Dashboard', 'Admin'],
      downloadUrl: 'https://your-cdn.com/downloads/react-dashboard.zip',
      featured: true,
    },
  });

  const software2 = await prisma.software.create({
    data: {
      name: 'E-commerce Starter Kit',
      description: 'Complete e-commerce solution with payment integration',
      price: 9900, // $99.00
      category: 'Starter Kits',
      tags: ['E-commerce', 'Stripe', 'Next.js'],
      downloadUrl: 'https://your-cdn.com/downloads/ecommerce-kit.zip',
      featured: true,
    },
  });

  // Create system settings
  await prisma.setting.createMany({
    data: [
      { key: 'site_name', value: 'iDevrCode' },
      { key: 'support_email', value: 'support@idevrcode.com' },
      { key: 'maintenance_mode', value: 'false' },
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Run seeding:
```bash
npx prisma db seed
```

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```env
# Application
NODE_ENV=production
PORT=3000
APP_URL=https://your-domain.com

# Database
DATABASE_URL=your_production_database_url

# Session & Security
SESSION_SECRET=your_super_secure_session_secret_min_32_chars
ENCRYPTION_KEY=your_32_character_encryption_key_here

# Stripe (Live Mode)
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret

# Stripe Price IDs (Live)
STRIPE_BUILDER_ACCESS_PRICE_ID=price_live_builder_access_id
STRIPE_PRO_BUILDER_PRICE_ID=price_live_pro_builder_id

# Email Service (Choose one)
# SendGrid
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@your-domain.com

# Mailgun
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your-domain.com

# Monitoring
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=info

# File Storage (Optional)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_BUCKET_NAME=your-s3-bucket
AWS_REGION=us-east-1

# Redis (Optional - for caching)
REDIS_URL=redis://your-redis-instance:6379
```

### Environment Variable Security

```bash
# Generate secure secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Validate environment variables
node -e "
const required = [
  'DATABASE_URL',
  'SESSION_SECRET',
  'STRIPE_SECRET_KEY',
  'STRIPE_PUBLISHABLE_KEY'
];
required.forEach(key => {
  if (!process.env[key]) {
    console.error(\`Missing required environment variable: \${key}\`);
    process.exit(1);
  }
});
console.log('All required environment variables are set');
"
```

## Stripe Configuration

### Live Mode Setup

1. **Switch to Live Mode**
   - Go to Stripe Dashboard
   - Toggle to "Live mode"
   - Complete account verification if required

2. **Create Live Products & Prices**
   ```bash
   # Use Stripe CLI to create products
   stripe products create \
     --name "Builder Access" \
     --description "Access to AI App Builder with basic features"
   
   stripe prices create \
     --product prod_your_product_id \
     --unit-amount 2900 \
     --currency usd \
     --recurring interval=month \
     --trial-period-days 7
   ```

3. **Configure Webhooks**
   - Endpoint URL: `https://your-domain.com/api/stripe-webhook`
   - Events to send:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

4. **Test Webhook Endpoint**
   ```bash
   # Test webhook locally first
   stripe listen --forward-to localhost:3000/api/stripe-webhook
   
   # Test production webhook
   curl -X POST https://your-domain.com/api/stripe-webhook \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
   ```

## Application Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Configure Vercel**
   ```json
   // vercel.json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/remix"
       }
     ],
     "env": {
       "DATABASE_URL": "@database-url",
       "STRIPE_SECRET_KEY": "@stripe-secret-key",
       "STRIPE_PUBLISHABLE_KEY": "@stripe-publishable-key",
       "SESSION_SECRET": "@session-secret"
     }
   }
   ```

3. **Deploy**
   ```bash
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel --prod
   
   # Set environment variables
   vercel env add DATABASE_URL production
   vercel env add STRIPE_SECRET_KEY production
   # ... add all other env vars
   ```

### Option 2: Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy**
   ```bash
   # Login
   railway login
   
   # Initialize project
   railway init
   
   # Deploy
   railway up
   
   # Set environment variables
   railway variables set DATABASE_URL=your_database_url
   railway variables set STRIPE_SECRET_KEY=your_stripe_key
   ```

### Option 3: Docker + VPS

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   # Copy package files
   COPY package*.json ./
   COPY prisma ./prisma/
   
   # Install dependencies
   RUN npm ci --only=production
   
   # Generate Prisma client
   RUN npx prisma generate
   
   # Copy application code
   COPY . .
   
   # Build application
   RUN npm run build
   
   # Expose port
   EXPOSE 3000
   
   # Start application
   CMD ["npm", "start"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   
   services:
     app:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NODE_ENV=production
         - DATABASE_URL=${DATABASE_URL}
         - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
       depends_on:
         - postgres
       restart: unless-stopped
   
     postgres:
       image: postgres:15
       environment:
         POSTGRES_DB: idevrcode
         POSTGRES_USER: idevrcode
         POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
       volumes:
         - postgres_data:/var/lib/postgresql/data
       restart: unless-stopped
   
     nginx:
       image: nginx:alpine
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./nginx.conf:/etc/nginx/nginx.conf
         - ./ssl:/etc/nginx/ssl
       depends_on:
         - app
       restart: unless-stopped
   
   volumes:
     postgres_data:
   ```

3. **Deploy**
   ```bash
   # Build and start
   docker-compose up -d
   
   # Check logs
   docker-compose logs -f app
   ```

## Domain & SSL Setup

### DNS Configuration

```bash
# A Record
your-domain.com -> your_server_ip

# CNAME Records
www.your-domain.com -> your-domain.com
api.your-domain.com -> your-domain.com
```

### SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/idevrcode
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Monitoring & Logging

### Application Monitoring with Sentry

1. **Install Sentry**
   ```bash
   npm install @sentry/remix
   ```

2. **Configure Sentry**
   ```javascript
   // app/entry.client.jsx
   import * as Sentry from "@sentry/remix";
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });
   ```

3. **Error Tracking**
   ```javascript
   // app/lib/logger.js
   import * as Sentry from "@sentry/remix";
   
   export function logError(error, context = {}) {
     console.error(error);
     Sentry.captureException(error, { extra: context });
   }
   
   export function logInfo(message, data = {}) {
     console.log(message, data);
     if (process.env.NODE_ENV === 'production') {
       Sentry.addBreadcrumb({
         message,
         data,
         level: 'info',
       });
     }
   }
   ```

### Health Check Endpoint

```javascript
// app/routes/health.jsx
import { json } from "@remix-run/node";
import { prisma } from "~/lib/db.server";

export const loader = async () => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check Stripe connection
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    await stripe.balance.retrieve();
    
    return json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        stripe: 'connected',
      },
    });
  } catch (error) {
    return json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
    }, { status: 503 });
  }
};
```

### Log Management

```bash
# Install PM2 for process management
npm install -g pm2

# Create ecosystem file
# ecosystem.config.js
module.exports = {
  apps: [{
    name: 'idevrcode',
    script: 'npm',
    args: 'start',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    log_file: '/var/log/idevrcode/combined.log',
    out_file: '/var/log/idevrcode/out.log',
    error_file: '/var/log/idevrcode/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## Security Hardening

### Application Security

1. **Rate Limiting**
   ```javascript
   // app/lib/rate-limit.js
   import { LRUCache } from 'lru-cache';
   
   const cache = new LRUCache({
     max: 1000,
     ttl: 60000, // 1 minute
   });
   
   export function rateLimit(identifier, limit = 10) {
     const key = `rate_limit:${identifier}`;
     const current = cache.get(key) || 0;
     
     if (current >= limit) {
       return false;
     }
     
     cache.set(key, current + 1);
     return true;
   }
   ```

2. **Input Validation**
   ```javascript
   // app/lib/validation.js
   import { z } from 'zod';
   
   export const paymentSchema = z.object({
     email: z.string().email(),
     name: z.string().min(2).max(100),
     amount: z.number().positive(),
   });
   
   export const subscriptionSchema = z.object({
     email: z.string().email(),
     name: z.string().min(2).max(100),
     planId: z.enum(['builder-access', 'pro-builder']),
   });
   ```

3. **CSRF Protection**
   ```javascript
   // app/lib/csrf.js
   import crypto from 'crypto';
   
   export function generateCSRFToken() {
     return crypto.randomBytes(32).toString('hex');
   }
   
   export function validateCSRFToken(token, sessionToken) {
     return crypto.timingSafeEqual(
       Buffer.from(token, 'hex'),
       Buffer.from(sessionToken, 'hex')
     );
   }
   ```

### Server Security

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Configure firewall
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# Secure SSH
sudo nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no
# Set: PermitRootLogin no
sudo systemctl restart ssh

# Install fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## Testing & Validation

### Pre-deployment Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Stripe webhooks configured and tested
- [ ] SSL certificate installed
- [ ] Health check endpoint responding
- [ ] Error monitoring configured
- [ ] Backup strategy implemented

### Automated Testing

```bash
# Run all tests
npm test

# Test database connection
npm run test:db

# Test Stripe integration
npm run test:stripe

# Load testing
npx artillery quick --count 10 --num 100 https://your-domain.com
```

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Software store displays products
- [ ] Payment modal opens and functions
- [ ] Stripe payment processing works
- [ ] Subscription signup works
- [ ] Dashboard displays user data
- [ ] Webhook events are processed
- [ ] Email notifications sent (if configured)

## Maintenance & Updates

### Backup Strategy

```bash
# Database backup script
#!/bin/bash
# backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/database"
DB_NAME="idevrcode_prod"

mkdir -p $BACKUP_DIR

# PostgreSQL backup
pg_dump $DATABASE_URL > $BACKUP_DIR/backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/backup_$DATE.sql

# Remove backups older than 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Database backup completed: backup_$DATE.sql.gz"
```

### Update Process

```bash
# 1. Backup current version
git tag v$(date +%Y%m%d_%H%M%S)

# 2. Pull latest changes
git pull origin main

# 3. Install dependencies
npm ci

# 4. Run database migrations
npx prisma db push

# 5. Build application
npm run build

# 6. Restart application
pm2 restart idevrcode

# 7. Verify deployment
curl -f https://your-domain.com/health || echo "Health check failed"
```

### Monitoring Alerts

```bash
# Create monitoring script
#!/bin/bash
# monitor.sh

# Check if application is running
if ! curl -f https://your-domain.com/health > /dev/null 2>&1; then
    echo "Application health check failed" | mail -s "iDevrCode Alert" admin@your-domain.com
fi

# Check disk space
DISK_USAGE=$(df / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
    echo "Disk usage is at ${DISK_USAGE}%" | mail -s "Disk Space Alert" admin@your-domain.com
fi

# Add to crontab
# */5 * * * * /path/to/monitor.sh
```

## Final Deployment Steps

### 1. Pre-deployment Verification

```bash
# Verify all environment variables
node -e "
const required = [
  'DATABASE_URL', 'STRIPE_SECRET_KEY', 'STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET', 'SESSION_SECRET'
];
const missing = required.filter(key => !process.env[key]);
if (missing.length) {
  console.error('Missing variables:', missing);
  process.exit(1);
}
console.log('✅ All environment variables set');
"

# Test database connection
npx prisma db push --accept-data-loss

# Verify Stripe configuration
node -e "
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
stripe.balance.retrieve().then(() => console.log('✅ Stripe connected'));
"
```

### 2. Deploy Application

```bash
# Build for production
npm run build

# Deploy to your chosen platform
# Vercel: vercel --prod
# Railway: railway up
# Docker: docker-compose up -d
```

### 3. Post-deployment Verification

```bash
# Test endpoints
curl -f https://your-domain.com/health
curl -f https://your-domain.com/
curl -f https://your-domain.com/software

# Test Stripe webhook
stripe events resend evt_test_webhook --webhook-endpoint https://your-domain.com/api/stripe-webhook
```

### 4. Go Live Checklist

- [ ] Domain pointing to production server
- [ ] SSL certificate active
- [ ] All environment variables set
- [ ] Database schema deployed
- [ ] Stripe live mode configured
- [ ] Webhooks receiving events
- [ ] Monitoring and alerts active
- [ ] Backup system running
- [ ] Error tracking configured

## Support & Troubleshooting

### Common Issues

1. **Database Connection Errors**
   ```bash
   # Check connection string
   echo $DATABASE_URL
   
   # Test connection
   npx prisma db push
   ```

2. **Stripe Webhook Failures**
   ```bash
   # Check webhook endpoint
   curl -X POST https://your-domain.com/api/stripe-webhook
   
   # Verify webhook secret
   echo $STRIPE_WEBHOOK_SECRET
   ```

3. **Build Failures**
   ```bash
   # Clear cache and rebuild
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

### Getting Help

- **Documentation**: Check the README and inline comments
- **Logs**: Review application and server logs
- **Monitoring**: Check Sentry for error details
- **Stripe**: Use Stripe Dashboard for payment issues
- **Community**: Stack Overflow with relevant tags

---

**Congratulations!** Your iDevrCode platform is now production-ready with full payment processing, user management, and monitoring capabilities.

For ongoing maintenance, regularly update dependencies, monitor performance metrics, and backup your data. The platform is designed to scale with your business needs.
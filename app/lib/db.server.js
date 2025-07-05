import { PrismaClient } from '@prisma/client';


const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Helper functions for database operations

// User operations
export async function createOrUpdateUser({ email, name, stripeCustomerId }) {
  return await prisma.user.upsert({
    where: { email },
    update: {
      name,
      stripeCustomerId: stripeCustomerId || undefined,
    },
    create: {
      email,
      name,
      stripeCustomerId,
    },
  });
}

export async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      subscriptions: true,
      purchases: true,
    },
  });
}

export async function getUserByStripeCustomerId(stripeCustomerId) {
  return await prisma.user.findUnique({
    where: { stripeCustomerId },
    include: {
      subscriptions: true,
      purchases: true,
    },
  });
}

// Subscription operations
export async function createSubscription({
  userId,
  stripeSubscriptionId,
  stripePriceId,
  planType,
  status,
  currentPeriodStart,
  currentPeriodEnd,
  trialStart,
  trialEnd,
}) {
  return await prisma.subscription.create({
    data: {
      userId,
      stripeSubscriptionId,
      stripePriceId,
      planType,
      status,
      currentPeriodStart,
      currentPeriodEnd,
      trialStart,
      trialEnd,
    },
  });
}

export async function updateSubscription(stripeSubscriptionId, data) {
  return await prisma.subscription.update({
    where: { stripeSubscriptionId },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
}

export async function getActiveSubscription(userId) {
  return await prisma.subscription.findFirst({
    where: {
      userId,
      status: {
        in: ['active', 'trialing'],
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

// Purchase operations
export async function createPurchase({
  userId,
  stripePaymentIntentId,
  softwareId,
  softwareName,
  amount,
  status = 'completed',
}) {
  return await prisma.purchase.create({
    data: {
      userId,
      stripePaymentIntentId,
      softwareId,
      softwareName,
      amount,
      status,
    },
  });
}

export async function getUserPurchases(userId) {
  return await prisma.purchase.findMany({
    where: { userId },
    include: {
      software: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

// Software operations
export async function getAllSoftware() {
  return await prisma.software.findMany({
    where: { isActive: true },
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' },
    ],
  });
}

export async function getSoftwareById(id) {
  return await prisma.software.findUnique({
    where: { id },
  });
}

export async function createSoftware({
  name,
  description,
  price,
  category,
  tags = [],
  imageUrl,
  downloadUrl,
  version = '1.0.0',
}) {
  return await prisma.software.create({
    data: {
      name,
      description,
      price,
      category,
      tags,
      imageUrl,
      downloadUrl,
      version,
    },
  });
}

// App Build operations
export async function createAppBuild({
  userId,
  name,
  description,
  config,
  buildType,
  framework,
}) {
  return await prisma.appBuild.create({
    data: {
      userId,
      name,
      description,
      config,
      status: 'draft',
      buildType,
      framework,
    },
  });
}

export async function updateAppBuild(id, data) {
  return await prisma.appBuild.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
  });
}

export async function getUserAppBuilds(userId) {
  return await prisma.appBuild.findMany({
    where: { userId },
    orderBy: {
      updatedAt: 'desc',
    },
  });
}

// Payment Event operations (for webhook audit trail)
export async function createPaymentEvent({
  stripeEventId,
  eventType,
  customerId,
  subscriptionId,
  paymentIntentId,
  amount,
  status,
  metadata,
}) {
  return await prisma.paymentEvent.create({
    data: {
      stripeEventId,
      eventType,
      customerId,
      subscriptionId,
      paymentIntentId,
      amount,
      status,
      metadata,
    },
  });
}

export async function markPaymentEventProcessed(stripeEventId) {
  return await prisma.paymentEvent.update({
    where: { stripeEventId },
    data: { processed: true },
  });
}

// Settings operations
export async function getSetting(key) {
  const setting = await prisma.setting.findUnique({
    where: { key },
  });
  return setting?.value;
}

export async function setSetting(key, value) {
  return await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

// Cleanup function for graceful shutdown
export async function disconnectPrisma() {
  await prisma.$disconnect();
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample software products
  console.log('📦 Creating software products...');
  
  const software1 = await prisma.software.upsert({
    where: { name: 'React Dashboard Template' },
    update: {},
    create: {
      name: 'React Dashboard Template',
      description: 'Professional React dashboard with authentication, charts, and responsive design. Perfect for admin panels and business applications.',
      price: 4900, // $49.00
      category: 'Templates',
      tags: ['React', 'Dashboard', 'Admin', 'TypeScript', 'Tailwind'],
      imageUrl: '/images/software/react-dashboard.jpg',
      downloadUrl: 'https://cdn.idevrcode.com/downloads/react-dashboard-v1.zip',
      version: '1.2.0',
      featured: true,
    },
  });

  const software2 = await prisma.software.upsert({
    where: { name: 'E-commerce Starter Kit' },
    update: {},
    create: {
      name: 'E-commerce Starter Kit',
      description: 'Complete e-commerce solution with Stripe integration, product management, and order processing. Built with Next.js and Prisma.',
      price: 9900, // $99.00
      category: 'Starter Kits',
      tags: ['E-commerce', 'Stripe', 'Next.js', 'Prisma', 'Full-stack'],
      imageUrl: '/images/software/ecommerce-kit.jpg',
      downloadUrl: 'https://cdn.idevrcode.com/downloads/ecommerce-starter-v2.zip',
      version: '2.1.0',
      featured: true,
    },
  });

  const software3 = await prisma.software.upsert({
    where: { name: 'SaaS Boilerplate' },
    update: {},
    create: {
      name: 'SaaS Boilerplate',
      description: 'Production-ready SaaS boilerplate with authentication, billing, team management, and multi-tenancy support.',
      price: 19900, // $199.00
      category: 'Boilerplates',
      tags: ['SaaS', 'Authentication', 'Billing', 'Multi-tenant', 'Enterprise'],
      imageUrl: '/images/software/saas-boilerplate.jpg',
      downloadUrl: 'https://cdn.idevrcode.com/downloads/saas-boilerplate-v3.zip',
      version: '3.0.0',
      featured: true,
    },
  });

  const software4 = await prisma.software.upsert({
    where: { name: 'Mobile App UI Kit' },
    update: {},
    create: {
      name: 'Mobile App UI Kit',
      description: 'Comprehensive React Native UI kit with 50+ screens, components, and animations. iOS and Android compatible.',
      price: 7900, // $79.00
      category: 'UI Kits',
      tags: ['React Native', 'Mobile', 'UI Kit', 'iOS', 'Android'],
      imageUrl: '/images/software/mobile-ui-kit.jpg',
      downloadUrl: 'https://cdn.idevrcode.com/downloads/mobile-ui-kit-v1.zip',
      version: '1.0.0',
      featured: false,
    },
  });

  const software5 = await prisma.software.upsert({
    where: { name: 'API Documentation Generator' },
    update: {},
    create: {
      name: 'API Documentation Generator',
      description: 'Automated API documentation generator with interactive examples, authentication, and deployment tools.',
      price: 3900, // $39.00
      category: 'Tools',
      tags: ['API', 'Documentation', 'OpenAPI', 'Swagger', 'Automation'],
      imageUrl: '/images/software/api-docs-generator.jpg',
      downloadUrl: 'https://cdn.idevrcode.com/downloads/api-docs-generator-v1.zip',
      version: '1.1.0',
      featured: false,
    },
  });

  const software6 = await prisma.software.upsert({
    where: { name: 'Landing Page Builder' },
    update: {},
    create: {
      name: 'Landing Page Builder',
      description: 'Drag-and-drop landing page builder with conversion optimization, A/B testing, and analytics integration.',
      price: 12900, // $129.00
      category: 'Tools',
      tags: ['Landing Page', 'Builder', 'Conversion', 'A/B Testing', 'Analytics'],
      imageUrl: '/images/software/landing-page-builder.jpg',
      downloadUrl: 'https://cdn.idevrcode.com/downloads/landing-page-builder-v2.zip',
      version: '2.0.0',
      featured: false,
    },
  });

  console.log('✅ Software products created');

  // Create system settings
  console.log('⚙️ Creating system settings...');
  
  const settings = [
    { key: 'site_name', value: 'iDevrCode' },
    { key: 'site_description', value: 'Premium Developer Tools & Resources' },
    { key: 'support_email', value: 'support@idevrcode.com' },
    { key: 'contact_email', value: 'hello@idevrcode.com' },
    { key: 'maintenance_mode', value: 'false' },
    { key: 'featured_software_limit', value: '6' },
    { key: 'trial_period_days', value: '7' },
    { key: 'currency', value: 'USD' },
    { key: 'tax_rate', value: '0.0875' }, // 8.75% tax rate
    { key: 'free_trial_enabled', value: 'true' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  console.log('✅ System settings created');

  // Create demo user (for testing)
  if (process.env.NODE_ENV === 'development') {
    console.log('👤 Creating demo user...');
    
    const demoUser = await prisma.user.upsert({
      where: { email: 'demo@idevrcode.com' },
      update: {},
      create: {
        email: 'demo@idevrcode.com',
        name: 'Demo User',
        stripeCustomerId: null,
      },
    });

    // Create demo purchase
    await prisma.purchase.upsert({
      where: { stripePaymentIntentId: 'pi_demo_payment_intent' },
      update: {},
      create: {
        userId: demoUser.id,
        stripePaymentIntentId: 'pi_demo_payment_intent',
        softwareId: software1.id,
        softwareName: software1.name,
        amount: software1.price,
        status: 'completed',
      },
    });

    // Create demo app build
    await prisma.appBuild.upsert({
      where: { id: 'demo_app_build_1' },
      update: {},
      create: {
        id: 'demo_app_build_1',
        userId: demoUser.id,
        name: 'My First App',
        description: 'A demo app built with the AI App Builder',
        config: {
          type: 'web',
          framework: 'react',
          features: ['authentication', 'database', 'api'],
          styling: 'tailwind',
          deployment: 'vercel',
        },
        status: 'completed',
        buildType: 'web',
        framework: 'react',
        sourceCode: '// Demo source code would be here',
      },
    });

    console.log('✅ Demo user and data created');
  }

  // Display summary
  const softwareCount = await prisma.software.count();
  const userCount = await prisma.user.count();
  const settingsCount = await prisma.setting.count();

  console.log('\n🎉 Database seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`   • ${softwareCount} software products`);
  console.log(`   • ${userCount} users`);
  console.log(`   • ${settingsCount} system settings`);
  
  if (process.env.NODE_ENV === 'development') {
    console.log('\n🔗 Demo URLs:');
    console.log('   • Dashboard: http://localhost:3000/dashboard?email=demo@idevrcode.com');
    console.log('   • Software Store: http://localhost:3000/software');
    console.log('   • App Builder: http://localhost:3000/app-builder');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
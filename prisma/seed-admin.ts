import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';

const prisma = new PrismaClient();

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@aniss-electromenager.com' },
  });

  if (existingAdmin) {
    console.log('⚠️  Admin user already exists');
    console.log('Email: admin@aniss-electromenager.com');
    return;
  }

  // Create admin user using Better Auth signUp
  try {
    await auth.api.signUpEmail({
      body: {
        email: 'admin@aniss-electromenager.com',
        password: 'admin123',
        name: 'Admin Aniss',
      },
    });

    // Update user role to ADMIN
    await prisma.user.update({
      where: { email: 'admin@aniss-electromenager.com' },
      data: { role: 'ADMIN', emailVerified: true },
    });

    console.log('✅ Admin user created with Better Auth:');
    console.log('Email: admin@aniss-electromenager.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

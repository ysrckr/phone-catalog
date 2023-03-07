import { prisma } from '../src/setup/dbConnection';

async function main() {
  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password: 'admin',
      name: 'Admin',
      role: 'ADMIN',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

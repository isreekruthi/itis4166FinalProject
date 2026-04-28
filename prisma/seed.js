import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  // USERS
  const admin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const member = await prisma.user.create({
    data: {
      name: 'Member User',
      email: 'member@example.com',
      password: hashedPassword,
      role: 'MEMBER',
    },
  });

  // AUTHORS
  const author1 = await prisma.author.create({
    data: {
      name: 'J.K. Rowling',
      bio: 'Harry Potter author',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: 'George Orwell',
      bio: '1984 author',
    },
  });

  // BOOKS
  const book1 = await prisma.book.create({
    data: {
      title: 'Harry Potter',
      description: 'Fantasy book',
      isbn: '111',
      publishedDate: new Date(),
      authorId: author1.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: '1984',
      description: 'Dystopian novel',
      isbn: '222',
      publishedDate: new Date(),
      authorId: author2.id,
    },
  });

  // BORROWINGS
  await prisma.borrowing.create({
    data: {
      userId: member.id,
      bookId: book1.id,
      status: 'BORROWED',
    },
  });

  console.log('🌱 Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

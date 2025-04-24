const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.training.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.user.deleteMany();

  const alice = await prisma.user.create({
    data: {
      first_name: 'Alice',
      last_name: 'Runner',
      email: 'alice@example.com',
      birthday: new Date('1990-01-01'),
    },
  });

  const bob = await prisma.user.create({
    data: {
      first_name: 'Bob',
      last_name: 'Biker',
      email: 'bob@example.com',
      birthday: new Date('1988-07-07'),
    },
  });

  // Тренировки
  const aliceTraning = await prisma.training.create({
    data: {
      user_id: alice.id,
      title: 'Утренний бег',
      type: 'RUN',
      distance: 5.2,
      duration: 30.0,
      is_public: true,
    },
  });
  
  const bobTraning = await prisma.training.create({
    data: {
      user_id: bob.id,
      title: 'Велопокатушка',
      type: 'BIKE',
      distance: 20.5,
      duration: 60.0,
      is_public: false,
    },
  });  

  await prisma.comment.createMany({
    data: [
      {
        content: "Good time bro!",
        author_id: alice.id,
        training_id: bobTraning.id
      },
      {
        content: "Where is it? Looks greate",
        author_id: bob.id,
        training_id: aliceTraning.id
      }
    ]
  });

  console.log('✅ Seed completed.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

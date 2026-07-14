import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@sportstore.com' },
    update: {},
    create: {
      name: 'Admin Giang',
      email: 'admin@sportstore.com',
      password: 'password123',
      role: 'Admin',
    },
  })

  const badminton = await prisma.category.upsert({
    where: { slug: 'do-cau-long' },
    update: {},
    create: { name: 'Đồ Cầu Lông', slug: 'do-cau-long' },
  })

  const votCauLong = await prisma.category.upsert({
    where: { slug: 'vot-cau-long' },
    update: {},
    create: { name: 'Vợt Cầu Lông', slug: 'vot-cau-long', parentId: badminton.id },
  })


  const tennis = await prisma.category.upsert({
    where: { slug: 'tennis' },
    update: {},
    create: { name: 'Tennis', slug: 'tennis' },
  })

  const votTennis = await prisma.category.upsert({
    where: { slug: 'vot-tennis' },
    update: {},
    create: { name: 'Vợt Tennis', slug: 'vot-tennis', parentId: tennis.id },
  })

  const pickleball = await prisma.category.upsert({
    where: { slug: 'pickleball' },
    update: {},
    create: { name: 'Pickleball', slug: 'pickleball' },
  })

  const votPickleball = await prisma.category.upsert({
    where: { slug: 'vot-pickleball' },
    update: {},
    create: { name: 'Vợt Pickleball', slug: 'vot-pickleball', parentId: pickleball.id },
  })

  const categoryIds = [votCauLong.id, votTennis.id, votPickleball.id]

  const tenSanPhamNgon = [
    'Vợt Cầu Lông Yonex Astrox 99', 'Vợt Cầu Lông Victor Thruster K', 'Vợt Cầu Lông Lining Aeronaut 9000',
    'Vợt Yonex Nanoflare 800', 'Vợt Lining Calibar 900C', 'Vợt Victor DriveX 9X',
    'Vợt Tennis Wilson Pro Staff', 'Vợt Tennis Babolat Pure Drive', 'Vợt Tennis Head Speed',
    'Vợt Pickleball Joola', 'Vợt Pickleball Selkirk', 'Vợt Pickleball CRBN',
    'Giày Cầu Lông Yonex Eclipsion', 'Giày Cầu Lông Lining', 'Giày Cầu Lông Victor',
    'Bao Vợt Yonex', 'Bóng Tennis Wilson', 'Bóng Pickleball Franklin', 'Lưới cầu lông Yonex'
  ]


  for (let i = 0; i < 30; i++) {
    await prisma.product.create({
      data: {
        title: faker.helpers.arrayElement(tenSanPhamNgon),
        price: parseFloat(faker.commerce.price({ min: 100, max: 2000 })),
        categoryId: faker.helpers.arrayElement(categoryIds),
      },
    })
  }

}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })

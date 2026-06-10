import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // 1. Tạo tài khoản Admin mẫu để test hệ thống
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

  // 2. Tạo Danh mục Cha: Đồ Cầu Lông
  const badminton = await prisma.category.upsert({
    where: { slug: 'do-cau-long' },
    update: {},
    create: { name: 'Đồ Cầu Lông', slug: 'do-cau-long' },
  })

  // 3. Tạo Danh mục Con: Vợt Cầu Lông
  await prisma.category.upsert({
    where: { slug: 'vot-cau-long' },
    update: {},
    create: { name: 'Vợt Cầu Lông', slug: 'vot-cau-long', parentId: badminton.id },
  })

  // 4. Tạo Danh mục Cha: Đồ Billiards
  const billiards = await prisma.category.upsert({
    where: { slug: 'do-billiards' },
    update: {},
    create: { name: 'Đồ Billiards', slug: 'do-billiards' },
  })

  // 5. Tạo Danh mục Con: Cơ Billiards
  await prisma.category.upsert({
    where: { slug: 'co-billiards' },
    update: {},
    create: { name: 'Cơ Billiards', slug: 'co-billiards', parentId: billiards.id },
  })

  console.log('--- Da bom du lieu mau (Seeder) thanh cong vao Database! ---')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
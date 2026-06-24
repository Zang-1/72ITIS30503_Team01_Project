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

  // 6. Tạo 2 Simple Products (Phụ kiện tiêu hao)
  await prisma.product.create({
    data: {
      title: 'Ống cầu lông Yonex AS-40',
      slug: 'ong-cau-long-yonex-as-40',
      description: 'Ống cầu lông cao cấp dành cho thi đấu.',
      image: '/yonex-as-40.jpg',
      imageAlt: 'Hình ảnh ống cầu lông Yonex AS-40 chính hãng',
      price: 650000,
      regularPrice: 650000,
      sku: 'YNX-AS40',
      stockStatus: 'In stock',
      stockQty: 50,
      categoryId: badminton.id,
    }
  });

  await prisma.product.create({
    data: {
      title: 'Dây đan vợt Yonex BG65 Titanium',
      slug: 'day-dan-vot-yonex-bg65ti',
      description: 'Dây đan vợt siêu bền, độ nảy tốt.',
      image: '/yonex-bg65ti.jpg',
      imageAlt: 'Dây cước đan vợt cầu lông',
      price: 150000,
      regularPrice: 150000,
      sku: 'YNX-BG65TI',
      stockStatus: 'In stock',
      stockQty: 100,
      categoryId: badminton.id,
    }
  });

  // 7. Tạo 1 Variable Product (Vợt cầu lông)
  const variableProduct = await prisma.product.create({
    data: {
      title: 'Vợt cầu lông Yonex Astrox 88D chính hãng',
      slug: 'vot-cau-long-yonex-astrox-88d',
      description: 'Siêu phẩm tấn công dành cho dân chuyên.',
      image: '/vot-cau-long-yonex.jpg',
      imageAlt: 'Vợt cầu lông Yonex Astrox 88D',
      price: 4250000,
      categoryId: badminton.id,
    }
  });


  // Tạo Attribute
  const weightAttribute = await prisma.attribute.create({
    data: {
      name: 'Trọng lượng',
      productId: variableProduct.id,
    }
  });

  // Tạo Variation 1: 3U
  await prisma.variation.create({
    data: {
      value: '3U',
      sku: 'YNX-88D-3U',
      regularPrice: 4250000,
      stockStatus: 'In stock',
      stockQty: 10,
      productId: variableProduct.id,
      attributeId: weightAttribute.id,
    }
  });

  // Tạo Variation 2: 4U (Hết hàng)
  await prisma.variation.create({
    data: {
      value: '4U',
      sku: 'YNX-88D-4U',
      regularPrice: 4250000,
      stockStatus: 'Out of stock',
      stockQty: 0,
      productId: variableProduct.id,
      attributeId: weightAttribute.id,
    }
  });


  console.log('--- Da bom du lieu mau (Seeder) thanh cong vao Database! ---')
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
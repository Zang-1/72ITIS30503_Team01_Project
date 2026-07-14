'use server';

import { prisma } from '@/lib/prisma';

interface CheckoutItem {
  id: number;
  price: number;
  quantity: number;
  variationId?: number | null;
}

interface CheckoutData {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: CheckoutItem[];
}

export async function checkoutAction(data: CheckoutData) {
  try {
    const { name, email, phone, address, paymentMethod, items } = data;

    if (!name || !email || !phone || !address || !paymentMethod || !items || items.length === 0) {
      return { success: false, error: 'Thông tin đặt hàng không đầy đủ!' };
    }

    // 1. Calculate total amount (Grand Total = Subtotal + Shipping Fee)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal > 0 && subtotal < 5000000 ? 35000 : 0;
    const totalAmount = subtotal + shippingFee;

    // 2. Generate unique Order ID in the format ORD0001, ORD0002...
    const count = await prisma.order.count();
    let orderId = '';
    let nextNum = count + 1;
    for (let i = 0; i < 20; i++) {
      const testId = `ORD${String(nextNum).padStart(4, '0')}`;
      const exists = await prisma.order.findUnique({ where: { id: testId } });
      if (!exists) {
        orderId = testId;
        break;
      }
      nextNum++;
    }

    if (!orderId) {
      orderId = `ORD${Date.now()}`;
    }

    // 3. Create Order and its OrderItems transactionally
    const order = await prisma.order.create({
      data: {
        id: orderId,
        customerName: name,
        email,
        phone,
        address,
        paymentMethod,
        status: 'Pending',
        total: totalAmount,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            variationId: item.variationId || null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return {
      success: true,
      orderId: order.id,
      totalAmount: order.total,
    };
  } catch (error) {
    console.error('Lỗi khi xử lý đặt hàng:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định khi lưu đơn hàng.',
    };
  }
}

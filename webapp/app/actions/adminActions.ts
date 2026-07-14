'use server';

import { prisma } from '@/lib/prisma';

export async function getOrdersAction() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, orders };
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đơn hàng:', error);
    return { success: false, error: 'Không thể lấy danh sách đơn hàng.', orders: [] };
  }
}

export async function updateOrderStatusAction(orderId: string, nextStatus: string) {
  try {
    // Đảm bảo trạng thái nằm trong danh sách hợp lệ
    const validStatuses = ['Pending', 'Processing', 'Completed'];
    if (!validStatuses.includes(nextStatus)) {
      return { success: false, error: 'Trạng thái không hợp lệ.' };
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: nextStatus },
    });

    return { success: true, order };
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
    return { success: false, error: 'Không thể cập nhật trạng thái đơn hàng.' };
  }
}

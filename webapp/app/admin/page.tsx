'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Navbar from '../Navbar';
import { getOrdersAction, updateOrderStatusAction } from '@/app/actions/adminActions';

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  product: {
    title: string;
    imageUrl: string | null;
  };
}

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  status: string;
  total: number;
  createdAt: Date | string;
  items: OrderItem[];
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  // Load orders
  const loadOrders = async () => {
    setLoading(true);
    const result = await getOrdersAction();
    if (result.success && result.orders) {
      // Cast because of Date serialization
      setOrders(result.orders as unknown as Order[]);
    } else {
      setError(result.error || 'Không thể tải danh sách đơn hàng.');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = (orderId: string, currentStatus: string) => {
    let nextStatus = '';
    if (currentStatus === 'Pending') {
      nextStatus = 'Processing';
    } else if (currentStatus === 'Processing') {
      nextStatus = 'Completed';
    } else {
      return; // Completed is the final state
    }

    startTransition(async () => {
      const result = await updateOrderStatusAction(orderId, nextStatus);
      if (result.success) {
        // Update local state to trigger smooth UI movement
        setOrders((prevOrders) =>
          prevOrders.map((ord) => (ord.id === orderId ? { ...ord, status: nextStatus } : ord))
        );
      } else {
        alert(result.error || 'Không thể cập nhật trạng thái đơn hàng.');
      }
    });
  };

  // Group orders by status
  const pendingOrders = orders.filter((o) => o.status === 'Pending');
  const processingOrders = orders.filter((o) => o.status === 'Processing');
  const completedOrders = orders.filter((o) => o.status === 'Completed');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const formatDate = (dateVal: Date | string) => {
    const d = new Date(dateVal);
    return d.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const renderOrderCard = (order: Order) => (
    <div
      key={order.id}
      className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 hover:border-zinc-700 transition-all duration-300 shadow-lg animate-fade-in group"
    >
      {/* Order Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <div>
          <span className="text-xs font-bold text-amber-500 tracking-wider">#{order.id}</span>
          <p className="text-[10px] text-zinc-500 mt-0.5">{formatDate(order.createdAt)}</p>
        </div>
        <span
          className={`px-2 py-0.5 text-[10px] font-black rounded-full border ${
            order.status === 'Pending'
              ? 'bg-amber-950/60 text-amber-400 border-amber-800/80'
              : order.status === 'Processing'
              ? 'bg-blue-950/60 text-blue-400 border-blue-800/80'
              : 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80'
          }`}
        >
          {order.status === 'Pending' && 'Chờ duyệt'}
          {order.status === 'Processing' && 'Đang xử lý'}
          {order.status === 'Completed' && 'Đã xong'}
        </span>
      </div>

      {/* Customer Info */}
      <div className="text-xs space-y-1">
        <h4 className="font-bold text-white text-sm group-hover:text-amber-500 transition-colors">{order.customerName}</h4>
        <p className="text-zinc-400">📞 {order.phone}</p>
        <p className="text-zinc-400">📧 {order.email}</p>
        <p className="text-zinc-400">📍 {order.address}</p>
      </div>

      {/* Payment Method */}
      <div className="flex items-center justify-between text-xs bg-zinc-950/60 p-2 rounded-lg border border-zinc-850">
        <span className="text-zinc-500">Thanh toán:</span>
        <span className={`font-semibold ${order.paymentMethod === 'Bank Transfer' ? 'text-amber-400' : 'text-zinc-300'}`}>
          {order.paymentMethod === 'Bank Transfer' ? '🏦 Chuyển khoản' : '💵 Tiền mặt (COD)'}
        </span>
      </div>

      {/* Products list */}
      <div className="space-y-2 border-t border-b border-zinc-800/60 py-3 text-xs">
        <p className="font-semibold text-zinc-400 uppercase tracking-wider text-[10px]">Sản phẩm:</p>
        <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-start text-zinc-300">
              <span className="truncate pr-4">{item.product?.title || 'Sản phẩm'} <strong className="text-amber-500">x{item.quantity}</strong></span>
              <span className="whitespace-nowrap font-medium">{formatCurrency(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer (Total and CTA button) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
        <div>
          <span className="text-[10px] text-zinc-500 block">Tổng thanh toán:</span>
          <strong className="text-base text-amber-500 font-black">{formatCurrency(order.total)}</strong>
        </div>

        {order.status !== 'Completed' && (
          <button
            onClick={() => handleStatusChange(order.id, order.status)}
            disabled={isPending}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-300 shadow-md ${
              order.status === 'Pending'
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {order.status === 'Pending' ? 'Duyệt đơn ➔' : 'Hoàn thành ➔'}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-6 py-10">
        {/* Header Section */}
        <div className="mb-8 border-b border-zinc-850 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase flex items-center gap-2">
              🛡️ Quản trị <span className="text-amber-500">SportStore</span>
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Hệ thống xử lý đơn hàng B2C - Cầu lông & Tennis
            </p>
          </div>
          <button
            onClick={loadOrders}
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-xs font-bold rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all flex items-center gap-2"
          >
            🔄 Tải lại dữ liệu
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-950/60 border border-red-800 rounded-xl text-red-200 text-sm mb-6 max-w-md">
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-500 space-y-3">
            <svg className="animate-spin h-8 w-8 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wider">Đang tải danh sách đơn hàng...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* COLUMN 1: Pending */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-amber-950/60 pb-2">
                <h3 className="font-bold text-sm text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                  <span>🟡 Chờ duyệt</span>
                  <span className="bg-amber-950/80 text-amber-400 text-[10px] px-2 py-0.5 rounded-full border border-amber-850 font-black">
                    {pendingOrders.length}
                  </span>
                </h3>
              </div>
              
              {pendingOrders.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-zinc-900 rounded-2xl text-zinc-600 text-xs">
                  Không có đơn hàng nào chờ duyệt.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingOrders.map(renderOrderCard)}
                </div>
              )}
            </div>

            {/* COLUMN 2: Processing */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-blue-950/60 pb-2">
                <h3 className="font-bold text-sm text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                  <span>🔵 Đang xử lý</span>
                  <span className="bg-blue-950/80 text-blue-400 text-[10px] px-2 py-0.5 rounded-full border border-blue-850 font-black">
                    {processingOrders.length}
                  </span>
                </h3>
              </div>

              {processingOrders.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-zinc-900 rounded-2xl text-zinc-600 text-xs">
                  Không có đơn hàng nào đang xử lý.
                </div>
              ) : (
                <div className="space-y-4">
                  {processingOrders.map(renderOrderCard)}
                </div>
              )}
            </div>

            {/* COLUMN 3: Completed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-950/60 pb-2">
                <h3 className="font-bold text-sm text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                  <span>🟢 Đã hoàn thành</span>
                  <span className="bg-emerald-950/80 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full border border-emerald-850 font-black">
                    {completedOrders.length}
                  </span>
                </h3>
              </div>

              {completedOrders.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-zinc-900 rounded-2xl text-zinc-600 text-xs">
                  Chưa có đơn hàng nào hoàn thành.
                </div>
              ) : (
                <div className="space-y-4">
                  {completedOrders.map(renderOrderCard)}
                </div>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

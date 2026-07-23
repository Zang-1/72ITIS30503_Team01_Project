'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { getOrdersAction, updateOrderStatusAction } from '@/app/actions/adminActions';
import { useLanguage } from '@/context/LanguageContext';

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

const COLUMNS = [
  { key: 'Pending', tone: 'amber', dot: 'bg-amber-500', bar: 'bg-amber-500', text: 'text-amber-700', soft: 'bg-amber-50' },
  { key: 'Processing', tone: 'blue', dot: 'bg-blue-500', bar: 'bg-blue-500', text: 'text-blue-700', soft: 'bg-blue-50' },
  { key: 'Completed', tone: 'emerald', dot: 'bg-emerald-500', bar: 'bg-emerald-500', text: 'text-emerald-700', soft: 'bg-emerald-50' },
] as const;

export default function AdminPage() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const loadOrders = async () => {
    setLoading(true);
    const result = await getOrdersAction();
    if (result.success && result.orders) {
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
      return;
    }

    startTransition(async () => {
      const result = await updateOrderStatusAction(orderId, nextStatus);
      if (result.success) {
        setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)));
      } else {
        setError(result.error || 'Không thể cập nhật trạng thái.');
      }
    });
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  const labelFor = (key: string) =>
    key === 'Pending' ? t('admin_col_pending') : key === 'Processing' ? t('admin_col_processing') : t('admin_col_completed');

  const actionFor = (key: string) =>
    key === 'Pending' ? t('admin_approve') : key === 'Processing' ? t('admin_complete') : null;

  return (
    <div className="ss-container py-6">
      {/* header */}
      <div className="ss-card mb-5 flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div>
          <h1 className="text-[21px] font-extrabold text-ink-900 md:text-[24px]">{t('admin_title')}</h1>
          <p className="mt-0.5 text-[13px] text-ink-500">{t('admin_subtitle')}</p>
        </div>
        <button
          onClick={loadOrders}
          disabled={loading || isPending}
          className="flex items-center gap-2 rounded-lg border border-ink-300 px-4 py-2.5 text-[13px] font-semibold text-ink-700 transition-colors hover:border-brand-500 hover:text-brand-600 disabled:opacity-60"
        >
          <svg className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          {t('admin_reload')}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13.5px] font-medium text-[#b91c1c]">
          {error}
        </div>
      )}

      {loading ? (
        <div className="ss-card grid place-items-center gap-3 py-20 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-ink-300 border-t-accent-500" />
          <p className="text-[14px] text-ink-500">{t('admin_loading')}</p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {COLUMNS.map((col) => {
            const list = orders.filter((o) => o.status === col.key);
            return (
              <section key={col.key} className="ss-card overflow-hidden">
                <header className="flex items-center justify-between border-b border-ink-300 px-4 py-3">
                  <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink-900">
                    <span className={`h-2.5 w-2.5 rounded-full ${col.dot}`} />
                    {labelFor(col.key)}
                  </h2>
                  <span className={`rounded-full ${col.soft} ${col.text} px-2.5 py-0.5 text-[12px] font-bold`}>
                    {list.length} {t('admin_orders_unit')}
                  </span>
                </header>

                <div className="max-h-[70vh] space-y-3 overflow-y-auto bg-ink-50 p-3">
                  {list.length === 0 && (
                    <p className="rounded-lg border border-dashed border-ink-300 py-8 text-center text-[13px] text-ink-500">
                      {t('admin_empty')}
                    </p>
                  )}

                  {list.map((order) => (
                    <article key={order.id} className="overflow-hidden rounded-xl border border-ink-300 bg-white">
                      <div className={`h-1 w-full ${col.bar}`} />
                      <div className="p-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-mono text-[13px] font-bold text-brand-600">#{order.id}</span>
                          <span className="text-[11.5px] text-ink-500">
                            {new Date(order.createdAt).toLocaleString('vi-VN')}
                          </span>
                        </div>

                        <div className="mt-2.5 space-y-0.5 text-[12.5px] text-ink-700">
                          <p className="font-bold text-ink-900">{order.customerName}</p>
                          <p>{order.phone} · {order.email}</p>
                          <p className="ss-line-clamp-2">{order.address}</p>
                          <p className="pt-1">
                            <span className="rounded bg-ink-100 px-2 py-0.5 text-[11.5px] font-semibold text-ink-700">
                              {t('admin_payment_label')}: {order.paymentMethod}
                            </span>
                          </p>
                        </div>

                        <ul className="mt-2.5 max-h-28 space-y-1.5 overflow-y-auto border-t border-ink-300 pt-2.5">
                          {order.items.map((it) => (
                            <li key={it.id} className="flex items-center justify-between gap-2 text-[12px]">
                              <span className="ss-line-clamp-2 flex-1 text-ink-700">{it.product?.title ?? `#${it.productId}`}</span>
                              <span className="shrink-0 text-ink-500">×{it.quantity}</span>
                              <span className="shrink-0 font-semibold text-ink-900">{formatCurrency(it.price)}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-2.5 flex items-center justify-between border-t border-ink-300 pt-2.5">
                          <span className="text-[12px] text-ink-500">{t('admin_total_label')}</span>
                          <span className="text-[15px] font-extrabold text-[#dc2626]">{formatCurrency(order.total)}</span>
                        </div>

                        {actionFor(col.key) && (
                          <button
                            onClick={() => handleStatusChange(order.id, order.status)}
                            disabled={isPending}
                            className="mt-3 w-full rounded-lg bg-accent-500 py-2.5 text-[12.5px] font-bold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {actionFor(col.key)} →
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

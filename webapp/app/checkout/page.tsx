'use client';

import { useState } from 'react';
import Navbar from '../Navbar';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

export default function CheckoutPage() {
  const { grandTotal } = useCart();
  const { t } = useLanguage();

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);

  const applyCoupon = () => {
    if (coupon === 'XUAN2026') {
      setDiscount(grandTotal * 0.1);
      setMessage(t('checkout_coupon_10'));
    } else if (coupon === 'LOGISTICFREE') {
      setDiscount(35000);
      setMessage(t('checkout_coupon_free_ship'));
    } else {
      setDiscount(0);
      setMessage(t('checkout_coupon_invalid'));
    }
  };

  const finalTotal = Math.max(grandTotal - discount, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-zinc-900 p-8 rounded-xl">

        <h1 className="text-3xl font-bold text-amber-500 mb-6">
          {t('checkout_title')}
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(t('checkout_order_success'));
          }}
          className="space-y-4"
        >
          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder={t('checkout_full_name_placeholder')}
            required
          />

          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder={t('checkout_phone_placeholder_short')}
            type="tel"
            pattern="[0-9]{10}"
            required
          />

          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder={t('checkout_email_placeholder_short')}
            type="email"
            required
          />

          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder={t('checkout_address_placeholder_short')}
            required
          />

          <hr className="border-zinc-700" />

          <h2 className="font-bold">
            {t('checkout_coupon_title')}
          </h2>

          <div className="flex gap-2">
            <input
              className="flex-1 p-3 rounded bg-zinc-800"
              placeholder={t('checkout_coupon_placeholder')}
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />

            <button
              type="button"
              onClick={applyCoupon}
              className="bg-amber-500 text-black px-4 rounded"
            >
              {t('checkout_coupon_apply')}
            </button>
          </div>

          <p>{message}</p>

          <hr className="border-zinc-700" />

          <p>
            {t('checkout_total_price')}
            <strong className="ml-2">
              {formatCurrency(grandTotal)}
            </strong>
          </p>

          <p>
            {t('checkout_discount')}
            <strong className="ml-2 text-green-400">
              -{formatCurrency(discount)}
            </strong>
          </p>

          <p className="text-2xl">
            {t('checkout_final_total')}
            <strong className="ml-2 text-amber-500">
              {formatCurrency(finalTotal)}
            </strong>
          </p>

          <p>
            {t('checkout_order_date')}
            {' '}
            {new Date().toLocaleDateString('vi-VN')}
          </p>

          <button
            className="w-full bg-amber-500 text-black font-bold py-3 rounded"
          >
            {t('checkout_place_order')}
          </button>

        </form>
      </div>
    </div>
  );
}
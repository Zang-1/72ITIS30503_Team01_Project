'use client';

import { useState } from 'react';
import Navbar from '../Navbar';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const { grandTotal } = useCart();

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
      setMessage('✅ Áp dụng mã giảm 10% thành công');
    } else if (coupon === 'LOGISTICFREE') {
      setDiscount(35000);
      setMessage('✅ Miễn phí vận chuyển');
    } else {
      setDiscount(0);
      setMessage('❌ Mã giảm giá không hợp lệ');
    }
  };

  const finalTotal = Math.max(grandTotal - discount, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-xl mx-auto mt-10 bg-zinc-900 p-8 rounded-xl">

        <h1 className="text-3xl font-bold text-amber-500 mb-6">
          Thanh toán
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Đặt hàng thành công!');
          }}
          className="space-y-4"
        >
          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder="Họ và tên"
            required
          />

          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder="Số điện thoại"
            type="tel"
            pattern="[0-9]{10}"
            required
          />

          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder="Email"
            type="email"
            required
          />

          <input
            className="w-full p-3 rounded bg-zinc-800"
            placeholder="Địa chỉ"
            required
          />

          <hr className="border-zinc-700" />

          <h2 className="font-bold">
            Mã giảm giá
          </h2>

          <div className="flex gap-2">
            <input
              className="flex-1 p-3 rounded bg-zinc-800"
              placeholder="Nhập mã"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />

            <button
              type="button"
              onClick={applyCoupon}
              className="bg-amber-500 text-black px-4 rounded"
            >
              Áp dụng
            </button>
          </div>

          <p>{message}</p>

          <hr className="border-zinc-700" />

          <p>
            Tổng tiền:
            <strong className="ml-2">
              {formatCurrency(grandTotal)}
            </strong>
          </p>

          <p>
            Giảm giá:
            <strong className="ml-2 text-green-400">
              -{formatCurrency(discount)}
            </strong>
          </p>

          <p className="text-2xl">
            Thành tiền:
            <strong className="ml-2 text-amber-500">
              {formatCurrency(finalTotal)}
            </strong>
          </p>

          <p>
            Ngày đặt hàng:
            {' '}
            {new Date().toLocaleDateString('vi-VN')}
          </p>

          <button
            className="w-full bg-amber-500 text-black font-bold py-3 rounded"
          >
            Đặt hàng
          </button>

        </form>
      </div>
    </div>
  );
}
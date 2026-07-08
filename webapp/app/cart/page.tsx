'use client';

import Navbar from '../Navbar';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    grandTotal,
  } = useCart();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-3xl font-bold text-amber-500 mb-8">
          Giỏ hàng
        </h1>

        {items.length === 0 ? (
          <p>Giỏ hàng đang trống.</p>
        ) : (
          <>
            {items.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-zinc-700 py-4"
              >
                <div>
                  <h2 className="font-bold">{item.title}</h2>

                  <p>{formatCurrency(item.price)}</p>

                  <div className="flex gap-2 mt-2">

                    <button
                      className="bg-zinc-700 px-3"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      className="bg-zinc-700 px-3"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>

                  </div>
                </div>

                <div className="text-right">

                  <p className="font-bold">
                    {formatCurrency(item.price * item.quantity)}
                  </p>

                  <button
                    className="text-red-500 mt-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Xóa
                  </button>

                </div>
              </div>
            ))}

            <div className="mt-8 border-t border-zinc-700 pt-6">

              <p>
                Tạm tính:
                <strong className="ml-2">
                  {formatCurrency(subtotal)}
                </strong>
              </p>

              <p>
                Phí vận chuyển:
                <strong className="ml-2">
                  {formatCurrency(shippingFee)}
                </strong>
              </p>

              <p className="text-2xl mt-3">
                Tổng cộng:
                <strong className="text-amber-500 ml-2">
                  {formatCurrency(grandTotal)}
                </strong>
              </p>

              <Link
                href="/checkout"
                className="inline-block mt-6 bg-amber-500 text-black px-6 py-3 rounded-lg font-bold"
              >
                Thanh toán
              </Link>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
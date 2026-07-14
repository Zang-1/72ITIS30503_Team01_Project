'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

interface ProductActionsProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string | null;
}

export default function ProductActions({ id, title, price, imageUrl }: ProductActionsProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState<number>(3); // 3 for 3U, 4 for 4U
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(
      {
        id,
        title,
        price,
        imageUrl: imageUrl || '/vot-cau-long-yonex.jpg',
        variationId: weight,
      },
      quantity
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Weight Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-zinc-400 w-24">Phân loại (Weight):</span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 cursor-pointer text-xs font-semibold text-zinc-300 transition-colors">
            <input
              type="radio"
              name="weight"
              value={3}
              checked={weight === 3}
              onChange={() => setWeight(3)}
              className="text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-950 bg-zinc-950 border-zinc-800 cursor-pointer"
            />
            <span>3U</span>
          </label>
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 cursor-pointer text-xs font-semibold text-zinc-300 transition-colors">
            <input
              type="radio"
              name="weight"
              value={4}
              checked={weight === 4}
              onChange={() => setWeight(4)}
              className="text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-950 bg-zinc-950 border-zinc-800 cursor-pointer"
            />
            <span>4U</span>
          </label>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-zinc-400 w-24">Số lượng:</span>
        <div className="flex items-center border border-zinc-800 rounded-lg bg-zinc-900 overflow-hidden">
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity - 1)}
            className="px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors font-bold text-lg"
          >
            -
          </button>
          <span className="px-6 py-2 font-bold text-sm text-zinc-100 min-w-[40px] text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="px-4 py-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Add To Cart Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
            added
              ? 'bg-emerald-600 text-white cursor-default'
              : 'bg-amber-500 text-black hover:bg-amber-400'
          }`}
        >
          {added ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Đã Thêm Vào Giỏ!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              Thêm Vào Giỏ Hàng
            </>
          )}
        </button>
      </div>
    </div>
  );
}

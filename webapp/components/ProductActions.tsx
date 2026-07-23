'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

interface ProductActionsProps {
  id: number;
  title: string;
  price: number;
  imageUrl: string | null;
}

export default function ProductActions({ id, title, price, imageUrl }: ProductActionsProps) {
  const { addToCart, setIsOpen } = useCart();
  const { t } = useLanguage();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState<number>(3); // 3 => 3U, 4 => 4U
  const [added, setAdded] = useState(false);

  const pushToCart = () => {
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
  };

  const handleAddToCart = () => {
    pushToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    pushToCart();
    setIsOpen(false);
    router.push('/checkout');
  };

  const changeQty = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  return (
    <div className="mt-5 space-y-5">
      {/* variation */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-[92px] shrink-0 text-[13px] font-semibold text-ink-500">
          {t('product_weight')}
        </span>
        <div className="flex gap-2">
          {[3, 4].map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWeight(w)}
              className={`min-w-[64px] rounded-lg border px-4 py-2 text-[13px] font-bold transition-all ${
                weight === w
                  ? 'border-accent-500 bg-accent-50 text-accent-600'
                  : 'border-ink-300 bg-white text-ink-700 hover:border-ink-500'
              }`}
            >
              {w}U
            </button>
          ))}
        </div>
      </div>

      {/* quantity */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="w-[92px] shrink-0 text-[13px] font-semibold text-ink-500">
          {t('product_quantity')}
        </span>
        <div className="flex items-center overflow-hidden rounded-lg border border-ink-300 bg-white">
          <button
            type="button"
            onClick={() => changeQty(quantity - 1)}
            className="px-4 py-2 text-[17px] font-bold text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-900"
            aria-label="-"
          >
            −
          </button>
          <span className="min-w-[46px] px-3 py-2 text-center text-[14px] font-bold text-ink-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => changeQty(quantity + 1)}
            className="px-4 py-2 text-[17px] font-bold text-ink-500 transition-colors hover:bg-ink-50 hover:text-ink-900"
            aria-label="+"
          >
            +
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={handleAddToCart}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[14px] font-bold transition-all ${
            added
              ? 'cursor-default bg-emerald-600 text-white'
              : 'border-2 border-accent-500 bg-white text-accent-600 hover:bg-accent-50'
          }`}
        >
          {added ? (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              {t('product_added_to_cart')}
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {t('product_add_to_cart')}
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          className="flex flex-1 items-center justify-center rounded-xl bg-accent-500 px-6 py-3.5 text-[14px] font-bold text-white shadow-sm transition-all hover:bg-accent-600"
        >
          {t('pd_buy_now')}
        </button>
      </div>
    </div>
  );
}

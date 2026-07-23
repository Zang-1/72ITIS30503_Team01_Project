'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Breadcrumb from '@/components/Breadcrumb';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, shippingFee, grandTotal } = useCart();
  const { t } = useLanguage();

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  return (
    <>
      <Breadcrumb items={[{ label: t('cart_title') }]} />

      <div className="ss-container py-6">
        <h1 className="mb-5 text-[22px] font-extrabold text-ink-900 md:text-[26px]">{t('cart_your_cart')}</h1>

        {items.length === 0 ? (
          <div className="ss-card grid place-items-center gap-4 px-6 py-16 text-center">
            <svg className="h-16 w-16 text-ink-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <p className="text-[15px] text-ink-500">{t('cart_empty_page')}</p>
            <Link
              href="/shop"
              className="rounded-lg bg-accent-500 px-6 py-3 text-[14px] font-bold text-white hover:bg-accent-600"
            >
              {t('cart_continue_shopping')}
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-[1fr_330px]">
            {/* items */}
            <div className="ss-card overflow-hidden">
              <div className="hidden grid-cols-[1fr_130px_120px_130px_40px] gap-3 border-b border-ink-300 bg-ink-50 px-4 py-3 text-[12px] font-bold uppercase tracking-wide text-ink-500 md:grid">
                <span>{t('cart_title')}</span>
                <span className="text-center">{t('product_price_label')}</span>
                <span className="text-center">{t('product_quantity')}</span>
                <span className="text-right">{t('cart_grand_total')}</span>
                <span />
              </div>

              <ul className="divide-y divide-ink-300">
                {items.map((item) => (
                  <li
                    key={`${item.id}-${item.variationId ?? 'default'}`}
                    className="grid grid-cols-1 items-center gap-3 px-4 py-4 md:grid-cols-[1fr_130px_120px_130px_40px]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imageUrl || '/vot-cau-long-yonex.jpg'}
                        alt={item.title}
                        className="h-16 w-16 shrink-0 rounded-lg bg-ink-50 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="ss-line-clamp-2 text-[13.5px] font-semibold text-ink-900">{item.title}</p>
                        {item.variationId && (
                          <span className="mt-1 inline-block rounded bg-ink-100 px-1.5 py-0.5 text-[11px] font-semibold text-ink-700">
                            {item.variationId}U
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[13.5px] font-semibold text-ink-700 md:text-center">
                      {formatCurrency(item.price)}
                    </span>

                    <div className="flex md:justify-center">
                      <div className="flex items-center overflow-hidden rounded-md border border-ink-300">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variationId)}
                          className="px-2.5 py-1 text-[15px] font-bold text-ink-500 hover:bg-ink-50"
                        >
                          −
                        </button>
                        <span className="min-w-[34px] text-center text-[13.5px] font-bold text-ink-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variationId)}
                          className="px-2.5 py-1 text-[15px] font-bold text-ink-500 hover:bg-ink-50"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <span className="text-[15px] font-extrabold text-[#dc2626] md:text-right">
                      {formatCurrency(item.price * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id, item.variationId)}
                      title={t('cart_remove')}
                      className="justify-self-start rounded p-1.5 text-ink-300 transition-colors hover:text-[#dc2626] md:justify-self-center"
                    >
                      <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* summary */}
            <aside className="ss-card h-fit p-5 lg:sticky lg:top-[150px]">
              <h2 className="mb-3 text-[15px] font-bold text-ink-900">{t('checkout_order_summary')}</h2>
              <dl className="space-y-2 text-[13.5px]">
                <div className="flex justify-between text-ink-700">
                  <dt>{t('cart_subtotal')}</dt>
                  <dd className="font-semibold text-ink-900">{formatCurrency(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-ink-700">
                  <dt>{t('cart_shipping')}</dt>
                  <dd className="font-semibold text-ink-900">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600">{t('cart_free_shipping')}</span>
                    ) : (
                      formatCurrency(shippingFee)
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-ink-300 pt-2.5 text-[16px]">
                  <dt className="font-bold text-ink-900">{t('cart_grand_total')}</dt>
                  <dd className="font-extrabold text-[#dc2626]">{formatCurrency(grandTotal)}</dd>
                </div>
              </dl>

              <Link
                href="/checkout"
                className="mt-4 block rounded-xl bg-accent-500 py-3.5 text-center text-[14px] font-bold text-white hover:bg-accent-600"
              >
                {t('cart_checkout')}
              </Link>
              <Link
                href="/shop"
                className="mt-2 block py-2 text-center text-[12.5px] font-semibold text-ink-500 hover:text-ink-900"
              >
                {t('cart_continue_shopping')}
              </Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

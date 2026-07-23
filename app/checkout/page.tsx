'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { checkoutAction } from '@/app/actions/checkout';
import Breadcrumb from '@/components/Breadcrumb';

const BANK = { name: 'ABC Bank', number: '123456789', holder: 'GROUP 1' };

export default function CheckoutPage() {
  const { items, subtotal, shippingFee, grandTotal, clearCart } = useCart();
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'COD',
  });
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [shipDiscount, setShipDiscount] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placed, setPlaced] = useState<{ id: string; total: number } | null>(null);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  const applyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === 'XUAN2026') {
      setDiscount(subtotal * 0.1);
      setShipDiscount(0);
      setMessage(t('checkout_coupon_10'));
    } else if (code === 'LOGISTICFREE') {
      setDiscount(0);
      setShipDiscount(shippingFee);
      setMessage(t('checkout_coupon_free_ship'));
    } else {
      setDiscount(0);
      setShipDiscount(0);
      setMessage(t('checkout_coupon_invalid'));
    }
  };

  const finalTotal = Math.max(grandTotal - discount - shipDiscount, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const name = form.name.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const address = form.address.trim();

    if (!name) return setError(t('validate_name_required'));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError(t('validate_email_invalid'));
    if (!/^0\d{9}$/.test(phone)) return setError(t('validate_phone_invalid'));
    if (!address) return setError(t('validate_address_required'));
    if (items.length === 0) return setError(t('cart_empty_page'));

    setIsSubmitting(true);
    try {
      const result = await checkoutAction({
        name,
        email,
        phone,
        address,
        paymentMethod: form.paymentMethod,
        coupon: coupon.trim().toUpperCase() || undefined,
        items: items.map((i) => ({
          id: i.id,
          price: i.price,
          quantity: i.quantity,
          variationId: i.variationId || null,
        })),
      });

      if (result.success && result.orderId) {
        setPlaced({ id: result.orderId, total: result.totalAmount ?? finalTotal });
        clearCart();
      } else {
        setError(result.error || t('error_checkout'));
      }
    } catch (err) {
      console.error(err);
      setError(t('error_server'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-[14px] text-ink-900 placeholder:text-ink-500';
  const labelClass = 'mb-1.5 block text-[12.5px] font-semibold text-ink-700';

  /* ---------- success screen ---------- */
  if (placed) {
    return (
      <>
        <Breadcrumb items={[{ label: t('checkout_title') }]} />
        <div className="ss-container py-12">
          <div className="ss-card mx-auto max-w-lg p-8 text-center">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h1 className="mt-4 text-[22px] font-extrabold text-ink-900">{t('success_message')}</h1>
            <p className="mt-2 text-[14px] text-ink-500">{t('success_description')}</p>

            <dl className="mt-5 space-y-2 rounded-xl border border-ink-300 bg-ink-50 p-4 text-left text-[13.5px]">
              <div className="flex justify-between">
                <dt className="text-ink-500">{t('success_order_id')}</dt>
                <dd className="font-mono font-bold text-accent-600">{placed.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">{t('success_total_payment')}</dt>
                <dd className="font-extrabold text-[#dc2626]">{formatCurrency(placed.total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">{t('success_status')}</dt>
                <dd>
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[12px] font-bold text-amber-700">
                    {t('success_status_pending')}
                  </span>
                </dd>
              </div>
            </dl>

            <Link
              href="/"
              className="mt-5 inline-block w-full rounded-xl bg-accent-500 py-3.5 text-[14px] font-bold text-white hover:bg-accent-600"
            >
              {t('cart_continue_shopping')}
            </Link>
          </div>
        </div>
      </>
    );
  }

  /* ---------- form ---------- */
  return (
    <>
      <Breadcrumb items={[{ label: t('cart_title'), href: '/cart' }, { label: t('checkout_title') }]} />

      <div className="ss-container py-6">
        <h1 className="mb-5 text-[22px] font-extrabold text-ink-900 md:text-[26px]">{t('checkout_title')}</h1>

        <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-[1fr_360px]">
          {/* left: details */}
          <div className="space-y-5">
            <section className="ss-card p-5">
              <h2 className="mb-4 text-[15px] font-bold text-ink-900">{t('checkout_shipping_info')}</h2>

              {error && (
                <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] font-medium text-[#b91c1c]">
                  <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  {error}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className={labelClass}>{t('checkout_name')}</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder={t('checkout_name_placeholder')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{t('checkout_phone')}</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder={t('checkout_phone_placeholder')} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{t('checkout_email')}</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t('checkout_email_placeholder')} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>{t('checkout_address')}</label>
                  <textarea name="address" rows={2} value={form.address} onChange={handleChange} placeholder={t('checkout_address_placeholder')} className={inputClass} />
                </div>
              </div>
            </section>

            <section className="ss-card p-5">
              <h2 className="mb-3 text-[15px] font-bold text-ink-900">{t('checkout_payment_method')}</h2>
              <div className="space-y-2">
                {[
                  { v: 'COD', title: t('checkout_cod'), desc: t('checkout_cod_desc') },
                  { v: 'Bank Transfer', title: t('checkout_bank'), desc: t('checkout_bank_desc') },
                ].map((m) => (
                  <label
                    key={m.v}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 transition-colors ${
                      form.paymentMethod === m.v ? 'border-accent-500 bg-accent-50' : 'border-ink-300 hover:border-ink-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.v}
                      checked={form.paymentMethod === m.v}
                      onChange={handleChange}
                      className="mt-0.5 accent-[#f97316]"
                    />
                    <span>
                      <span className="block text-[13.5px] font-bold text-ink-900">{m.title}</span>
                      <span className="block text-[12px] text-ink-500">{m.desc}</span>
                    </span>
                  </label>
                ))}
              </div>

              {form.paymentMethod === 'Bank Transfer' && (
                <div className="mt-3 rounded-lg border border-brand-100 bg-brand-50 p-4 text-[13px] text-brand-700">
                  <p className="mb-1.5 font-bold">{t('checkout_bank_info')}</p>
                  <p>{t('checkout_bank_name')} <b>{BANK.name}</b></p>
                  <p>{t('checkout_account_number')} <b className="font-mono">{BANK.number}</b></p>
                  <p>{t('checkout_account_name')} <b>{BANK.holder}</b></p>
                </div>
              )}
            </section>
          </div>

          {/* right: summary */}
          <aside className="ss-card h-fit p-5 lg:sticky lg:top-[150px]">
            <h2 className="mb-3 text-[15px] font-bold text-ink-900">{t('checkout_order_summary')}</h2>

            {items.length > 0 && (
              <ul className="mb-4 max-h-52 space-y-2.5 overflow-y-auto border-b border-ink-300 pb-4">
                {items.map((i) => (
                  <li key={`${i.id}-${i.variationId ?? 'd'}`} className="flex gap-2.5">
                    <img src={i.imageUrl || '/vot-cau-long-yonex.jpg'} alt={i.title} className="h-11 w-11 shrink-0 rounded bg-ink-50 object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="ss-line-clamp-2 text-[12.5px] font-semibold text-ink-900">{i.title}</p>
                      <p className="text-[11.5px] text-ink-500">× {i.quantity}</p>
                    </div>
                    <span className="text-[12.5px] font-bold text-ink-900">{formatCurrency(i.price * i.quantity)}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* coupon */}
            <label className={labelClass}>{t('checkout_coupon_title')}</label>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder={t('checkout_coupon_placeholder')}
                className={`${inputClass} uppercase`}
              />
              <button
                type="button"
                onClick={applyCoupon}
                className="shrink-0 rounded-lg bg-brand-500 px-4 text-[13px] font-bold text-white hover:bg-brand-600"
              >
                {t('checkout_coupon_apply')}
              </button>
            </div>
            {message && <p className="mt-2 text-[12.5px] font-medium text-ink-700">{message}</p>}

            <dl className="mt-4 space-y-2 border-t border-ink-300 pt-4 text-[13.5px]">
              <div className="flex justify-between text-ink-700">
                <dt>{t('checkout_subtotal')}</dt>
                <dd className="font-semibold text-ink-900">{formatCurrency(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-ink-700">
                <dt>{t('checkout_shipping')}</dt>
                <dd className="font-semibold text-ink-900">
                  {shippingFee - shipDiscount <= 0 ? (
                    <span className="text-emerald-600">{t('cart_free_shipping')}</span>
                  ) : (
                    formatCurrency(shippingFee - shipDiscount)
                  )}
                </dd>
              </div>
              {(discount > 0 || shipDiscount > 0) && (
                <div className="flex justify-between text-emerald-600">
                  <dt>{t('checkout_discount')}</dt>
                  <dd className="font-semibold">−{formatCurrency(discount + shipDiscount)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-ink-300 pt-2.5 text-[17px]">
                <dt className="font-bold text-ink-900">{t('checkout_final_total')}</dt>
                <dd className="font-extrabold text-[#dc2626]">{formatCurrency(finalTotal)}</dd>
              </div>
            </dl>

            <p className="mt-2 text-[11.5px] text-ink-500">
              {t('checkout_order_date')} {new Date().toLocaleDateString('vi-VN')}
            </p>

            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className="mt-4 w-full rounded-xl bg-accent-500 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? t('checkout_submitting') : t('checkout_place_order')}
            </button>
            <Link href="/cart" className="mt-2 block py-2 text-center text-[12.5px] font-semibold text-ink-500 hover:text-ink-900">
              ← {t('checkout_back_to_cart')}
            </Link>
          </aside>
        </form>
      </div>
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { checkoutAction } from '@/app/actions/checkout';

const BANK = { name: 'ABC Bank', number: '123456789', holder: 'GROUP 1' };

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingFee,
    grandTotal,
  } = useCart();

  const { t } = useLanguage();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'COD',
  });
  const [coupon, setCoupon] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [placedOrderInfo, setPlacedOrderInfo] = useState<{ id: string; total: number } | null>(null);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    // 1. Validation dữ liệu đầu vào
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedAddress = formData.address.trim();
    const selectedPaymentMethod = formData.paymentMethod;

    if (!trimmedName) {
      setErrorMessage(t('validate_name_required'));
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage(t('validate_email_invalid'));
      setIsSubmitting(false);
      return;
    }

    // Kiểm tra định dạng số điện thoại Việt Nam (10 chữ số, bắt đầu bằng số 0)
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      setErrorMessage(t('validate_phone_invalid'));
      setIsSubmitting(false);
      return;
    }

    if (!trimmedAddress) {
      setErrorMessage(t('validate_address_required'));
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await checkoutAction({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        address: trimmedAddress,
        paymentMethod: selectedPaymentMethod,
        coupon: coupon.trim().toUpperCase() || undefined,
        items: items.map((item) => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          variationId: item.variationId || null,
        })),
      });

      if (result.success && result.orderId) {
        setPlacedOrderInfo({
          id: result.orderId,
          total: result.totalAmount ?? grandTotal,
        });
        setStep('success');
        clearCart();
        setCoupon('');
        setFormData({ name: '', email: '', phone: '', address: '', paymentMethod: 'COD' });
      } else {
        setErrorMessage(result.error || t('error_checkout'));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t('error_server'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  const close = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep('cart');
      setErrorMessage('');
    }, 250);
  };

  const inputClass =
    'w-full rounded-lg border border-ink-300 bg-white px-3.5 py-2.5 text-[14px] text-ink-900 placeholder:text-ink-500';
  const labelClass = 'mb-1.5 block text-[12.5px] font-semibold text-ink-700';

  return (
    <div className="fixed inset-0 z-[100] flex justify-end ss-no-print">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={close} />

      {/* panel */}
      <aside className="ss-fade-up relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-ink-300 bg-brand-500 px-5 py-4 text-white">
          <h2 className="flex items-center gap-2.5 text-[16px] font-bold">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.9" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {step === 'cart' && t('cart_your_cart')}
            {step === 'checkout' && t('checkout_shipping_info')}
            {step === 'success' && t('success_title')}
          </h2>
          <button
            onClick={close}
            className="rounded-md p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            aria-label={t('cart_close')}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* step indicator */}
        {step !== 'success' && (
          <div className="flex items-center gap-2 border-b border-ink-300 bg-ink-50 px-5 py-2.5">
            {[t('cart_title'), t('checkout_title')].map((label, i) => {
              const active = (step === 'cart' && i === 0) || (step === 'checkout' && i === 1);
              const done = step === 'checkout' && i === 0;
              return (
                <React.Fragment key={label}>
                  {i > 0 && <span className="h-px flex-1 bg-ink-300" />}
                  <span
                    className={`flex items-center gap-1.5 text-[12px] font-semibold ${
                      active ? 'text-accent-600' : done ? 'text-emerald-600' : 'text-ink-500'
                    }`}
                  >
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${
                        active
                          ? 'bg-accent-500 text-white'
                          : done
                          ? 'bg-emerald-600 text-white'
                          : 'bg-ink-300 text-white'
                      }`}
                    >
                      {done ? '✓' : i + 1}
                    </span>
                    {label}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* ==================== STEP 1: CART ==================== */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="grid h-full place-items-center gap-3 text-center">
                  <svg className="mx-auto h-16 w-16 text-ink-300" fill="none" viewBox="0 0 24 24" strokeWidth="1.3" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  <p className="text-[14px] text-ink-500">{t('cart_empty')}</p>
                  <button
                    onClick={close}
                    className="rounded-lg bg-accent-500 px-5 py-2.5 text-[13px] font-bold text-white hover:bg-accent-600"
                  >
                    {t('cart_continue_shopping')}
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={`${item.id}-${item.variationId ?? 'default'}`}
                      className="flex gap-3 rounded-xl border border-ink-300 bg-white p-3"
                    >
                      <img
                        src={item.imageUrl || '/vot-cau-long-yonex.jpg'}
                        alt={item.title}
                        className="h-[68px] w-[68px] shrink-0 rounded-lg bg-ink-50 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="ss-line-clamp-2 text-[13px] font-semibold leading-snug text-ink-900">
                          {item.title}
                        </p>
                        {item.variationId && (
                          <span className="mt-1 inline-block rounded bg-ink-100 px-1.5 py-0.5 text-[11px] font-semibold text-ink-700">
                            {item.variationId}U
                          </span>
                        )}
                        <div className="mt-1.5 flex items-center justify-between gap-2">
                          <div className="flex items-center overflow-hidden rounded-md border border-ink-300">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.variationId)}
                              className="px-2.5 py-1 text-[14px] font-bold text-ink-500 hover:bg-ink-50"
                            >
                              −
                            </button>
                            <span className="min-w-[30px] text-center text-[13px] font-bold text-ink-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.variationId)}
                              className="px-2.5 py-1 text-[14px] font-bold text-ink-500 hover:bg-ink-50"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-[14px] font-extrabold text-[#dc2626]">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.variationId)}
                        title={t('cart_remove')}
                        className="self-start rounded p-1 text-ink-300 transition-colors hover:text-[#dc2626]"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink-300 bg-ink-50 px-5 py-4">
                <dl className="space-y-1.5 text-[13.5px]">
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
                  <div className="flex justify-between border-t border-ink-300 pt-2 text-[15px]">
                    <dt className="font-bold text-ink-900">{t('cart_grand_total')}</dt>
                    <dd className="font-extrabold text-[#dc2626]">{formatCurrency(grandTotal)}</dd>
                  </div>
                </dl>

                <button
                  onClick={() => setStep('checkout')}
                  className="mt-3.5 w-full rounded-xl bg-accent-500 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-accent-600"
                >
                  {t('cart_proceed_checkout')}
                </button>
                <button
                  onClick={clearCart}
                  className="mt-2 w-full rounded-lg py-2 text-[12.5px] font-semibold text-ink-500 hover:text-[#dc2626]"
                >
                  {t('cart_clear_all')}
                </button>
              </div>
            )}
          </>
        )}

        {/* ==================== STEP 2: CHECKOUT ==================== */}
        {step === 'checkout' && (
          <form onSubmit={handleCheckoutSubmit} className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {errorMessage && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-[13px] font-medium text-[#b91c1c]">
                  <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                  {errorMessage}
                </div>
              )}

              <div>
                <label className={labelClass}>{t('checkout_name')}</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('checkout_name_placeholder')}
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>{t('checkout_phone')}</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('checkout_phone_placeholder')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t('checkout_email')}</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('checkout_email_placeholder')}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>{t('checkout_address')}</label>
                <textarea
                  name="address"
                  rows={2}
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={t('checkout_address_placeholder')}
                  className={inputClass}
                />
              </div>

              {/* coupon */}
              <div>
                <label className={labelClass}>{t('checkout_coupon_title')}</label>
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder={t('checkout_coupon_placeholder')}
                  className={`${inputClass} uppercase`}
                />
              </div>

              {/* payment */}
              <div>
                <span className={labelClass}>{t('checkout_payment_method')}</span>
                <div className="space-y-2">
                  {[
                    { v: 'COD', title: t('checkout_cod'), desc: t('checkout_cod_desc') },
                    { v: 'Bank Transfer', title: t('checkout_bank'), desc: t('checkout_bank_desc') },
                  ].map((m) => (
                    <label
                      key={m.v}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                        formData.paymentMethod === m.v
                          ? 'border-accent-500 bg-accent-50'
                          : 'border-ink-300 bg-white hover:border-ink-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={m.v}
                        checked={formData.paymentMethod === m.v}
                        onChange={handleInputChange}
                        className="mt-0.5 accent-[#f97316]"
                      />
                      <span>
                        <span className="block text-[13.5px] font-bold text-ink-900">{m.title}</span>
                        <span className="block text-[12px] text-ink-500">{m.desc}</span>
                      </span>
                    </label>
                  ))}
                </div>

                {formData.paymentMethod === 'Bank Transfer' && (
                  <div className="mt-2.5 rounded-lg border border-brand-100 bg-brand-50 p-3.5 text-[12.5px] text-brand-700">
                    <p className="mb-1.5 font-bold">{t('checkout_bank_info')}</p>
                    <p>{t('checkout_bank_name')} <b>{BANK.name}</b></p>
                    <p>{t('checkout_account_number')} <b className="font-mono">{BANK.number}</b></p>
                    <p>{t('checkout_account_name')} <b>{BANK.holder}</b></p>
                  </div>
                )}
              </div>

              {/* summary */}
              <div className="rounded-xl border border-ink-300 bg-ink-50 p-4">
                <p className="mb-2 text-[13px] font-bold text-ink-900">{t('checkout_order_summary')}</p>
                <dl className="space-y-1.5 text-[13px]">
                  <div className="flex justify-between text-ink-700">
                    <dt>{t('checkout_subtotal')}</dt>
                    <dd className="font-semibold text-ink-900">{formatCurrency(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between text-ink-700">
                    <dt>{t('checkout_shipping')}</dt>
                    <dd className="font-semibold text-ink-900">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-600">{t('cart_free_shipping')}</span>
                      ) : (
                        formatCurrency(shippingFee)
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-ink-300 pt-2 text-[15px]">
                    <dt className="font-bold text-ink-900">{t('checkout_grand_total')}</dt>
                    <dd className="font-extrabold text-[#dc2626]">{formatCurrency(grandTotal)}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="border-t border-ink-300 bg-white px-5 py-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-accent-500 py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? t('checkout_submitting') : t('checkout_submit')}
              </button>
              <button
                type="button"
                onClick={() => setStep('cart')}
                className="mt-2 w-full py-2 text-[12.5px] font-semibold text-ink-500 hover:text-ink-900"
              >
                ← {t('checkout_back_to_cart')}
              </button>
            </div>
          </form>
        )}

        {/* ==================== STEP 3: SUCCESS ==================== */}
        {step === 'success' && placedOrderInfo && (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" strokeWidth="2.2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-[19px] font-extrabold text-ink-900">{t('success_message')}</h3>
            <p className="max-w-[34ch] text-[13.5px] leading-relaxed text-ink-500">
              {t('success_description')}
            </p>

            <dl className="w-full space-y-2 rounded-xl border border-ink-300 bg-ink-50 p-4 text-left text-[13.5px]">
              <div className="flex justify-between">
                <dt className="text-ink-500">{t('success_order_id')}</dt>
                <dd className="font-mono font-bold text-accent-600">{placedOrderInfo.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">{t('success_total_payment')}</dt>
                <dd className="font-extrabold text-[#dc2626]">{formatCurrency(placedOrderInfo.total)}</dd>
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

            <button
              onClick={close}
              className="w-full rounded-xl bg-accent-500 py-3.5 text-[14px] font-bold text-white hover:bg-accent-600"
            >
              {t('cart_continue_shopping')}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}

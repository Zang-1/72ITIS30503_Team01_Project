'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { checkoutAction } from '@/app/actions/checkout';

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

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'COD',
  });
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
      setErrorMessage('Họ và tên không được để trống.');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Email không đúng định dạng (Ví dụ: user@example.com).');
      setIsSubmitting(false);
      return;
    }

    // Kiểm tra định dạng số điện thoại Việt Nam (10 chữ số, bắt đầu bằng số 0)
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(trimmedPhone)) {
      setErrorMessage('Số điện thoại không hợp lệ (Phải có 10 chữ số và bắt đầu bằng số 0).');
      setIsSubmitting(false);
      return;
    }

    if (!trimmedAddress) {
      setErrorMessage('Địa chỉ nhận hàng không được để trống.');
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
        setFormData({ name: '', email: '', phone: '', address: '', paymentMethod: 'COD' });
      } else {
        setErrorMessage(result.error || 'Đã xảy ra lỗi khi đặt hàng.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Không thể kết nối đến máy chủ.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-in-out"
        onClick={() => {
          if (!isSubmitting) setIsOpen(false);
        }}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Sliding Panel */}
        <div className="w-screen max-w-md transform transition-all duration-300 ease-in-out">
          <div className="flex h-full flex-col overflow-y-auto bg-zinc-950/95 backdrop-blur-lg border-l border-zinc-800 text-zinc-100 shadow-2xl">
            
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold tracking-wide text-amber-500" id="slide-over-title">
                {step === 'cart' && 'Giỏ Hàng Của Bạn'}
                {step === 'checkout' && 'Thông Tin Giao Hàng'}
                {step === 'success' && 'Đặt Hàng Thành Công!'}
              </h2>
              <div className="ml-3 flex h-7 items-center">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                  className="relative -m-2 p-2 text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  <span className="sr-only">Đóng</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              
              {/* STEP 1: View Cart Items */}
              {step === 'cart' && (
                <>
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <svg className="h-16 w-16 text-zinc-600 mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                      </svg>
                      <p className="text-zinc-400 font-medium">Giỏ hàng của bạn đang trống.</p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="mt-6 px-6 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-500 font-semibold tracking-wide transition-all duration-200"
                      >
                        Tiếp tục mua sắm
                      </button>
                    </div>
                  ) : (
                    <ul role="list" className="-my-6 divide-y divide-zinc-800">
                      {items.map((item) => (
                        <li key={`${item.id}-${item.variationId || 'none'}`} className="flex py-6 transition-all duration-300 hover:bg-zinc-900/40 -mx-4 px-4 rounded-xl">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
                            <img
                              src={item.imageUrl || '/vot-cau-long-yonex.jpg'}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-semibold text-zinc-100">
                                <h3 className="line-clamp-2 pr-2 text-sm">
                                  {item.title} {item.variationId && <span className="text-amber-500 font-bold">({item.variationId}U)</span>}
                                </h3>
                                <p className="ml-4 text-sm whitespace-nowrap text-amber-500">{formatCurrency(item.price)}</p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              {/* Quantity control */}
                              <div className="flex items-center border border-zinc-800 rounded-md bg-zinc-900 overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1, item.variationId)}
                                  className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 font-semibold text-xs text-zinc-200">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.variationId)}
                                  className="px-2 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                                >
                                  +
                                </button>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => removeFromCart(item.id, item.variationId)}
                                  className="font-medium text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                  </svg>
                                  <span>Xóa</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {/* STEP 2: Checkout Form */}
              {step === 'checkout' && (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Họ và Tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nguyễn Văn A"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Địa chỉ Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="anguyen@gmail.com"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Số Điện Thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0912345678"
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                      Địa chỉ nhận hàng <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      required
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố..."
                      className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-sm text-white placeholder-zinc-500 focus:outline-hidden focus:ring-1 focus:ring-amber-500 focus:border-amber-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Phương thức thanh toán <span className="text-red-500">*</span>
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="COD"
                          checked={formData.paymentMethod === 'COD'}
                          onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                          className="text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-950 bg-zinc-950 border-zinc-800 cursor-pointer"
                        />
                        <div className="text-sm">
                          <span className="block font-semibold text-white">Thanh toán khi nhận hàng (COD)</span>
                          <span className="block text-xs text-zinc-500">Thanh toán bằng tiền mặt khi giao hàng tận nơi.</span>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Bank Transfer"
                          checked={formData.paymentMethod === 'Bank Transfer'}
                          onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value }))}
                          className="text-amber-500 focus:ring-amber-500 focus:ring-offset-zinc-950 bg-zinc-950 border-zinc-800 cursor-pointer"
                        />
                        <div className="text-sm">
                          <span className="block font-semibold text-white">Chuyển khoản ngân hàng trực tiếp</span>
                          <span className="block text-xs text-zinc-500">Chuyển khoản tới tài khoản ngân hàng của cửa hàng.</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'Bank Transfer' && (
                    <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-xs space-y-2 animate-fade-in">
                      <h4 className="font-bold text-amber-500 uppercase tracking-wider mb-1">Thông tin chuyển khoản ngân hàng:</h4>
                      <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                        <span className="text-zinc-400">Ngân hàng (Bank):</span>
                        <strong className="text-white">ABC Bank</strong>
                      </div>
                      <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                        <span className="text-zinc-400">Số tài khoản (Account):</span>
                        <strong className="text-white">123456789</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Tên tài khoản (Name):</span>
                        <strong className="text-white">GROUP 1</strong>
                      </div>
                    </div>
                  )}

                  {/* Order Summary inside Checkout */}
                  <div className="mt-6 rounded-lg bg-zinc-900 p-4 border border-zinc-800">
                    <h4 className="text-xs font-semibold uppercase text-zinc-400 mb-2">Tóm tắt đơn hàng</h4>
                    <div className="space-y-1.5 text-xs text-zinc-300">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.variationId || 'none'}`} className="flex justify-between">
                          <span className="truncate pr-4">
                            {item.title} {item.variationId && <span className="text-amber-500 font-bold">({item.variationId}U)</span>} <strong className="text-amber-500">x{item.quantity}</strong>
                          </span>
                          <span className="whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-zinc-800 space-y-1.5 text-xs">
                        <div className="flex justify-between text-zinc-450">
                          <span>Tạm tính (Subtotal):</span>
                          <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-zinc-450">
                          <span>Phí vận chuyển (Shipping):</span>
                          <span>{shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-sm text-white pt-2 border-t border-zinc-800 mt-1">
                          <span>Tổng cộng (Grand Total):</span>
                          <span className="text-amber-500">{formatCurrency(grandTotal)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* STEP 3: Success Screen */}
              {step === 'success' && placedOrderInfo && (
                <div className="flex flex-col items-center justify-center text-center py-8">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500 mb-6">
                    <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Đã nhận được đơn hàng!</h3>
                  <p className="text-sm text-zinc-400 max-w-xs mb-6">
                    Cảm ơn bạn đã mua hàng tại hệ thống. Đơn hàng của bạn đang được xử lý.
                  </p>
                  
                  <div className="w-full rounded-lg bg-zinc-900 p-4 border border-zinc-800 text-left text-xs mb-8 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Mã đơn hàng (Order ID):</span>
                      <strong className="text-white">#{placedOrderInfo.id}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Trạng thái:</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-semibold">Chờ xác nhận</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-zinc-800 font-bold">
                      <span className="text-zinc-300">Tổng thanh toán:</span>
                      <span className="text-amber-500">{formatCurrency(placedOrderInfo.total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setStep('cart');
                      setIsOpen(false);
                    }}
                    className="w-full px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-lg transition-all"
                  >
                    Tiếp tục mua sắm
                  </button>
                </div>
              )}

            </div>

            {/* Footer / Action Area */}
            {items.length > 0 && step !== 'success' && (
              <div className="border-t border-zinc-800 px-6 py-6 bg-zinc-900/50">
                 {step === 'cart' && (
                  <>
                    <div className="space-y-2 mb-6 text-sm">
                      <div className="flex justify-between text-zinc-400">
                        <span>Tạm tính (Subtotal):</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Phí vận chuyển (Shipping):</span>
                        <span>{shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800 mt-1">
                        <span>Tổng cộng (Grand Total):</span>
                        <span className="text-lg text-amber-500">{formatCurrency(grandTotal)}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => setStep('checkout')}
                        className="w-full flex items-center justify-center rounded-lg bg-amber-600 px-6 py-3.5 text-base font-bold text-white shadow-sm hover:bg-amber-500 transition-all duration-200"
                      >
                        Tiến hành đặt hàng
                      </button>
                      <button
                        onClick={clearCart}
                        className="w-full py-2.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                      >
                        Xóa toàn bộ giỏ hàng
                      </button>
                    </div>
                  </>
                )}

                {step === 'checkout' && (
                  <div className="space-y-3">
                    <button
                      type="submit"
                      form="checkout-form"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center rounded-lg bg-emerald-600 px-6 py-3.5 text-base font-bold text-white shadow-sm hover:bg-emerald-500 disabled:opacity-50 transition-all duration-200"
                    >
                      {isSubmitting ? 'Đang xử lý đặt hàng...' : 'Xác Nhận Đặt Hàng'}
                    </button>
                    <button
                      onClick={() => setStep('cart')}
                      disabled={isSubmitting}
                      className="w-full py-2.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
                    >
                      Quay lại giỏ hàng
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

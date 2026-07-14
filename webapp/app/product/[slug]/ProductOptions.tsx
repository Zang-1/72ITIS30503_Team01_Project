"use client";

import React, { useState, useEffect } from 'react';

type Variation = {
  value: string;
  sku: string;
  stockStatus: string;
  stockQty: number;
};

export default function ProductOptions({ slug }: { slug: string }) {
  const [variations, setVariations] = useState<Variation[]>([]);
  const [selectedVariation, setSelectedVariation] = useState<Variation | null>(null);
  const [loading, setLoading] = useState(true);

  // Dùng useEffect để fetch dữ liệu từ Edge API (Tính năng Real-time Specifications)
  useEffect(() => {
    if (!slug) return;
    fetch(`/api/specifications?slug=${slug}`)
      .then(res => res.json())
      .then(data => {
        setVariations(data.specifications);
        setSelectedVariation(data.specifications[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải thông số real-time:", err);
        setLoading(false);
      });
  }, [slug]);

  // Hiển thị chữ Loading trong lúc chờ Edge API trả dữ liệu
  if (loading) {
    return (
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#1e1e1e', borderRadius: '8px' }}>
        <p style={{ color: '#17a2b8', fontStyle: 'italic' }}>⚡ Đang tải thông số từ Edge Runtime...</p>
      </div>
    );
  }

  if (!selectedVariation) return null;

  return (
    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#1e1e1e', borderRadius: '8px' }}>
      <h3 style={{ color: '#17a2b8', marginBottom: '15px' }}>Tùy chọn trọng lượng</h3>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        {variations.map((v) => (
          <label
            key={v.value}
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '10px 15px',
              border: selectedVariation.value === v.value ? '2px solid #fd7e14' : '1px solid #444',
              borderRadius: '5px',
              backgroundColor: selectedVariation.value === v.value ? '#331a00' : '#222'
            }}
          >
            <input
              type="radio"
              name="weight"
              value={v.value}
              checked={selectedVariation.value === v.value}
              onChange={() => setSelectedVariation(v)}
              style={{ marginRight: '8px' }}
            />
            {v.value}
          </label>
        ))}
      </div>

      <div style={{ padding: '15px', backgroundColor: '#2d2d2d', borderLeft: '4px solid #17a2b8', borderRadius: '4px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
          <strong>SKU:</strong> {selectedVariation.sku}
        </p>
        <p style={{ margin: '0', fontSize: '18px', color: selectedVariation.stockQty > 0 ? '#28a745' : '#dc3545' }}>
          <strong>Tình trạng:</strong> {selectedVariation.stockQty > 0 ? `Còn ${selectedVariation.stockQty} sản phẩm` : 'Hết hàng'}
        </p>
      </div>
    </div>
  );
}

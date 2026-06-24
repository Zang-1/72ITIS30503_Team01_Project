import Navbar from './Navbar';

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '40px', fontFamily: 'Arial', color: '#fff' }}>
        <h1 style={{ color: '#fd7e14' }}>Hệ Thống Quản Lý B2C - Nhóm 1</h1>
        <p>Cửa hàng chuyên cung cấp đồ thể thao</p>
      </main>
    </div>
  );
}
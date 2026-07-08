import Navbar from '../Navbar';

export default function AccountPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', color: 'var(--text-white)' }}>
      <Navbar />
      <main style={{ padding: 'var(--main-padding)' }}>
        <h1 style={{ color: 'var(--accent-orange)' }}>Đây là trang Tài Khoản (Account)</h1>
      </main>
    </div>
  );
}

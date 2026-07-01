import Navbar from '../Navbar';

export default function CartPage() {
    return (
        <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
            <Navbar />
            <main style={{ padding: '40px' }}>
                <h1 style={{ color: '#fd7e14' }}>Đây là trang Giỏ Hàng (Cart)</h1>
            </main>
        </div>
    );
}

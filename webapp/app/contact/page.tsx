import Navbar from '../Navbar';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <Navbar />

      <main className="p-10 max-w-4xl mx-auto flex-grow w-full mt-10">
        <h1 className="text-4xl font-bold text-orange-500 mb-8 border-l-4 border-orange-500 pl-4">
          Contact Us
        </h1>
        
        <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Our Business Address</h2>
            <p className="text-gray-400">123 SportStore Avenue, District 1, Ho Chi Minh City, Vietnam</p>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Email Us</h2>
            <p className="text-gray-400">support@sportstore.com</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Call Hotline</h2>
            <p className="text-gray-400">+84 123 456 789</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Delivery Policies</h2>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Free shipping for orders over $500.</li>
              <li>Standard delivery within 3-5 business days.</li>
              <li>Express delivery available for selected areas.</li>
              <li>Returns accepted within 14 days of receipt.</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="bg-[#1a1a1a] text-center p-6 border-t border-gray-800 mt-auto">
        <p className="text-gray-500">© 2026 SportStore. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="/contact" className="text-orange-500 hover:text-orange-400">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}
import Navbar from '../../Navbar';
import CategoryContent from '@/components/CategoryContent';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <CategoryContent slug={slug} />
    </div>
  );
}
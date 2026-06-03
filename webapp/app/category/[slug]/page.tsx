export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <h1>Trang Danh Muc - Dong: {params.slug}</h1>;
}
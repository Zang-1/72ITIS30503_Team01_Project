/**
 * Category names come straight from the database (Vietnamese only).
 * This dictionary mirrors the pattern already used for product titles
 * (see ProductCard.tsx / ProductDetailContent.tsx) so the English UI
 * doesn't show raw Vietnamese category names.
 */
const CATEGORY_NAME_EN: Record<string, string> = {
  'Đồ Cầu Lông': 'Badminton Equipment',
  'Tennis': 'Tennis',
  'Pickleball': 'Pickleball',
  'Vợt Cầu Lông': 'Badminton Rackets',
  'Giày Cầu Lông': 'Badminton Shoes',
  'Balo Cầu Lông': 'Badminton Bags',
  'Tất Cầu Lông': 'Badminton Socks',
  'Phụ Kiện Cầu Lông': 'Badminton Accessories',
  'Vợt Tennis': 'Tennis Rackets',
  'Giày Tennis': 'Tennis Shoes',
  'Bóng & Phụ Kiện Tennis': 'Tennis Balls & Accessories',
  'Vợt Pickleball': 'Pickleball Paddles',
  'Bóng Pickleball': 'Pickleball Balls',
  'Phụ Kiện Pickleball': 'Pickleball Accessories',
};

export function translateCategoryName(name: string, locale: string): string {
  if (locale !== 'en') return name;
  return CATEGORY_NAME_EN[name] ?? name;
}

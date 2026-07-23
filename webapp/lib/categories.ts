import { prisma } from '@/lib/prisma';

export interface NavChild {
  id: number;
  name: string;
  slug: string;
}
export interface NavParent extends NavChild {
  children: NavChild[];
}

/**
 * Reads the real Category hierarchy from the database so the navigation menu
 * can never drift away from the catalog. Replaces the previously hard-coded tree.
 */
export async function getCategoryTree(): Promise<NavParent[]> {
  try {
    const parents = await prisma.category.findMany({
      where: { parentId: null },
      orderBy: { id: 'asc' },
      include: { children: { orderBy: { id: 'asc' } } },
    });

    return parents.map((p: (typeof parents)[number]) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      children: p.children.map((c: (typeof p.children)[number]) => ({ id: c.id, name: c.name, slug: c.slug })),
    }));
  } catch {
    return [];
  }
}

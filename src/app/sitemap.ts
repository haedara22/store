import { MetadataRoute } from 'next';
import { db, products, categories } from '@/db';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/order-tracking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  try {
    // Products
    const productsData = await db.query.products.findMany({
      columns: {
        slug: true,
        updatedAt: true,
      },
    });

    const productPages: MetadataRoute.Sitemap = productsData.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Categories
    const categoriesData = await db.query.categories.findMany({
      columns: {
        slug: true,
        updatedAt: true,
      },
    });

    const categoryPages: MetadataRoute.Sitemap = categoriesData.map((category) => ({
      url: `${siteUrl}/products?category=${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    return [...staticPages, ...productPages, ...categoryPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticPages;
  }
}

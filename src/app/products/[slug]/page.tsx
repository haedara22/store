import { notFound } from 'next/navigation';
import { db, products } from '@/db';
import { eq, and, ne } from 'drizzle-orm';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { ProductCard } from '@/components/products/ProductCard';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

async function getProduct(slug: string) {
  try {
    return await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)] },
        category: true,
        variants: true,
      },
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

async function getRelatedProducts(productId: string, categoryId: string) {
  try {
    return await db.query.products.findMany({
      where: and(
        eq(products.categoryId, categoryId),
        ne(products.id, productId)
      ),
      with: {
        images: { orderBy: (images, { asc }) => [asc(images.order)] },
        category: true,
      },
      limit: 4,
    });
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.categoryId);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-zinc-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
          
          {/* Breadcrumb - Compact */}
          <nav className="flex items-center gap-1.5 text-[10px] sm:text-xs text-zinc-500 mb-5 sm:mb-6 flex-wrap">
            <a href="/" className="hover:text-orange-600 transition-colors font-medium">الرئيسية</a>
            <span className="text-zinc-400">/</span>
            <a href="/products" className="hover:text-orange-600 transition-colors font-medium">المنتجات</a>
            {product.category && (
              <>
                <span className="text-zinc-400">/</span>
                <a 
                  href={`/products?category=${product.category.slug}`}
                  className="hover:text-orange-600 transition-colors font-medium"
                >
                  {product.category.name}
                </a>
              </>
            )}
            <span className="text-zinc-400">/</span>
            <span className="text-zinc-900 font-semibold truncate max-w-[120px] sm:max-w-[200px]">{product.name}</span>
          </nav>

          {/* Product Details - Compact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            <ProductGallery images={product.images} productName={product.name} />
            <ProductInfo product={product} />
          </div>

          {/* Product Description - Compact */}
          {product.description && (
            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-zinc-200 mb-6 sm:mb-8">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 tracking-tight">وصف المنتج</h2>
              <div className="prose prose-neutral max-w-none">
                <p className="text-sm text-zinc-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            </div>
          )}

          {/* Specifications - Compact */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="bg-white rounded-lg p-4 sm:p-5 shadow-sm border border-zinc-200 mb-6 sm:mb-8">
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 mb-3 tracking-tight">المواصفات</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2.5 p-2.5 bg-zinc-50 rounded-lg border border-zinc-100">
                    <span className="font-semibold text-xs sm:text-sm text-zinc-900 min-w-[80px] sm:min-w-[100px]">{key}:</span>
                    <span className="text-xs sm:text-sm text-zinc-600">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products - Compact */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 mb-4 sm:mb-5 tracking-tight">
                منتجات ذات صلة
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
import { pgTable, text, integer, timestamp, boolean, json, serial, varchar, numeric } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Categories table
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Products table
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  price: integer('price').notNull(), // بالليرة السورية الجديدة
  compareAtPrice: integer('compare_at_price'), // السعر قبل الخصم
  categoryId: text('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  stock: integer('stock').notNull().default(0),
  specifications: json('specifications').$type<Record<string, string>>(),
  featured: boolean('featured').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Product images table
export const productImages = pgTable('product_images', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  alt: text('alt'),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Product variants table (for color, size, etc.)
export const productVariants = pgTable('product_variants', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  name: text('name').notNull(), // اللون، الحجم، إلخ
  value: text('value').notNull(), // أحمر، كبير، إلخ
  priceModifier: integer('price_modifier').notNull().default(0),
  stockModifier: integer('stock_modifier').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Orders table
export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone').notNull(),
  governorate: text('governorate').notNull(),
  area: text('area').notNull(),
  address: text('address').notNull(),
  notes: text('notes'),
  paymentMethod: text('payment_method').notNull(), // cash, shamcash
  paymentStatus: text('payment_status').notNull().default('pending'), // pending, verified, rejected, completed
  paymentProofUrl: text('payment_proof_url'),
  status: text('status').notNull().default('pending'), // pending, awaiting_payment, payment_verification, confirmed, processing, ready, delivered, cancelled
  subtotal: integer('subtotal').notNull(),
  total: integer('total').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Order items table
export const orderItems = pgTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  productId: text('product_id').references(() => products.id, { onDelete: 'set null' }),
  productName: text('product_name').notNull(),
  productPrice: integer('product_price').notNull(),
  quantity: integer('quantity').notNull(),
  total: integer('total').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Store settings table
export const storeSettings = pgTable('store_settings', {
  id: text('id').primaryKey(),
  storeName: text('store_name').notNull(),
  logo: text('logo'),
  phone: text('phone').notNull(),
  whatsapp: text('whatsapp').notNull(),
  address: text('address').notNull(),
  workingHours: text('working_hours'),
  heroProductId: text('hero_product_id').references(() => products.id, { onDelete: 'set null' }), // المنتج المميز في Hero
  shamcashAccountName: text('shamcash_account_name'),
  shamcashAccountNumber: text('shamcash_account_number'),
  shamcashQrCode: text('shamcash_qr_code'),
  facebook: text('facebook'),
  instagram: text('instagram'),
  twitter: text('twitter'),
  tiktok: text('tiktok'),
  youtube: text('youtube'),
  telegram: text('telegram'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Admin users table
export const adminUsers = pgTable('admin_users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  images: many(productImages),
  variants: many(productVariants),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, {
    fields: [productImages.productId],
    references: [products.id],
  }),
}));

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

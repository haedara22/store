// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  categoryId: string;
  stock: number;
  specifications: Record<string, string> | null;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  images?: ProductImage[];
  category?: Category;
  variants?: ProductVariant[];
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string | null;
  order: number;
  createdAt: Date;
}

export interface ProductVariant {
  id: string;
  productId: string;
  name: string;
  value: string;
  priceModifier: number;
  stockModifier: number;
  createdAt: Date;
}

// Category types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  products?: Product[];
}

// Order types
export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  governorate: string;
  area: string;
  address: string;
  notes: string | null;
  paymentMethod: 'cash' | 'shamcash';
  paymentStatus: 'pending' | 'verified' | 'rejected' | 'completed';
  paymentProofUrl: string | null;
  status: 'pending' | 'awaiting_payment' | 'payment_verification' | 'confirmed' | 'processing' | 'ready' | 'delivered' | 'cancelled';
  subtotal: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string | null;
  productName: string;
  productPrice: number;
  quantity: number;
  total: number;
  createdAt: Date;
  product?: Product;
}

// Cart types
export interface CartItem {
  productId: string;
  productName: string;
  productSlug: string;
  price: number;
  quantity: number;
  stock: number;
  image: string | null;
}

// Store settings types
export interface StoreSettings {
  id: string;
  storeName: string;
  logo: string | null;
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: string | null;
  shamcashAccountName: string | null;
  shamcashAccountNumber: string | null;
  shamcashQrCode: string | null;
  facebook: string | null;
  instagram: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Admin types
export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
}

export interface AdminSession {
  id: string;
  username: string;
  expiresAt: number;
}

// Form types
export interface CheckoutFormData {
  customerName: string;
  customerPhone: string;
  governorate: string;
  area: string;
  address: string;
  notes: string;
  paymentMethod: 'cash' | 'shamcash';
  items: CartItem[];
  subtotal: number;
  total: number;
  paymentProofUrl?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Filter types
export interface ProductFilters {
  search?: string;
  category?: string;
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'oldest';
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

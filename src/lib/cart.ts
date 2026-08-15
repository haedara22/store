'use client';

import { CartItem } from '@/types';
import { STORAGE_KEYS } from './constants';

/**
 * Get cart from localStorage
 */
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem(STORAGE_KEYS.CART);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart:', error);
    return [];
  }
}

/**
 * Save cart to localStorage
 */
export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    // Dispatch event for components to listen
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
}

/**
 * Add item to cart
 */
export function addToCart(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(i => i.productId === item.productId);

  if (existingItemIndex > -1) {
    // Update quantity if item exists
    const newQuantity = cart[existingItemIndex].quantity + quantity;
    const maxQuantity = cart[existingItemIndex].stock;
    
    cart[existingItemIndex].quantity = Math.min(newQuantity, maxQuantity);
  } else {
    // Add new item
    cart.push({
      ...item,
      quantity: Math.min(quantity, item.stock),
    });
  }

  saveCart(cart);
}

/**
 * Update cart item quantity
 */
export function updateCartItemQuantity(productId: string, quantity: number): void {
  const cart = getCart();
  const itemIndex = cart.findIndex(i => i.productId === productId);

  if (itemIndex > -1) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.splice(itemIndex, 1);
    } else {
      // Update quantity, but not more than stock
      const maxQuantity = cart[itemIndex].stock;
      cart[itemIndex].quantity = Math.min(quantity, maxQuantity);
    }
    saveCart(cart);
  }
}

/**
 * Remove item from cart
 */
export function removeFromCart(productId: string): void {
  const cart = getCart();
  const filteredCart = cart.filter(item => item.productId !== productId);
  saveCart(filteredCart);
}

/**
 * Clear entire cart
 */
export function clearCart(): void {
  saveCart([]);
}

/**
 * Get cart item count
 */
export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get cart total price
 */
export function getCartTotal(cart?: CartItem[]): number {
  const cartItems = cart || getCart();
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Check if product is in cart
 */
export function isInCart(productId: string): boolean {
  const cart = getCart();
  return cart.some(item => item.productId === productId);
}

/**
 * Get cart item by product ID
 */
export function getCartItem(productId: string): CartItem | undefined {
  const cart = getCart();
  return cart.find(item => item.productId === productId);
}

/**
 * Validate cart items against current stock
 */
export async function validateCart(): Promise<{
  valid: boolean;
  errors: string[];
  updatedCart: CartItem[];
}> {
  const cart = getCart();
  const errors: string[] = [];
  const updatedCart: CartItem[] = [];

  for (const item of cart) {
    try {
      // Fetch current product data
      const response = await fetch(`/api/products/${item.productId}`);
      if (!response.ok) {
        errors.push(`المنتج "${item.productName}" لم يعد متوفراً`);
        continue;
      }

      const product: any = await response.json();

      // Check if product is out of stock
      if (product.stock <= 0) {
        errors.push(`المنتج "${item.productName}" غير متوفر حالياً`);
        continue;
      }

      // Check if requested quantity is available
      if (item.quantity > product.stock) {
        errors.push(`الكمية المطلوبة من "${item.productName}" غير متوفرة. المتوفر: ${product.stock}`);
        updatedCart.push({
          ...item,
          quantity: product.stock,
          stock: product.stock,
        });
      } else {
        updatedCart.push({
          ...item,
          stock: product.stock,
        });
      }

      // Check if price changed
      if (item.price !== product.price) {
        errors.push(`تم تحديث سعر "${item.productName}"`);
        updatedCart[updatedCart.length - 1].price = product.price;
      }
    } catch (error) {
      console.error(`Error validating cart item ${item.productId}:`, error);
      errors.push(`خطأ في التحقق من "${item.productName}"`);
    }
  }

  // Update cart if there are changes
  if (updatedCart.length < cart.length || errors.length > 0) {
    saveCart(updatedCart);
  }

  return {
    valid: errors.length === 0,
    errors,
    updatedCart,
  };
}

/**
 * Merge cart from different sources (e.g., after login)
 */
export function mergeCart(serverCart: CartItem[]): void {
  const localCart = getCart();
  const merged = [...serverCart];

  localCart.forEach(localItem => {
    const existingIndex = merged.findIndex(item => item.productId === localItem.productId);
    
    if (existingIndex > -1) {
      // Combine quantities
      merged[existingIndex].quantity = Math.min(
        merged[existingIndex].quantity + localItem.quantity,
        merged[existingIndex].stock
      );
    } else {
      // Add item from local cart
      merged.push(localItem);
    }
  });

  saveCart(merged);
}

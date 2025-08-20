// A small utility to manage cart in localStorage

import type { BE_Product, Cart_Product } from "../types/EntitiesTypes";

export const getCart = (name: string): Cart_Product[] => {
  return JSON.parse(localStorage.getItem(name) || "[]");
};

export const addToCart = (product: BE_Product): boolean => {
  const cart: Cart_Product[] = getCart(product.qty == 0 ? "wishlist" : "cart");

  const existingIndex = cart.findIndex((item: Cart_Product) => item.p_id === product.id);

  if (existingIndex !== -1) {
    return true;
  } else {
    cart.push({ p_id: product.id, qty: 1 });
  }

  localStorage.setItem(product.qty == 0 ? "wishlist" : "cart", JSON.stringify(cart));
  return false;
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};

// update quantity for a product
// export const updateQuantity = (id: number, qty: number) => {
//   const cart = getCart(qty == 0 ? "wishlist" : "cart");
//   const idx = cart.findIndex((item: any) => item.id === id);
//   if (idx !== -1) {
//     cart[idx].quantity = Math.max(1, qty); // don’t allow 0
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }
// };

// remove product from cart
export const removeFromCart = (p_id: number, type: string): boolean => {
  const cart = getCart(type);
  const newCart = cart.filter((item: Cart_Product) => item.p_id !== p_id);
  if (newCart.length === cart.length) {
    return false; // item not found
  }
  localStorage.setItem(type, JSON.stringify(newCart));
  return true;
};


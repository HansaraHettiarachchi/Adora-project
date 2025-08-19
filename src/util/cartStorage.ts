// A small utility to manage cart in localStorage

export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const addToCart = (product: any) => {
  const cart = getCart();
  const existingIndex = cart.findIndex((item: any) => item.id === product.id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};

// update quantity for a product
export const updateQuantity = (id: number, qty: number) => {
  const cart = getCart();
  const idx = cart.findIndex((item: any) => item.id === id);
  if (idx !== -1) {
    cart[idx].quantity = Math.max(1, qty); // don’t allow 0
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// remove product from cart
export const removeFromCart = (id: number) => {
  const cart = getCart().filter((item: any) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

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

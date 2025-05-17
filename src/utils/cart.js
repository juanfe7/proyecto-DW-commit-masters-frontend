export const getCart = () => {
  const storage = localStorage.getItem('remember') === 'true' ? localStorage : sessionStorage;
  const cart = storage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product) => {
  const storage = localStorage.getItem('remember') === 'true' ? localStorage : sessionStorage;
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  storage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (productId) => {
  const storage = localStorage.getItem('remember') === 'true' ? localStorage : sessionStorage;
  const cart = getCart().filter(item => item.id !== productId);
  storage.setItem('cart', JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  sessionStorage.removeItem('cart');
};

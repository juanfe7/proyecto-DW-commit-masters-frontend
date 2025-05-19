// Determina donde guardar el carrito
const getStorage = () =>
  localStorage.getItem('remember') === 'true' ? localStorage : sessionStorage;

// Devuelve el carrito actual
export const getCart = () => {
  const storage = getStorage();
  const cart = storage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Añade un producto al carrito (o incrementa cantidad si ya existe)
export const addToCart = (product) => {
  const storage = getStorage();
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  storage.setItem('cart', JSON.stringify(cart));
};

// Elimina un producto del carrito por ID
export const removeFromCart = (productId) => {
  const storage = getStorage();
  const cart = getCart().filter(item => item.id !== productId);
  storage.setItem('cart', JSON.stringify(cart));
};

// Vacia por completo el carrito (ambos storages)
export const clearCart = () => {
  localStorage.removeItem('cart');
  sessionStorage.removeItem('cart');
};

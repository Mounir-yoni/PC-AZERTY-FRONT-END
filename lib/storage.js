// Store user data in localStorage
export function setUser(user) {
  console.log("local")
  console.log(user.user)
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user.user));
  }
}

export function setToken(token) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
}

// Get user data from localStorage
export function getUser() {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
}

// Get token from localStorage
export function getToken() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

// Remove user data from localStorage
export function removeUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
}

// Generic helpers (optional)
export function setItem(key, value) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getItem(key) {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
}

export function removeItem(key) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
} 

export function addToCart(product) {
  if (typeof window !== 'undefined') {
    const cart = getCart();
    const existingItem = cart.find(item => item._id === product._id || item.id === product.id);
    
    if (existingItem) {
      // Update quantity if product already exists
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // Add new product with quantity 1
      cart.push({
        ...product,
        quantity: 1
      });
    }
    
    setItem('cart', cart);
    return cart;
  }
  return [];
}

export function getCart() {
  if (typeof window !== 'undefined') {
    return getItem('cart') || [];
  }
  return [];
}

export function removeFromCart(productId) {
  if (typeof window !== 'undefined') {
    const cart = getCart();
    const updatedCart = cart.filter(item => item._id !== productId && item.id !== productId);
    setItem('cart', updatedCart);
    return updatedCart;
  }
  return [];
}

export function updateCartItemQuantity(productId, quantity) {
  if (typeof window !== 'undefined') {
    const cart = getCart();
    const updatedCart = cart.map(item => {
      if (item._id === productId || item.id === productId) {
        return { ...item, quantity: Math.max(0, quantity) };
      }
      return item;
    }).filter(item => item.quantity > 0); // Remove items with 0 quantity
    
    setItem('cart', updatedCart);
    return updatedCart;
  }
  return [];
}

export function clearCart() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('cart');
  }
}

export function getCartItemCount() {
  if (typeof window !== 'undefined') {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }
  return 0;
}
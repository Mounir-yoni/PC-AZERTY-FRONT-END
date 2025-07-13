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
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting user from localStorage:', error);
      return null;
    }
  }
  return null;
}

// Get token from localStorage
export function getToken() {
  if (typeof window !== 'undefined') {
    try {
      return localStorage.getItem('token');
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
      return null;
    }
  }
  return null;
}

// Remove user data from localStorage
export function removeUser() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  }
}

// Generic helpers (optional)
export function setItem(key, value) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting item in localStorage:', error);
    }
  }
}

export function getItem(key) {
  if (typeof window !== 'undefined') {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting item from localStorage:', error);
      return null;
    }
  }
  return null;
}

export function removeItem(key) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item from localStorage:', error);
    }
  }
} 

export function addToCart(product) {
  if (typeof window !== 'undefined') {
    try {
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
    } catch (error) {
      console.error('Error adding to cart:', error);
      return [];
    }
  }
  return [];
}

export function getCart() {
  if (typeof window !== 'undefined') {
    try {
      return getItem('cart') || [];
    } catch (error) {
      console.error('Error getting cart from localStorage:', error);
      return [];
    }
  }
  return [];
}

export function removeFromCart(productId) {
  if (typeof window !== 'undefined') {
    try {
      const cart = getCart();
      const updatedCart = cart.filter(item => item._id !== productId && item.id !== productId);
      setItem('cart', updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return [];
    }
  }
  return [];
}

export function updateCartItemQuantity(productId, quantity) {
  if (typeof window !== 'undefined') {
    try {
      const cart = getCart();
      const updatedCart = cart.map(item => {
        if (item._id === productId || item.id === productId) {
          return { ...item, quantity: Math.max(0, quantity) };
        }
        return item;
      }).filter(item => item.quantity > 0); // Remove items with 0 quantity
      
      setItem('cart', updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      return [];
    }
  }
  return [];
}

export function clearCart() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  }
}

export function getCartItemCount() {
  if (typeof window !== 'undefined') {
    try {
      const cart = getCart();
      return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    } catch (error) {
      console.error('Error getting cart item count:', error);
      return 0;
    }
  }
  return 0;
}
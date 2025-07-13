import axios from 'axios';
import { setUser, getUser, removeUser,setToken } from '@/lib/storage';

// Set your backend base URL here
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://pc-azerty-backend.onrender.com/api/v1',
});

// Login
export async function login({ email, password }) {
  console.log(`Logging in with email: ${email}`); // Debugging line
  
  try {
    const res = await api.post('/Auth/login', { email, password });
    setUser(res.data.user); // Store user data in localStorage
    setToken(res.data.token); // Set the token in axios headers
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// Get all products
export async function getProducts(sort = "-createdAt") {
  try {
    const res = await api.get(`/products?sort=${sort}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}
// Get all products
export async function getHomeProducts() {
  try {
    const res = await api.get('/products/homepage-products');
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// Get a single product by ID
export async function getProduct(id) {
  try {
    const res = await api.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}


// Get comments for a product
export async function getComments(productId) {
  try {
    const res = await api.get(`/comments/product/${productId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}
// Get Category for a product
export async function getCategory(productId) {
  try {
    const res = await api.get(`/categories`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// Add a new product
export async function addProduct(productData) {
  try {
    const res = await api.post('/products', productData);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// Add a comment to a product
export async function addComment(productId, commentData,token) {
  try {
    console.log(commentData)
    const res = await api.post(`/comments`, {
      product: productId,
      comment: commentData.comment,
    },{
      headers: {
        Authorization: `Bearer ${token || getUser()?.token}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// Order a product
export async function orderProduct(orderData) {
  try {
    const res = await api.post('/orders', orderData);
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// Sign Up
export async function signup(userData) {
  console.log(`Signing up with email: ${userData.name}`); // Debugging line
  try {
    const res = await api.post('/Auth/signup', {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      passwordConfirm: userData.password,
    });
    console.log(res.data); // Debugging line
    setUser(res.data.data.user); // Store user data in localStorage
    setToken(res.data.token); // Set the token in axios headers
    return res.data;
  } catch (err) {
    throw err.response?.data || err;
  }
}

// You can add more API functions as needed, following the same pattern. 
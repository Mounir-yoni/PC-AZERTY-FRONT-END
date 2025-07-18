import axios from 'axios';
import { setUser, getUser, removeUser,setToken,getCart, getToken,removeItem } from '@/lib/storage';

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
    const res = await api.get(`/products?sort=${sort}&limit=50`);
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
  console.log(`Signing up with email: ${userData}`); // Debugging line
  try {
    const res = await api.post('/Auth/signup', {
      email: userData.email,
      password: userData.password,
      name: userData.name,
      phone:userData.phone,
      address: userData.address,
      passwordConfirm: userData.password,
    });
    console.log(res.data); // Debugging line
    setUser(res.data.data.user); // Store user data in localStorage
    setToken(res.data.token); // Set the token in axios headers
    return res.data;
  } catch (err) {
    console.error("Signup error:", err);
    throw err.response?.data || err;
  }
}

// You can add more API functions as needed, following the same pattern. 


export async function addOrder({  address }) {
  try {
    const user = getUser();
    const cart = getCart();
    const token = getToken();
    if (!cart || cart.length === 0) {
      throw new Error("Cart is empty");
    }

    // تحضير البيانات لتطابق الموديل
    const products = cart.map(item => ({
      product: item._id,
      quantity: item.quantity || 1,
      price: item.price
    }));

    const totalValue = products.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    const phone = user.phone
    const orderPayload = {
      products,
      totalValue,
      //sender,     // يجب أن يكون ObjectId للمستخدم
      //address,
      phone
      // orderDate سيتولد تلقائيًا في الموديل
    };

    // إرسال الطلب إلى السيرفر
    const res = await api.post(
      '/orders',
      orderPayload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    removeItem('cart'); // Clear cart after successful order
    window.location.href = '/'; // Redirect to orders page
    return res.data;
  } catch (err) {
    console.error("Failed to add order:", err);
    throw err.response?.data || err;
  }
}


export async function gettheparts(partname) {
  try {
    console.log("Searching for part:", partname);
    const res = await api.get('/products/parts-products', {
      params: { partname }
    });
    console.log("Parts found:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error getting parts:", err);
    throw err.response?.data || err;
  }
}


export async function gethomepagestatistic() {
  try {
    const res = await api.get('/admin/monthly-statistics',{
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error getting homepage statistics:", err);
    throw err.response?.data || err;
  }
}

export async function getlast4order(){
  try {
    const res = await api.get('/admin/last-orders', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error getting last 4 orders:", err);
    throw err.response?.data || err;
  }
}

export async function getOrdersDailyStats() {
  try {
    const res = await api.get('/admin/orders-per-day-last-7-days', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error('Error getting daily order stats:', err);
    throw err.response?.data || err;
  }
}

export async function deleteproduct(productId) {
  try {
    const res = await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err.response?.data || err;
  }
}
export async function updateproduct(productId, productnewdata) {
  try {
    console.log("Updating product:", productId, productnewdata);
    
    const res = await api.put(
      `/products/${productId}`,       // ✅ URL
      productnewdata,                    // ✅ Data to update
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err.response?.data || err;
  }
}

export async function createproducts(formData) {
  try {
    const res = await api.post(
      '/products',
      formData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`
          // Do NOT set 'Content-Type' here; axios will set it automatically for FormData
        }
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error creating products:", err);
    throw err.response?.data || err;
  }
}

export async function addcategory(categoryData) {
  try {
    const res = await api.post('/categories', categoryData, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error adding category:", err);
    throw err.response?.data || err;
  }
}

export async function updatecategory(updatedata,categoryid) 
{
  try {
    const res = await api.put(`/categories/${categoryid}`, updatedata, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error updating category:", err);
    throw err.response?.data || err;
  }

}

export async function deletecategory(categroyid) {
  try {
    const res = await api.delete(`/categories/${categroyid}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting category:", err);
    throw err.response?.data || err;
  }
}


export async function getusers() {
  try {
    const res = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error getting users:", err);
    throw err.response?.data || err;
  }
}

export async function createadmin(admin){
  try {
    admin.passwordConfirm = admin.password; // Ensure password confirmation matches
    const res = await api.post('/users',admin, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error creating admin:", err);
    throw err.response?.data || err;
  }
}

export async function getallorders(){
  try {
    const res = await api.get('/orders', {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error getting all orders:", err);
    throw err.response?.data || err;
  }
}

export async function getorderdetails(orderId) {
  try {
    const res = await api.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log("ddddd")
    console.log(res.data)
    return res.data;
  } catch (err) {
    console.error("Error getting order details:", err);
    throw err.response?.data || err;
  }
}
export async function updateorder(orderId, updatedata) {
  try {
    const res = await api.put(`/orders/${orderId}`, updatedata, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error updating order:", err);
    throw err.response?.data || err;
  }
}

export function gettopproduct(){
  return api.get('/admin/top-products', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  .then(res => res.data)
  .catch(err => {
    console.error("Error getting top products:", err);
    throw err.response?.data || err;
  });
}

export function getlastcategory(){
  return api.get('/admin/last-gategory', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  .then(res => res.data)
  .catch(err => {
    console.error("Error getting last category:", err);
    throw err.response?.data || err;
  });
}
export function getlastusers(){
  return api.get('/admin/last-users', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  .then(res => res.data)
  .catch(err => {
    console.error("Error getting last category:", err);
    throw err.response?.data || err;
  });
}
export function getlastorderin15day(){
  return api.get('/admin/orders-per-day-last-15-days', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  .then(res => res.data)
  .catch(err => {
    console.error("Error getting last category:", err);
    throw err.response?.data || err;
  });
}

export function getuserorder(){
  try {
    
    return api.get(`/orders/user-orders`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then(res => res.data)
    .catch(err => {
      console.error("Error getting user orders:", err);
      throw err.response?.data || err;
    });
  }
  catch (error) {
    console.error("Error in getuserorder:", error);
    throw error;
  }
}
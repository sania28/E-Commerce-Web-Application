import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const authData = localStorage.getItem("auth-storage");
    if (authData) {
      const { token } = JSON.parse(authData).state;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-storage");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data) => api.put("/auth/profile", data),
};

// Product APIs
export const productAPI = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
};

// Order APIs
export const orderAPI = {
  create: (data) => api.post("/orders", data),
  getAll: () => api.get("/orders"),
  getById: (id) => api.get(`/orders/${id}`),
};

// Admin Auth APIs
export const adminAuthAPI = {
  login: (data) => api.post("/admin/auth/login", data),
  getProfile: () => api.get("/admin/auth/profile"),
};

// Admin Product APIs
export const adminProductAPI = {
  getAll: (params) => api.get("/admin/products", { params }),
  getById: (id) => api.get(`/admin/products/${id}`),
  create: (data) => api.post("/admin/products", data),
  update: (id, data) => api.put(`/admin/products/${id}`, data),
  delete: (id) => api.delete(`/admin/products/${id}`),
  import: (products) => api.post("/admin/products/import", { products }),
};

// Admin Order APIs
export const adminOrderAPI = {
  getAll: (params) => api.get("/admin/orders", { params }),
  getById: (id) => api.get(`/admin/orders/${id}`),
  updateStatus: (id, status) =>
    api.put(`/admin/orders/${id}/status`, { status }),
  addNote: (id, note) => api.put(`/admin/orders/${id}/notes`, { note }),
  export: (orderIds) =>
    api.post("/admin/orders/export", { orderIds }, { responseType: "blob" }),
  getDashboardStats: () => api.get("/admin/orders/dashboard/stats"),
};

export default api;

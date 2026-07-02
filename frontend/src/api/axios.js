import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://rasoi-sutra-masale.onrender.com/api',
});

// Request interceptor to attach JWT token to admin requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rasoi_sutra_admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

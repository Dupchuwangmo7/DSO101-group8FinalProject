/**
 * API Client Setup
 * Configures axios with base URL and includes JWT token in requests
 *
 * Always uses /api in production (nginx proxies to backend).
 * In dev, Vite dev server proxies /api to localhost backend (see vite.config.js).
 */

import axios from 'axios';

// ALWAYS use /api - nginx (prod) or Vite dev server (dev) handles proxying
// This prevents any malformed VITE_API_URL value from breaking the build
const baseURL = '/api';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
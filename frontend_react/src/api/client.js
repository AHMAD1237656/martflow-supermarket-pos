// import axios from 'axios';

// // Django REST Backend (Port 8000)
// export const djangoApi = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
// });

// // FastAPI POS Engine (Port 8001)
// export const fastApi = axios.create({
//   baseURL: 'http://127.0.0.1:8001/api',
// });

// // Attach JWT access token to requests if present
// djangoApi.interceptors.request.use((config) => {
//   const token = localStorage.getItem('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


import axios from 'axios';

// Django Backend API (Port 8000)
export const djangoApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// FastAPI POS Engine (Port 8001)
export const fastApi = axios.create({
  baseURL: 'http://127.0.0.1:8001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Ensure latest JWT token is always sent
djangoApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: If 401 occurs, clear expired tokens and redirect to login
djangoApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Session expired (401). Clearing stale auth tokens.");
      localStorage.removeItem('token');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      // Redirect only if not already on login page
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
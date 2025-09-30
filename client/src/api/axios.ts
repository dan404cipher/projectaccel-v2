import axios from "axios";

const API_BASE =`${import.meta.env.VITE_BASE_URL}/api/v1`

console.log('API_BASE_URL:', import.meta.env.VITE_BASE_URL);
console.log('API_BASE:', API_BASE);

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to attach token and workspace context
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  const userStr = localStorage.getItem("user");
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add workspace context if available
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.workspaceId && config.headers) {
        config.headers['X-Workspace-ID'] = user.workspaceId;
      }
    } catch (error) {
      console.warn('Failed to parse user data from localStorage:', error);
    }
  }
  
  return config;
});

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshResponse = await axios.post(`${API_BASE}/auth/refresh`, {}, {
          withCredentials: true // Include cookies for refresh token
        });

        const { accessToken } = refreshResponse.data.data;
        localStorage.setItem("access_token", accessToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

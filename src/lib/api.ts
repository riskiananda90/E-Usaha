import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '@/types/api';
const API_BASE_URL = import.meta.env.VITE_API_URL;


const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, 
});


apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(error);
        }

        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
          refreshToken,
        });

        localStorage.setItem('auth_token', data.token);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
        }
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    return apiError?.message || error.message || 'Terjadi kesalahan';
  }
  
  return 'Terjadi kesalahan tidak terduga';
};

const api = {
  getBusinessConfiguration: async (businessId: string) => {
    const response = await apiClient.get(`/businesses/${businessId}/configuration`);
    return response.data.data;
  },

  updateBusinessConfiguration: async (businessId: string, config: any) => {
    const response = await apiClient.patch(`/businesses/${businessId}/configuration`, config);
    return response.data.data;
  },
};

export { api };

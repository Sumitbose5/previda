// API Configuration
const getApiBaseUrl = () => {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    return 'http://localhost:8000';
  }
  
  // Production API URL - replace with your actual Vercel backend URL
  return import.meta.env.VITE_API_BASE_URL || 'https://your-backend.vercel.app';
};

export const API_BASE_URL = getApiBaseUrl();

// API Endpoints
export const API_ENDPOINTS = {
  GENERATE_IDEAS: `${API_BASE_URL}/generate-ideas`,
  HEALTH_CHECK: `${API_BASE_URL}/`,
} as const;
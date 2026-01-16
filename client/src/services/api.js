import axios from 'axios';

/**
 * Centralized API client with interceptors for error handling and authentication
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available (for future auth implementation)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error types
    if (error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
      error.userMessage = 'Cannot connect to server. Please make sure the backend is running on port 3001.';
    } else if (error.response?.status === 500) {
      error.userMessage = 'Server error. Please try again later.';
    } else if (error.response?.status === 400) {
      error.userMessage = error.response.data?.error || 'Invalid request. Please check your inputs.';
    } else if (error.response?.status === 401) {
      error.userMessage = 'Authentication required. Please log in.';
    } else if (error.response?.status === 403) {
      error.userMessage = 'You do not have permission to perform this action.';
    } else if (error.response?.status === 404) {
      error.userMessage = 'Resource not found.';
    } else if (error.response?.data?.error) {
      error.userMessage = error.response.data.error;
    } else {
      error.userMessage = 'An unexpected error occurred. Please try again.';
    }
    
    return Promise.reject(error);
  }
);

/**
 * API service functions
 */
export const auditService = {
  /**
   * Submit audit data and get AI-powered sustainability analysis
   * @param {Object} auditData - Business metrics and description
   * @returns {Promise<Object>} AI response with score and recommendations
   */
  submitAudit: async (auditData) => {
    const response = await apiClient.post('/api/ai', auditData);
    return response.data;
  },

  /**
   * Health check endpoint
   * @returns {Promise<Object>} Server status
   */
  healthCheck: async () => {
    const response = await apiClient.get('/');
    return response.data;
  },
};

export default apiClient;

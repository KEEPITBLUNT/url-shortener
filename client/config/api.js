// API Configuration - Change BASE_URL here for different environments
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-api.com' 
    : 'http://localhost:5001',
  
  ENDPOINTS: {
    SHORTEN: '/api/shorten',
    ADMIN: '/api/admin'
  }
};

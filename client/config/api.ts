export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://url-shortener-k1o4.onrender.com'  // when in production
    : 'http://localhost:5001',                    // when in development
  
  ENDPOINTS: {
    SHORTEN: '/api/shorten',
    ADMIN: '/api/admin'
  }
};
// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://whistleblower.dev/api'
  : 'http://localhost:3002/api';

export { API_BASE_URL };

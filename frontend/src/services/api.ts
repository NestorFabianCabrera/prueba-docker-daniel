import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 500
}); 
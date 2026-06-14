import axios from 'axios';

const API = axios.create({
  // Aapka live Vercel backend link
  baseURL: 'https://doctor-hub-backend-hadiaiqbal1807s-projects.vercel.app/api', 
});

// Automatic login token handler
API.interceptors.request.use((req) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export default API;
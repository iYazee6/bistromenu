import axios from "axios";

// Load API base URL and API key from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Create Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
    // "Authorization": `Bearer ${API_KEY}`, 
  },
});



// Log when a request is sent
api.interceptors.request.use((request) => {
    console.log("🚀 API Request Sent:", request);
    return request;
  });
  
  // Log when a response is received
  api.interceptors.response.use(
    (response) => {
      console.log("✅ API Response Received:", response);
      return response;
    },
    (error) => {
      console.error("❌ API Error:", error);
      return Promise.reject(error);
    }
  );

export default api;

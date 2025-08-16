  // src/apiconfig/api.config.js

  const API_BASE_URL = "http://localhost:4000"; // Change to admin deployed backend URL (DOMAIN)

  const API = {
    SLIDER: `${API_BASE_URL}/slider/public`,
    ABOUTUS: `${API_BASE_URL}/aboutus`,
    GALLERY: `${API_BASE_URL}/gallery`,
    CONTACT: `${API_BASE_URL}/contact`,
    DISTRICTS: `${API_BASE_URL}/districts`,
    UPLOADS: `${API_BASE_URL}/uploads`,
  };

  export default API;

  // src/apiconfig/api.config.js

  const API_BASE_URL = "http://127.0.0.1:8000"; // Change to admin deployed backend URL (DOMAIN)

  const API = {
    SLIDER: `${API_BASE_URL}/public/sliders`,
    ABOUTUS: `${API_BASE_URL}/public/about`,
    GALLERY: `${API_BASE_URL}/public/gallery`,
    CONTACT: `${API_BASE_URL}/contact`,
    DISTRICTS: `${API_BASE_URL}/districts`,
    UPLOADS: `${API_BASE_URL}/uploads`,

      // Public user registration
    SEND_OTP: `${API_BASE_URL}/public-user/send-otp`,
    VERIFY_OTP: `${API_BASE_URL}/public-user/verify-otp`,
    SET_PASSWORD: `${API_BASE_URL}/public-user/set-password`,
  };

  export default API;

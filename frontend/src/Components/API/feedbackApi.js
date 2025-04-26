import axios from 'axios';

const API = axios.create({ baseURL: 'https://your-backend-url.com/api' });

// Attach token to every request automatically
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Submit feedback (client)
export const submitFeedback = (formData, token) => {
  return API.post('/feedback', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });
};

// Get all feedbacks (admin)
export const getAllFeedbacks = (token, query = '') => {
  return API.get(`/feedback${query}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Get single feedback by ID (admin)
export const getFeedbackById = (token, id) => {
  return API.get(`/feedback/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

// Respond to feedback (admin)
export const respondToFeedback = (token, id, responseData) => {
  return API.post(`/feedback/${id}/respond`, responseData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

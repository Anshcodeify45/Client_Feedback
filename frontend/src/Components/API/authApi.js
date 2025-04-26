import axios from 'axios';

const API = axios.create({ baseURL: 'https://localhost:5000/api' });

export const loginUser = (formData) => API.post('/auth/login', formData);
export const signupUser = (formData) => API.post('/auth/signup', formData);
   
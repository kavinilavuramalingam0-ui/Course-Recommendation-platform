import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const courseService = {
  getAll: async () => {
    const response = await api.get('/courses');
    return response.data;
  },
};

export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
  getById: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
  updateInterests: async (userId, interestTags) => {
    const response = await api.put(`/users/${userId}/interests`, { interestTags });
    return response.data;
  },
  updateGoal: async (userId, goal) => {
    const response = await api.put(`/users/${userId}/goal`, { goal });
    return response.data;
  },
};

export const recommendationService = {
  getForUser: async (userId) => {
    const response = await api.get(`/recommendations/${userId}`);
    return response.data;
  },
};

export const learningPathService = {
  getAll: async () => {
    const response = await api.get('/learning-paths');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/learning-paths/${id}`);
    return response.data;
  },
  generateCustomPath: async (userId) => {
    const response = await api.post(`/learning-paths/generate/${userId}`);
    return response.data;
  },
};

export const assessmentService = {
  getAll: async () => {
    const response = await api.get('/assessments');
    return response.data;
  },
  create: async (assessmentData) => {
    const response = await api.post('/assessments', assessmentData);
    return response.data;
  },
};

export default api;

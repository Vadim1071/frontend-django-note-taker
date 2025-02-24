import axios from 'axios';

const isClient = () => typeof window !== 'undefined';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1/',
});

api.interceptors.request.use(
  (config) => {
    if (isClient()) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      setAuthToken(null);
      if (isClient()) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

const handleError = (error, defaultMessage) => {
  throw new Error(error.response?.data?.message || defaultMessage);
};

export const setAuthToken = (token) => {
  if (isClient()) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }
};

export const isAuthenticated = () => {
  return isClient() && localStorage.getItem('token') !== null;
};

export const login = async (username, password) => {
  try {
    const response = await api.post('token/', { username, password });
    return response.data;
  } catch (error) {
    handleError(error, 'Login failed');
  }
};

export const getNotes = async () => {
  try {
    const response = await api.get('notes/');
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch notes');
  }
};

export const getNote = async (id) => {
  try {
    const response = await api.get(`notes/${id}/`);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch note');
  }
};

export const updateNote = async (note) => {
  try {
    const response = await api.put(`notes/${note.id}/`, note);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to update note');
  }
};

export const createNote = async (note) => {
  try {
    const response = await api.post('notes/', note);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create note');
  }
};

export const getTags = async () => {
  try {
    const response = await api.get('tags/');
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch tags');
  }
};

export const createTag = async (tag) => {
  try {
    const response = await api.post('tags/', tag);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create tag');
  }
};

export const getFolders = async () => {
  try {
    const response = await api.get('folders/');
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to fetch folders');
  }
};

export const createFolder = async (folder) => {
  try {
    const response = await api.post('folders/', folder);
    return response.data;
  } catch (error) {
    handleError(error, 'Failed to create folder');
  }
};

export const register = async (username, password, email = '') => {
  try {
    const response = await api.post('register/', { username, password, email });
    return response.data;
  } catch (error) {
    handleError(error, 'Registration failed');
  }
};

export {
  setAuthToken,
  login,
  getNotes,
  createNote,
  getTags,
  createTag,
  getFolders,
  createFolder,
  register,
};
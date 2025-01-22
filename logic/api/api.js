import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1/', // backend uri
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
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
    if (error.response.status === 401) {
      setAuthToken(null);
    }
    return Promise.reject(error);
  }
);

// Функция для установки токена аутентификации в заголовках
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
};

export const isAuthenticated = () => localStorage.getItem('token') !== null;

// Функция для входа в систему
export const login = async (username, password) => {
  try {
    const response = await api.post('token/', { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Функция для получения списка заметок
export const getNotes = async () => {
  try {
    const response = await api.get('notes/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch notes');
  }
};

// Функция для создания заметки
export const createNote = async (note) => {
  try {
    const response = await api.post('notes/', note);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create note');
  }
};

// Функция для получения списка тегов
export const getTags = async () => {
  try {
    const response = await api.get('tags/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch tags');
  }
};

// Функция для создания тега
export const createTag = async (tag) => {
  try {
    const response = await api.post('tags/', tag);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create tag');
  }
};

// Функция для получения списка папок
export const getFolders = async () => {
  try {
    const response = await api.get('folders/');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch folders');
  }
};

// Функция для создания папки
export const createFolder = async (folder) => {
  try {
    const response = await api.post('folders/', folder);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create folder');
  }
};

// Функция для регистрации пользователя
export const register = async (username, password, email = '') => {
  try {
    const response = await api.post('register/', { username, password, email });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Экспортируем все функции
export default {
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
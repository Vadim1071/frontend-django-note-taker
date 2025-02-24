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
  console.error('Ошибка:', error.response || error.message || error);
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
    handleError(error, 'Ошибка при входе');
  }
};

export const getNotes = async () => {
  try {
    const response = await api.get('notes/');
    return response.data.results || response.data; // Обрабатываем пагинацию
  } catch (error) {
    handleError(error, 'Ошибка при получении заметок');
  }
};

export const getNote = async (id) => {
  try {
    const response = await api.get(`notes/${id}/`);
    return response.data;
  } catch (error) {
    handleError(error, 'Ошибка при получении заметки');
  }
};

export const updateNote = async (note) => {
  try {
    const response = await api.put(`notes/${note.id}/`, note);
    return response.data;
  } catch (error) {
    handleError(error, 'Ошибка при обновлении заметки');
  }
};

export const createNote = async (note) => {
  try {
    const response = await api.post('notes/', note);
    return response.data;
  } catch (error) {
    handleError(error, 'Ошибка при создании заметки');
  }
};

export const getTags = async () => {
  try {
    const response = await api.get('tags/');
    return response.data.results || response.data; // Обрабатываем пагинацию
  } catch (error) {
    handleError(error, 'Ошибка при получении тегов');
  }
};

export const createTag = async (tag) => {
  try {
    const response = await api.post('tags/', tag);
    return response.data;
  } catch (error) {
    handleError(error, 'Ошибка при создании тега');
  }
};

export const getFolders = async () => {
  try {
    const response = await api.get('folders/');
    return response.data.results || response.data; // Обрабатываем пагинацию
  } catch (error) {
    handleError(error, 'Ошибка при получении папок');
  }
};

export const createFolder = async (folder) => {
  try {
    const response = await api.post('folders/', folder);
    return response.data;
  } catch (error) {
    handleError(error, 'Ошибка при создании папки');
  }
};

export const register = async (username, password, email = '') => {
  try {
    const response = await api.post('register/', { username, password, email });
    return response.data;
  } catch (error) {
    handleError(error, 'Ошибка при регистрации');
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
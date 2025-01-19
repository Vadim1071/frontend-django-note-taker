import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = async (username, password) => {
  const response = await api.post('token/', { username, password });
  return response.data;
};

export const getNotes = async () => {
  const response = await api.get('notes/');
  return response.data;
};

export const createNote = async (note) => {
  const response = await api.post('notes/', note);
  return response.data;
};

export const getTags = async () => {
  const response = await api.get('tags/');
  return response.data;
};

export const createTag = async (tag) => {
  const response = await api.post('tags/', tag);
  return response.data;
};
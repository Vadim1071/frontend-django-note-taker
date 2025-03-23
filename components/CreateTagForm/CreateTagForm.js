import React, { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export const NotesProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedFolders = JSON.parse(localStorage.getItem('folders')) || [];
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const savedTags = JSON.parse(localStorage.getItem('tags')) || [];
    setFolders(savedFolders);
    setNotes(savedNotes);
    setTags(savedTags);
  }, []);

  // Сохранение данных в localStorage
  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [folders, notes, tags]);

  // Добавление тега
  const addTag = (tag) => {
    const newTag = { ...tag, id: Date.now() };
    setTags([...tags, newTag]);
  };

  // Удаление тега
  const deleteTag = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  return (
    <NotesContext.Provider
      value={{
        folders,
        notes,
        tags,
        addTag,
        deleteTag,
        // Другие функции...
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
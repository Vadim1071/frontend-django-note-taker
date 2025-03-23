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

  // Добавление папки
  const addFolder = (name) => {
    const newFolder = { id: Date.now(), name, notes: [] };
    setFolders([...folders, newFolder]);
  };

  // Удаление папки
  const deleteFolder = (folderId) => {
    setFolders(folders.filter((folder) => folder.id !== folderId));
  };

  // Добавление заметки
  const addNote = (note) => {
    const newNote = { ...note, id: Date.now() };
    setNotes([...notes, newNote]);
  };

  // Удаление заметки
  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  // Добавление тега
  const addTag = (tag) => {
    const newTag = { ...tag, id: Date.now() };
    setTags([...tags, newTag]);
  };

  // Удаление тега
  const deleteTag = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  // Добавление заметки в папку
  const addNoteToFolder = (folderId, note) => {
    const folderIdNumber = Number(folderId);
    const folderExists = folders.some((folder) => folder.id === folderIdNumber);
    if (!folderExists) {
      console.error('Папка не существует:', folderIdNumber);
      return;
    }

    const newNote = { ...note, id: Date.now(), folderId: folderIdNumber };
    setNotes([...notes, newNote]);

    setFolders(
      folders.map((folder) =>
        folder.id === folderIdNumber
          ? { ...folder, notes: [...folder.notes, newNote.id] }
          : folder
      )
    );
  };

  return (
    <NotesContext.Provider
      value={{
        folders,
        notes,
        tags,
        addFolder,
        deleteFolder,
        addNote,
        deleteNote,
        addTag,
        deleteTag,
        addNoteToFolder,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};